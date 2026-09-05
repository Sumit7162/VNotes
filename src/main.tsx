import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function Root() {
  if (!googleClientId) {
    return (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.4),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-4">
            <div className="text-center max-w-md p-8 rounded-3xl border border-slate-200 bg-white/90 shadow-[0_20px_60px_rgba(148,163,184,0.15)] backdrop-blur-xl">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">VideoNotes AI</h1>
              <p className="text-slate-600 mb-4">
                Google Client ID is not configured. To run this app:
              </p>
              <ol className="text-left text-sm text-slate-500 space-y-2 list-decimal pl-5">
                <li>Create an OAuth Client ID at <code className="bg-slate-100 px-1 rounded">console.cloud.google.com</code></li>
                <li>Copy your Client ID</li>
                <li>Create <code className="bg-slate-100 px-1 rounded">frontend/.env</code> with:
                  <br />
                  <code className="bg-slate-100 px-2 py-1 block mt-1 rounded text-xs">
                    VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
                  </code>
                </li>
                <li>Restart the dev server</li>
              </ol>
            </div>
          </div>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }

  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
