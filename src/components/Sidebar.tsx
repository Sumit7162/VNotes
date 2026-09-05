import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  User,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { to: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Dashboard" },
  { to: "/submit", icon: <Upload className="h-5 w-5" />, label: "Submit Video" },
  { to: "/notes", icon: <FileText className="h-5 w-5" />, label: "My Notes" },
  { to: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
];

type SidebarProps = {
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export function Sidebar({ onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  // Collapsing only applies from md up. On smaller screens the sidebar is a
  // drawer that is either fully open or off-screen, so narrowing it there would
  // leave an unreadable strip of icons over the content.
  const asideWidth = collapsed ? "md:w-20" : "md:w-64";
  const hideWhenCollapsed = collapsed ? "md:hidden" : "";
  const centerWhenCollapsed = collapsed ? "md:justify-center md:px-0" : "";

  return (
    <aside
      className={`w-64 ${asideWidth} h-full bg-white/90 border-r border-slate-200/80 shadow-[8px_0_30px_rgba(15,23,42,0.04)] backdrop-blur-xl flex flex-col transition-[width] duration-200 ease-in-out print:hidden`}
    >
      <div
        className={`flex items-center gap-2 border-b border-slate-200/80 p-4 ${
          collapsed ? "md:flex-col md:gap-3" : "justify-between"
        }`}
      >
        <Link to="/" onClick={onClose} className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 shrink-0 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl shadow-sm flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className={`text-lg font-bold text-slate-900 truncate ${hideWhenCollapsed}`}>
            VideoNotes
          </span>
        </Link>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            className="hidden md:flex shrink-0 p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-5 w-5" />
            ) : (
              <PanelLeftClose className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              // The label is the accessible name when expanded; collapsed it is
              // hidden, so the icon needs one of its own.
              title={collapsed ? item.label : undefined}
              aria-label={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${centerWhenCollapsed} ${
                isActive
                  ? "bg-gradient-to-r from-sky-50 to-indigo-50 text-sky-700 shadow-sm ring-1 ring-sky-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className={`truncate ${hideWhenCollapsed}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/80">
        <button
          onClick={() => logout()}
          title={collapsed ? "Sign Out" : undefined}
          aria-label={collapsed ? "Sign Out" : undefined}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors w-full ${centerWhenCollapsed}`}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className={`truncate ${hideWhenCollapsed}`}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
