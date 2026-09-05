import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Upload, FileText, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
  { to: "/submit", icon: <Upload className="h-5 w-5" />, label: "Submit Video" },
  { to: "/notes", icon: <FileText className="h-5 w-5" />, label: "My Notes" },
  { to: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-full bg-white/90 border-r border-slate-200/80 shadow-[8px_0_30px_rgba(15,23,42,0.04)] backdrop-blur-xl flex flex-col print:hidden">
      <div className="p-6 border-b border-slate-200/80">
        <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl shadow-sm flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">VideoNotes</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 shadow-sm ring-1 ring-sky-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/80">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
