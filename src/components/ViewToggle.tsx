import { Check, LayoutGrid, List } from "lucide-react";

export type NotesView = "list" | "grid";

interface ViewToggleProps {
  value: NotesView;
  onChange: (view: NotesView) => void;
}

const options: { view: NotesView; label: string; icon: typeof List }[] = [
  { view: "list", label: "Row view", icon: List },
  { view: "grid", label: "Box view", icon: LayoutGrid },
];

/** Segmented row/box switch - the active side is tinted and shows a tick. */
export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div
      role="group"
      aria-label="Notes layout"
      className="inline-flex items-stretch overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm"
    >
      {options.map(({ view, label, icon: Icon }, index) => {
        const active = value === view;
        return (
          <div key={view} className="flex items-stretch">
            {index > 0 && <span aria-hidden className="w-px bg-slate-200" />}
            <button
              type="button"
              onClick={() => onChange(view)}
              aria-pressed={active}
              title={label}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-slate-600 transition-colors duration-150 ${
                active ? "bg-sky-100 text-sky-700" : "hover:bg-slate-50"
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" />}
              <Icon className="h-4 w-4" />
              <span className="sr-only">{label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
