import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useVideos } from "../hooks/useVideos";
import { useAuth } from "../hooks/useAuth";
import { useUsage } from "../hooks/useUsage";
import { VideoCard } from "../components/VideoCard";
import { UsageStats } from "../components/UsageStats";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { FileText, ArrowRight, AlertCircle, CheckCircle, Circle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { VideoStatus } from "../types";

const processingSteps: Array<{ status: VideoStatus; label: string }> = [
  { status: "pending", label: "Queued" },
  { status: "downloading", label: "Download" },
  { status: "extracting_audio", label: "Audio" },
  { status: "transcribing", label: "Transcript" },
  { status: "generating_notes", label: "Notes" },
  { status: "completed", label: "Done" },
];

const activeStatusLabels: Record<VideoStatus, string> = {
  pending: "Waiting in queue",
  downloading: "Downloading video",
  extracting_audio: "Extracting audio",
  transcribing: "Creating transcript",
  generating_notes: "Generating notes",
  completed: "Notes ready",
  failed: "Processing failed",
};

export function DashboardPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const displayName = user?.full_name || "User";
  const hadActiveVideo = useRef(false);
  const {
    data: videosData,
    isLoading: videosLoading,
    isFetching: videosFetching,
    isError: videosError,
    error: videosErrorDetail,
  } = useVideos(10);
  const hasActiveVideo = videosData?.videos.some(
    (video) => video.status !== "completed" && video.status !== "failed"
  ) ?? false;
  const activeVideo = videosData?.videos.find(
    (video) => video.status !== "completed" && video.status !== "failed"
  );
  const activeStepIndex = Math.max(
    0,
    processingSteps.findIndex((step) => step.status === activeVideo?.status)
  );
  const {
    data: usageData,
    isLoading: usageLoading,
    isError: usageError,
    error: usageErrorDetail,
  } = useUsage(hasActiveVideo ? 10000 : false);

  useEffect(() => {
    if (hadActiveVideo.current && !hasActiveVideo) {
      queryClient.invalidateQueries({ queryKey: ["usage"] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    }
    hadActiveVideo.current = hasActiveVideo;
  }, [hasActiveVideo, queryClient]);

  if ((videosLoading && !videosData) || (usageLoading && !usageData)) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back, {displayName}</h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Overview of your video processing activity
          </p>
        </div>
        <Link
          to="/submit"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-sky-200 transition-all duration-200"
        >
          Process New Video
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <UsageStats
        usage={usageData?.today}
        totalVideos={videosData?.total ?? usageData?.total_videos ?? 0}
      />

      {activeVideo && (
        <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-indigo-50 p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                Current processing
              </p>
              <h3 className="mt-1 truncate text-sm font-semibold text-slate-900">
                {activeVideo.title || "Processing video"}
              </h3>
              <p className="mt-1 text-xs text-slate-600">
                {activeStatusLabels[activeVideo.status]}
              </p>
            </div>
            <div className="grid min-w-0 grid-cols-3 gap-2 sm:grid-cols-6 lg:w-[560px]">
              {processingSteps.map((step, index) => {
                const isCurrent = index === activeStepIndex;
                const isDone = index < activeStepIndex;

                return (
                  <div
                    key={step.status}
                    className="flex min-w-0 items-center gap-1.5 text-xs font-medium"
                  >
                    {isCurrent ? (
                      <Loader2 className="h-3.5 w-3.5 flex-shrink-0 animate-spin text-sky-600" />
                    ) : isDone ? (
                      <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 flex-shrink-0 text-slate-300" />
                    )}
                    <span
                      className={
                        isCurrent
                          ? "truncate text-sky-700"
                          : isDone
                            ? "truncate text-slate-700"
                            : "truncate text-slate-400"
                      }
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {(videosError || usageError) && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Dashboard data could not be loaded
              </p>
              <p className="mt-1 text-xs text-red-600">
                {videosErrorDetail instanceof Error
                  ? videosErrorDetail.message
                  : usageErrorDetail instanceof Error
                    ? usageErrorDetail.message
                    : "Please check that the backend is running and your login token is valid."}
              </p>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Videos</h3>
            {hasActiveVideo && (
              <p className="text-xs text-gray-500">
                Processing progress updates automatically while this page stays open.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {videosFetching && hasActiveVideo && (
              <span className="text-xs font-medium text-primary-600">Updating status...</span>
            )}
            {videosData && videosData.total > 10 && (
              <Link to="/notes" className="text-sm text-primary-600 hover:text-primary-800">
                View All ({videosData.total})
              </Link>
            )}
          </div>
        </div>

        {!videosData || videosData.videos.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No videos yet
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Submit a YouTube video to get started with AI-powered note-taking.
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Submit Your First Video
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {videosData.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
