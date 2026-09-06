import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Link2, Captions, NotebookPen } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
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
  useDarkSurface("#0A0716");

  return (
    // One ground for the whole page: the hero is transparent and sits on this,
    // so the glows run behind it and the sections below meet it with no seam.
    <div className="home-surface text-ink-700">
      {/* BackgroundPaths is min-h-screen and takes no layout props, so the page
          is built around it: the hero owns the first screen outright, and the
          header and scroll cue sit over it rather than taking height from it. */}
      <div className="relative">
        <BackgroundPaths title="V-Notes AI" ctaHref="#pitch" />

        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-tile.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 rounded-xl ring-1 ring-white/10"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-white">
              V-Notes AI
            </span>
          </div>

          <Link
            to={isSignedIn ? "/dashboard" : "/login"}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          >
            {isSignedIn ? "Open dashboard" : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <a
          href="#pitch"
          aria-label="Scroll to find out more"
          className="absolute inset-x-0 bottom-5 z-20 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-wide text-white/60 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
        >
          Scroll
          <ChevronDown className="h-3.5 w-3.5" />
        </a>
      </div>

      <section id="pitch" className="mx-auto w-full max-w-3xl px-5 py-20 text-center sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Turn any video into notes worth keeping
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-600">
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
            className="inline-flex items-center rounded-lg border border-night-line home-panel px-5 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-accent-500 hover:text-white"
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
              className="rounded-2xl border border-night-line home-panel p-5 transition-colors hover:border-accent-600"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl home-tile text-cyan-400 ring-1 ring-inset ring-night-line">
                {step.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.body}</p>
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
