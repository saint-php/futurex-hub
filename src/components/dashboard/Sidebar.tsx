import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, ChevronLeft } from "lucide-react";

import { navigation } from "../../config/navigation";
import { logout } from "../../services/authService";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export default function Sidebar({ collapsed, onToggle }: Props) {
  async function handleLogout() {
    await logout();
    window.location.href = "/login";
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 272 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative hidden shrink-0 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900 md:flex"
    >
      {/* Brand */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-5 dark:border-slate-800">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_8px_18px_-6px_rgba(37,99,235,0.55)]">
          F
        </div>

        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="overflow-hidden whitespace-nowrap"
          >
            <p className="text-base font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50">
              FutureX
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Learning Hub
            </p>
          </motion.div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {navigation.map(({ name, path, icon: Icon, end, comingSoon }) => {
          if (comingSoon) {
            return (
              <div
                key={path}
                title={collapsed ? `${name} (soon)` : undefined}
                className={[
                  "relative flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 dark:text-slate-600",
                  collapsed ? "justify-center" : "justify-between",
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span className="truncate">{name}</span>}
                </span>
                {!collapsed && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                    Soon
                  </span>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={path}
              to={path}
              end={end}
              title={collapsed ? name : undefined}
              className={({ isActive }) =>
                [
                  "relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center" : "",
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-[inset_0_0_0_1px_rgba(37,99,235,0.1)] dark:bg-blue-500/10 dark:text-blue-400 dark:shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 h-5 w-1 rounded-r-full bg-blue-600 dark:bg-blue-400" />
                  )}
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && <span className="truncate">{name}</span>}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-100 p-3 dark:border-slate-800">
        <button
          onClick={handleLogout}
          title={collapsed ? "Logout" : undefined}
          className={[
            "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 transition-colors duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40",
            collapsed ? "justify-center" : "",
          ].join(" ")}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors duration-200 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/40 dark:hover:text-blue-400"
      >
        <motion.span
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          <ChevronLeft size={14} />
        </motion.span>
      </button>
    </motion.aside>
  );
}
