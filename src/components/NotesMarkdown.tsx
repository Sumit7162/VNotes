import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface NotesMarkdownProps {
  content: string;
}

// Fenced code blocks and inline code spans must survive normalisation untouched,
// otherwise a `\(` shown as a literal example would be turned into math.
const PROTECTED = /(```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]*`)/g;

/**
 * remark-math only recognises a multi-line `$$` block when both fences sit
 * alone on their own lines. With the closing fence glued to the last line
 * ("\end{aligned}$$") the opening fence never closes and swallows the rest of
 * the document, which KaTeX then renders as one red error blob.
 */
function toDisplayBlock(tex: string): string {
  return `\n\n$$\n${tex.trim()}\n$$\n\n`;
}

/**
 * The note generator emits LaTeX with the `\(...\)` / `\[...\]` delimiters, which
 * remark-math does not understand. Worse, markdown treats `\(` as an escaped
 * parenthesis, so the delimiters silently vanish and the raw TeX leaks into the
 * page ("(\mathbb{R})"). Rewrite them to the `$` delimiters remark-math reads.
 */
function normalizeMath(segment: string): string {
  const converted = segment
    .replace(/\\\[([\s\S]+?)\\\]/g, (_m, tex) => toDisplayBlock(tex))
    .replace(/\\\(([\s\S]+?)\\\)/g, (_m, tex) => `$${tex.trim()}$`);

  // Also re-fence any multi-line `$$...$$` the model wrote itself. Single-line
  // spans are already valid inline math and are left as they are.
  return converted
    .replace(/\$\$([\s\S]+?)\$\$/g, (match, tex: string) =>
      tex.includes("\n") ? toDisplayBlock(tex) : match,
    )
    .replace(/\n{3,}/g, "\n\n");
}

const DELIMITER_ROW = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/;

/**
 * A table only parses when its header row starts its own line. The generator
 * sometimes glues that header onto the end of the sentence introducing the
 * table, which collapses the whole thing into one run-on paragraph. Split the
 * two apart, but only when the following line really is a `|---|---|` divider
 * so well-formed markdown is left untouched.
 */
function isolateTables(segment: string): string {
  const lines = segment.split("\n");

  return lines
    .map((line, i) => {
      if (!DELIMITER_ROW.test(lines[i + 1] ?? "")) return line;
      const pipe = line.indexOf("|");
      if (pipe <= 0) return line;
      const lead = line.slice(0, pipe).trim();
      if (!lead) return line;
      return `${lead}\n\n${line.slice(pipe)}`;
    })
    .join("\n");
}

function normalizeMarkdown(raw: string): string {
  if (!raw) return "";
  const normalized = raw.replace(/\r\n?/g, "\n");
  return normalized
    .split(PROTECTED)
    .map((segment, i) => (i % 2 === 1 ? segment : isolateTables(normalizeMath(segment))))
    .join("");
}

export function NotesMarkdown({ content }: NotesMarkdownProps) {
  const normalized = useMemo(() => normalizeMarkdown(content), [content]);

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
        components={{
          // Wide tables must scroll on screen instead of pushing the page sideways.
          table: ({ children, ...props }) => (
            <div className="markdown-table-wrap">
              <table {...props}>{children}</table>
            </div>
          ),
          a: ({ children, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {normalized}
      </ReactMarkdown>
    </div>
  );
}
