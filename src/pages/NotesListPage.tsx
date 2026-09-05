import { useEffect, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NotePagePreview } from "../components/NotePagePreview";
import { ViewToggle, type NotesView } from "../components/ViewToggle";
import { Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/datetime";
import type { Note } from "../types";

const VIEW_STORAGE_KEY = "notes-view";

function loadView(): NotesView {
  try {
    return localStorage.getItem(VIEW_STORAGE_KEY) === "grid" ? "grid" : "list";
  } catch {
    return "list";
  }
}

function noteTitle(note: Note): string {
  const heading = note.markdown_content
    .split("\n")
    .find((line) => line.startsWith("# "));
  return heading?.replace(/^#+ /, "").trim() || "Video Notes";
}

function noteSummary(note: Note): string {
  return note.markdown_content
    .substring(0, 200)
    .replace(/[#*_`]/g, "")
    .replace(/\n/g, " ");
}

export function NotesListPage() {
  const { data: notes, isLoading } = useNotes();
  const [view, setView] = useState<NotesView>(loadView);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch {
      // A blocked storage API is no reason to break the page.
    }
  }, [view]);

  if (isLoading) {
    return <LoadingSpinner message="Loading notes..." />;
  }

  const hasNotes = !!notes && notes.length > 0;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">My Notes</h2>
          <p className="text-sm text-slate-500 mt-1.5">All AI-generated notes from your videos</p>
        </div>
        {hasNotes && <ViewToggle value={view} onChange={setView} />}
      </div>

      {!hasNotes ? (
        <div className="bg-white/90 rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
          <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No notes yet</h3>
          <p className="text-sm text-slate-500 mb-4">
            Process a video to generate your first set of AI notes.
          </p>
          <Link
            to="/submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-sky-200 transition-all duration-200"
          >
            Submit a Video
          </Link>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              to={`/notes/${note.video_id}`}
              title={noteTitle(note)}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:border-sky-200 hover:shadow-md"
            >
              {/* Name on top, page tile in the middle, detail underneath. */}
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-gradient-to-br from-sky-100 to-indigo-100">
                  <FileText className="h-3.5 w-3.5 text-sky-600" />
                </span>
                <h3 className="truncate text-sm font-medium text-slate-800 group-hover:text-sky-700">
                  {noteTitle(note)}
                </h3>
              </div>

              <div className="mx-3 overflow-hidden rounded-md border border-slate-200 bg-white">
                <NotePagePreview content={note.markdown_content} />
              </div>

              <div className="flex items-center gap-2 px-3 py-2.5">
                <Clock className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
                <p className="truncate text-xs text-slate-500">
                  Created · {formatDateTime(note.created_at)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <Link
              key={note.id}
              to={`/notes/${note.video_id}`}
              className="block bg-white/90 rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <FileText className="h-5 w-5 text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-900">{noteTitle(note)}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{noteSummary(note)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-400">
                      {formatDateTime(note.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
