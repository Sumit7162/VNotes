import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videosApi } from "../services/videos";
import { useUsage } from "../hooks/useUsage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { Video, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";

export function VideoSubmitPage() {
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: usageData } = useUsage();

  const processMutation = useMutation({
    mutationFn: videosApi.process,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["usage"] });
      navigate("/");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    processMutation.mutate({ youtube_url: url.trim() });
  };

  const remainingLong = usageData?.today?.remaining_videos ?? 2;
  const remainingShort = usageData?.today?.remaining_short_videos ?? 10;
  const maxDuration = usageData?.today?.max_duration_minutes ?? 30;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h2 className="font-display text-2xl font-semibold text-ink-900 tracking-tight">Process a Video</h2>
        <p className="text-sm text-ink-500 mt-1">
          Paste a YouTube URL to generate AI-powered notes
        </p>
      </div>

      <div className="bg-paper-50 rounded-xl border border-line p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="youtube-url" className="block text-sm font-medium text-ink-700 mb-2">
              YouTube URL
            </label>
            <input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-line-strong rounded-lg text-sm focus:ring-2 focus:ring-accent-300 focus:border-accent outline-none transition-colors"
              disabled={processMutation.isPending}
            />
          </div>

          <button
            type="submit"
            disabled={!url.trim() || processMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-700 disabled:bg-ink-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
          >
            {processMutation.isPending ? (
              <>
                <LoadingSpinner message="" />
                Processing...
              </>
            ) : (
              <>
                <Video className="h-4 w-4" />
                Process Video
              </>
            )}
          </button>
        </form>

        {processMutation.isError && (
          <div className="mt-4 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-danger-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-danger-800">Error</p>
              <p className="text-xs text-danger-600 mt-1">
                {processMutation.error instanceof Error
                  ? processMutation.error.message
                  : "Failed to process video. Please try again."}
              </p>
            </div>
          </div>
        )}

        {processMutation.isSuccess && (
          <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-success-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-success-700">Video Submitted!</p>
              <p className="text-xs text-success-600 mt-1">
                Your video is being processed. You can track progress on the dashboard.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-paper-100 rounded-xl p-4">
        <h3 className="text-sm font-medium text-ink-700 mb-3">Free Plan Limits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${remainingShort > 0 ? "bg-success-500" : "bg-danger-500"}`} />
            <span className="text-ink-600">
              <span className="font-medium">{remainingShort}</span> short videos remaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${remainingLong > 0 ? "bg-gold" : "bg-danger-500"}`} />
            <span className="text-ink-600">
              <span className="font-medium">{remainingLong}</span> long videos remaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal" />
            <span className="text-ink-600">
              Max <span className="font-medium">{maxDuration}</span> min per video
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
