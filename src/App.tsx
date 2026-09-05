import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { LoginPage } from "./pages/LoginPage";

import { DashboardPage } from "./pages/DashboardPage";
import { VideoSubmitPage } from "./pages/VideoSubmitPage";
import { NotesListPage } from "./pages/NotesListPage";
import { NotesViewerPage } from "./pages/NotesViewerPage";
import { ProfilePage } from "./pages/ProfilePage";

function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.45),_transparent_35%),linear-gradient(180deg,#f8fbff_0%,#f4f7fb_100%)] text-slate-800 flex overflow-hidden print:block print:overflow-visible print:min-h-0 print:bg-none">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} print:hidden`}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-h-screen print:block print:min-h-0 min-w-0">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto print:overflow-visible print:block px-3 pb-8 pt-4 sm:px-6">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <AppLayout>
                <VideoSubmitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NotesListPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:videoId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NotesViewerPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
