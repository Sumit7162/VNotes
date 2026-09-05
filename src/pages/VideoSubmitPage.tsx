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
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Process a Video</h2>
        <p className="text-sm text-gray-500 mt-1">
          Paste a YouTube URL to generate AI-powered notes
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="youtube-url" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL
            </label>
            <input
              id="youtube-url"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
              disabled={processMutation.isPending}
            />
          </div>

          <button
            type="submit"
            disabled={!url.trim() || processMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
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
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-xs text-red-600 mt-1">
                {processMutation.error instanceof Error
                  ? processMutation.error.message
                  : "Failed to process video. Please try again."}
              </p>
            </div>
          </div>
        )}

        {processMutation.isSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Video Submitted!</p>
              <p className="text-xs text-green-600 mt-1">
                Your video is being processed. You can track progress on the dashboard.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-gray-50 rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Free Plan Limits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${remainingShort > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-gray-600">
              <span className="font-medium">{remainingShort}</span> short videos remaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${remainingLong > 0 ? "bg-orange-500" : "bg-red-500"}`} />
            <span className="text-gray-600">
              <span className="font-medium">{remainingLong}</span> long videos remaining
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-600">
              Max <span className="font-medium">{maxDuration}</span> min per video
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
