import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  MessageSquare,
  Activity,
  CreditCard,
  Settings,
  LogOut,
  ChevronUp,
  X,
  BarChart3,
  UserPen
} from "lucide-react";

import { EviraLogo } from "./EviraLogo";

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  end?: boolean;
  badge?: { count: number; color: string };
}

const navItems: NavItem[] = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  {
    to: "/cases",
    icon: ClipboardList,
    label: "Cases",
    badge: { count: 3, color: "#dc2626" },
  },
  { to: "/patients", icon: Users, label: "Patients" },
  {
    to: "/messages",
    icon: MessageSquare,
    label: "Messages",
    badge: { count: 8, color: "#ea580c" },
  },
  { to: "/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

const dropdownItems = [
  { icon: UserPen, label: "Edit profile", path: "/settings" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: LogOut, label: "Logout", path: "/" },
];

export function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <aside
      className="flex flex-col h-screen w-[220px] border-r border-[#e2e6ef] bg-white shrink-0"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Logo */}
      <div className="flex items-center px-5 pt-6 pb-5">
        <EviraLogo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${isActive
                ? "bg-[#16a34a]/10 text-[#16a34a]"
                : "text-[#8892a8] hover:bg-[#f3f4f8] hover:text-[#1a1d2e]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ backgroundColor: "#16a34a" }}
                  />
                )}
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span
                  className="flex-1"
                  style={{ fontSize: "0.85rem", fontWeight: 500 }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-white"
                    style={{
                      backgroundColor: item.badge.color,
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {item.badge.count}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile Badge (bottom) */}
      <div className="px-4 py-4 border-t border-[#e2e6ef] relative" ref={menuRef}>
        {/* Dropdown menu */}
        {menuOpen && (
          <div
            className="absolute left-3 bottom-[calc(100%+6px)] w-[196px] bg-white border border-[#e2e6ef] rounded-xl overflow-hidden z-50"
            style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
          >
            {dropdownItems.map((item, i) => {
              const isLast = i === dropdownItems.length - 1;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setMenuOpen(false);
                    if (item.label === "Logout") {
                      setShowLogoutModal(true);
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-[#f3f4f8] ${!isLast ? "border-b border-[#e2e6ef]" : ""
                    }`}
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: isLast ? "#dc2626" : "#1a1d2e",
                  }}
                >
                  <item.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: isLast ? "#dc2626" : "#8892a8" }}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 px-1 rounded-lg hover:bg-[#f3f4f8] transition-colors py-1.5 -mx-0 cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              fontSize: "0.7rem",
              fontWeight: 600,
            }}
          >
            DA
          </div>
          <div className="flex flex-col min-w-0 flex-1 text-left">
            <span
              className="text-[#1a1d2e] truncate"
              style={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              Dr. Alharbi
            </span>
            <span
              className="text-[#8892a8] truncate"
              style={{ fontSize: "0.68rem" }}
            >
              Telehealth Provider
            </span>
          </div>
          <ChevronUp
            className="w-4 h-4 text-[#8892a8] shrink-0 transition-transform"
            style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[320px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 flex items-center justify-between border-b border-[#e2e6ef]">
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1d2e" }}>Confirm Logout</h3>
              <button onClick={() => setShowLogoutModal(false)} className="text-[#8892a8] hover:text-[#1a1d2e] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p style={{ fontSize: "0.86rem", color: "#64748b", lineHeight: 1.5 }}>
                Are you sure you want to log out of the Telehealth Doctor Panel?
              </p>
            </div>
            <div className="px-5 py-4 bg-[#f8f9fb] border-t border-[#e2e6ef] flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
                style={{ fontSize: "0.84rem", fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  navigate("/"); // Assuming root is login for now
                }}
                className="px-5 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#dc2626", fontSize: "0.84rem", fontWeight: 600 }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}