import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Link2, Captions, NotebookPen } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useDarkSurface } from "../hooks/useDarkSurface";

const steps = [
  {
    icon: <Link2 className="h-5 w-5" />,
    title: "Paste a link",
    body: "Drop in any YouTube URL. We read the runtime up front so you know what you are getting.",
  },
  {
    icon: <Captions className="h-5 w-5" />,
    title: "We get the words",
    body: "Captions when the video has them, and speech-to-text on the audio when it does not.",
  },
  {
    icon: <NotebookPen className="h-5 w-5" />,
    title: "You get study notes",
    body: "Structured markdown with headings, formulas and tables. Read it, search it, print it.",
  },
];

export function HomePage() {
  const { isSignedIn } = useAuth();

  // The public surface is dark; the signed-in app stays light.
  useDarkSurface();

  return (
    <div className="bg-night-900 text-ink-300">
      {/* The first screen is exactly one viewport tall: the header takes its
          natural height and the canvas is handed every remaining pixel, so the
          animation fills a desktop window rather than sitting in a band across
          the top. Everything else lives below the fold. */}
      <div className="flex h-screen min-h-[460px] flex-col">
        <header className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-tile.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl ring-1 ring-night-line"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-paper-50">
              V-Notes AI
            </span>
          </div>

          <Link
            to={isSignedIn ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-1.5 rounded-lg border border-night-line bg-night-800 px-4 py-2 text-sm font-medium text-ink-300 transition-colors hover:border-accent-500 hover:text-paper-50"
          >
            {isSignedIn ? "Open dashboard" : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        {/* min-h-0 lets this flex child shrink to the space left over instead
            of being pushed past the viewport by the artwork inside it. */}
        <section className="relative w-full min-h-0 flex-1 overflow-hidden">
          <BackgroundPaths
            title="V-Notes AI"
            // The component is min-h-screen by default; the hero has already
            // been handed the space left over from the header.
            className="min-h-0 h-full dark:bg-night-900"
            action={
              <Button
                asChild
                variant="ghost"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 text-black dark:text-white transition-all duration-300 group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10 hover:shadow-md dark:hover:shadow-neutral-800/50"
              >
                <Link to={isSignedIn ? "/dashboard" : "/login"}>
                  <span className="opacity-90 transition-opacity group-hover:opacity-100">
                    {isSignedIn ? "Open dashboard" : "Get started free"}
                  </span>
                  <ArrowRight className="ml-3 h-4 w-4 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100" />
                </Link>
              </Button>
            }
          />

          <a
            href="#pitch"
            aria-label="Scroll to find out more"
            className="absolute inset-x-0 bottom-5 z-30 mx-auto flex w-fit items-center gap-2 rounded-full border border-night-line bg-night-800/80 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-ink-400 backdrop-blur-sm transition-colors hover:border-accent-500 hover:text-paper-50"
          >
            Scroll
            <ChevronDown className="h-3.5 w-3.5" />
          </a>
        </section>
      </div>

      <section id="pitch" className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-paper-50 sm:text-4xl">
          Turn any video into notes worth keeping
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-400">
          Paste a YouTube link and get structured study notes back in seconds —
          headings, key points, formulas and tables, ready to read or print.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={isSignedIn ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-accent-800/30 transition-colors hover:bg-accent-500"
          >
            {isSignedIn ? "Open dashboard" : "Get started free"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center rounded-lg border border-night-line bg-night-800 px-5 py-3 text-sm font-medium text-ink-300 transition-colors hover:border-accent-500 hover:text-paper-50"
          >
            How it works
          </a>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-night-line bg-night-800 p-5 transition-colors hover:border-accent-600"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-night-600 text-cyan-400 ring-1 ring-inset ring-night-line">
                {step.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-paper-50">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-night-line px-5 py-6 text-center text-xs text-ink-500 sm:px-8">
        V-Notes AI — study notes from any video
      </footer>
    </div>
  );
}

export default HomePage;
