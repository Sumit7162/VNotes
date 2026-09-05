import { useParams, Link } from "react-router-dom";
import { useNotesForVideo } from "../hooks/useNotes";
import { useVideo } from "../hooks/useVideos";
import { NotesMarkdown } from "../components/NotesMarkdown";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ArrowLeft, FileText, Clock, Download, AlertCircle, Loader2, Printer } from "lucide-react";
import { formatDateTime } from "../utils/datetime";

const statusLabels: Record<string, string> = {
  pending: "Queued",
  downloading: "Downloading video",
  extracting_audio: "Extracting audio",
  transcribing: "Creating transcript",
  generating_notes: "Generating notes",
  completed: "Completed",
  failed: "Failed",
};


export function NotesViewerPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const { data: video, isLoading: videoLoading } = useVideo(videoId || null);
  const canLoadNotes = video?.status === "completed";
  const {
    data: note,
    isLoading: notesLoading,
    isError: notesError,
  } = useNotesForVideo(videoId || null, canLoadNotes);

  const handleDownload = () => {
    if (!note) return;
    // The exported file carries the same footer as the printed page.
    const markdown = `${note.markdown_content.trimEnd()}\n\n---\n\n_Generated ${formatDateTime(
      note.created_at,
    )}_\n`;
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(file);
    element.href = url;
    element.download = `${video?.title || "notes"}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  if (videoLoading) {
    return <LoadingSpinner message="Loading video..." />;
  }

  if (video && video.status !== "completed") {
    const isFailed = video.status === "failed";

    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          {isFailed ? (
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          ) : (
            <Loader2 className="h-12 w-12 text-primary-500 mx-auto mb-4 animate-spin" />
          )}
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isFailed ? "Processing failed" : statusLabels[video.status]}
          </h3>
          <p className="text-sm text-gray-500">
            {isFailed
              ? video.error_message || "The video could not be processed."
              : "Notes will load automatically here as soon as the video finishes processing."}
          </p>
        </div>
      </div>
    );
  }

  if (notesLoading) {
    return <LoadingSpinner message="Loading notes..." />;
  }

  if (!note || notesError) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
          <p className="text-sm text-gray-500">
            Notes for this video are not available yet, or the video ID is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto print:p-0">
      <div className="mb-6 print:mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 print:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-6 print:border-0 print:p-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {video?.title || "Video Notes"}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDateTime(note.created_at)}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 print:hidden">
              <button
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                <Printer className="h-4 w-4" />
                Export PDF
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                <Download className="h-4 w-4" />
                Download MD
              </button>
              <a
                href={video?.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-800 font-medium"
              >
                Watch Video
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 print:border-0 print:p-0">
        <NotesMarkdown content={note.markdown_content} />

        {/* Footer - the last thing on screen and on the last printed page. */}
        <footer className="notes-footer mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 flex flex-wrap justify-between gap-2">
          <span>{video?.title || "Video Notes"}</span>
          <span>Generated {formatDateTime(note.created_at)}</span>
        </footer>
      </div>
    </div>
  );
}
