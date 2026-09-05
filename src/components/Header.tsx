import { useAuth } from "../hooks/useAuth";
import { Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuth();
  const displayName = user?.full_name || "User";

  return (
    <header className="bg-paper-50 border-b border-line px-4 py-3 sm:px-6 print:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-ink-600 hover:bg-paper-200 rounded-xl transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          )}
          <h1 className="font-display text-lg font-semibold text-ink-900 tracking-tight hidden sm:block">Video Notes AI</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-600 hidden sm:inline">
            Welcome, <span className="font-semibold text-ink-900">{displayName}</span>
          </span>
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-9 h-9 rounded-full border border-line shadow-sm"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-accent-100 flex items-center justify-center text-accent-700 font-semibold shadow-sm">
              {displayName.charAt(0)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
