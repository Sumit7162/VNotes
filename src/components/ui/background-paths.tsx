import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import "./background-paths.css";

const PATHS_PER_GROUP = 36;

/**
 * One fan of near-parallel arcs.
 *
 * Every curve is the same cubic swept across the canvas by its index: it enters
 * off the top-left, bends down through the middle and leaves past the bottom
 * right. `direction` mirrors the horizontal drift so two groups can be layered
 * and cross each other rather than sitting as one flat comb.
 */
function FloatingPaths({ direction }: { direction: number }) {
  const paths = Array.from({ length: PATHS_PER_GROUP }, (_, i) => {
    const shift = i * 5 * direction;
    const drop = i * 6;
    return {
      id: i,
      d:
        `M${-380 - shift} ${-189 + drop}` +
        `C${-380 - shift} ${-189 + drop} ${-312 - shift} ${216 - drop} ${152 - shift} ${343 - drop}` +
        `C${616 - shift} ${470 - drop} ${684 - shift} ${875 - drop} ${684 - shift} ${875 - drop}`,
      width: 0.5 + i * 0.035,
      opacity: 0.14 + i * 0.024,
      // Measured off the reference recording: a streak covers a visible part of
      // its curve in well under a second, which puts a full cycle near 12s, not
      // the 20s+ that made the fan look static.
      duration: 11 + (i % 7) * 1.6,
      // Coprime-ish offsets so the fan never lines up and pulses in unison.
      delay: -(i % 13) * 1.7,
    };
  });

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-white"
      viewBox="0 0 696 316"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {paths.map((path) => (
        <path
          key={path.id}
          className="bgp-path"
          d={path.d}
          stroke="currentColor"
          strokeWidth={path.width}
          strokeOpacity={path.opacity}
          // Normalises the dash units in background-paths.css to 0..1.
          pathLength={1}
          style={{
            animationDuration: `${path.duration}s`,
            animationDelay: `${path.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}

export interface BackgroundPathsProps {
  title?: string;
  subtitle?: string;
  /** Rendered under the subtitle, e.g. a call to action. */
  action?: ReactNode;
  className?: string;
}

export function BackgroundPaths({
  title = "Background Paths",
  subtitle,
  action,
  className,
}: BackgroundPathsProps) {
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-night-900",
        className
      )}
    >
      <FloatingPaths direction={1} />
      <FloatingPaths direction={-1} />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
          {words.map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className="mr-4 inline-block last:mr-0">
              {word.split("").map((letter, letterIndex) => (
                <span
                  key={`${letter}-${letterIndex}`}
                  className="bgp-letter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
                  style={{
                    animationDelay: `${(wordIndex * 6 + letterIndex) * 0.05}s`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {subtitle && (
          <p className="mx-auto mb-8 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
            {subtitle}
          </p>
        )}

        {action}
      </div>
    </div>
  );
}

export default BackgroundPaths;
