import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { NotesMarkdown } from "./NotesMarkdown";

/**
 * Only the opening of the note is rendered - the rest is cropped away anyway,
 * and rendering every formula of every note would make the grid crawl.
 */
const PREVIEW_CHARS = 1600;

/** A4 at 96dpi. The page is rendered at this width, then scaled to the tile. */
const PAGE_WIDTH_PX = 794;

function firstPage(markdown: string): string {
  if (markdown.length <= PREVIEW_CHARS) return markdown;
  const cut = markdown.slice(0, PREVIEW_CHARS);
  // Stop at the last blank line so a heading or formula is not sliced in half.
  const boundary = cut.lastIndexOf("\n\n");
  return boundary > PREVIEW_CHARS / 2 ? cut.slice(0, boundary) : cut;
}

/** Markdown plus KaTeX is expensive, so a tile only renders once it is near the viewport. */
function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, visible]);

  return visible;
}

// The app renders only in the browser, but keep SSR-safe semantics anyway.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Scale that makes a full page width fit the tile exactly, whatever the column width. */
function useFitScale(ref: React.RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(0.3);

  // Measured before paint so the page is never briefly drawn at the wrong size.
  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || typeof ResizeObserver === "undefined") return;

    const update = () => {
      const width = node.clientWidth;
      if (width > 0) setScale(width / PAGE_WIDTH_PX);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return scale;
}

interface NotePagePreviewProps {
  content: string;
}

/**
 * A Google Drive style tile: the top of the first page at full page width,
 * cropped to a landscape box rather than the whole page shrunk to fit.
 */
export function NotePagePreview({ content }: NotePagePreviewProps) {
  const excerpt = useMemo(() => firstPage(content), [content]);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useNearViewport(ref);
  const scale = useFitScale(ref);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative overflow-hidden bg-paper-50 select-none pointer-events-none"
      style={{ aspectRatio: "4 / 3" }}
    >
      {visible && (
        <div
          className="absolute left-0 top-0 origin-top-left px-10 pt-8"
          style={{ width: PAGE_WIDTH_PX, transform: `scale(${scale})` }}
        >
          <NotesMarkdown content={excerpt} />
        </div>
      )}
    </div>
  );
}
