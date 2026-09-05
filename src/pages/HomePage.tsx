import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Link2, Captions, NotebookPen } from "lucide-react";
import KineticMatrix from "@/components/ui/kinetic-matrix";
import { useAuth } from "../hooks/useAuth";

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

  // The landing page is dark whatever the visitor's OS is set to, so the page
  // and the canvas agree. Scoped to this route: the class is removed on unmount
  // so the signed-in app keeps its light theme.
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.add("dark");

    // Mobile browsers tint their own chrome from this, so without it the
    // address bar stays pale above a near-black page.
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previousThemeColor = meta?.content;
    if (meta) meta.content = "#06070a";

    return () => {
      if (!hadDark) root.classList.remove("dark");
      if (meta && previousThemeColor !== undefined) meta.content = previousThemeColor;
    };
  }, []);

  return (
    <div className="min-h-screen bg-night-900 text-ink-300 flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
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

      {/* The canvas paints #06070a, the same as bg-night-900, so the panel meets
          the page with no seam. Drag across it, or click to fire a shockwave. */}
      <section className="relative h-[58vh] min-h-[380px] w-full overflow-hidden">
        <KineticMatrix title="V-NOTES AI" className="h-full w-full" />
      </section>

      <section className="mx-auto w-full max-w-3xl px-5 py-16 text-center sm:px-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-paper-50 sm:text-4xl">
          Turn any video into notes worth keeping
        </h1>
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

        <p className="mt-4 text-xs text-ink-500">
          Free plan: 10 short videos a day, or 2 up to 30 minutes.
        </p>
      </section>

      <section
        id="how-it-works"
        className="mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-night-line bg-night-800 p-5 transition-colors hover:border-accent-600"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-night-600 text-cyan-400 ring-1 ring-inset ring-night-line">
                {step.icon}
              </div>
              <h2 className="mt-4 font-display text-lg font-semibold text-paper-50">
                {step.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-night-line px-5 py-6 text-center text-xs text-ink-500 sm:px-8">
        V-Notes AI — study notes from any video
      </footer>
    </div>
  );
}

export default HomePage;
