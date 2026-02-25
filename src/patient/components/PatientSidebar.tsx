import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
    Home,
    Pill,
    Package,
    MessageSquare,
    Settings,
    HelpCircle,
    LogOut,
    ChevronUp,
} from "lucide-react";
import { EviraLogo } from "../../app/components/EviraLogo";

interface NavItem {
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    end?: boolean;
    badge?: number;
}

const navItems: NavItem[] = [
    { to: "/", icon: Home, label: "Home", end: true },
    { to: "/treatment", icon: Pill, label: "My Treatment" },
    { to: "/orders", icon: Package, label: "Orders & Shipping" },
    { to: "/messages", icon: MessageSquare, label: "Messages", badge: 1 },
];

export function PatientSidebar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <aside
            className="hidden md:flex flex-col h-screen w-[230px] border-r border-[#e2e6ef] bg-white shrink-0 fixed left-0 top-0 z-40"
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
                            `relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                                ? "bg-[#ecfdf5] text-[#16a34a]"
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
                                    style={{
                                        fontSize: "0.85rem",
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                >
                                    {item.label}
                                </span>
                                {item.badge && (
                                    <span
                                        className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-white"
                                        style={{
                                            backgroundColor: "#16a34a",
                                            fontSize: "0.65rem",
                                            fontWeight: 600,
                                            fontFamily: "var(--font-mono)",
                                        }}
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Patient Info + Dropdown */}
            <div className="relative px-4 py-4 border-t border-[#e2e6ef]" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2.5 px-1 w-full text-left hover:bg-[#f3f4f8] rounded-lg py-1.5 transition-colors"
                >
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                        style={{
                            background: "linear-gradient(135deg, #16a34a, #15803d)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                        }}
                    >
                        OR
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <span
                            className="text-[#1a1d2e] truncate"
                            style={{ fontSize: "0.8rem", fontWeight: 500 }}
                        >
                            Omar Al-Rashid
                        </span>
                        <span
                            className="text-[#8892a8] truncate"
                            style={{ fontSize: "0.68rem" }}
                        >
                            Patient
                        </span>
                    </div>
                    <ChevronUp
                        className="w-4 h-4 text-[#8892a8] shrink-0 transition-transform"
                        style={{ transform: menuOpen ? "rotate(0deg)" : "rotate(180deg)" }}
                    />
                </button>

                {/* Dropdown */}
                {menuOpen && (
                    <div
                        className="absolute bottom-full left-3 right-3 mb-2 bg-white rounded-xl border border-[#e2e6ef] shadow-lg overflow-hidden"
                        style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
                    >
                        {[
                            { icon: Settings, label: "Settings", action: () => { navigate("/settings"); setMenuOpen(false); } },
                            { icon: HelpCircle, label: "Help", action: () => { navigate("/help"); setMenuOpen(false); } },
                            { icon: LogOut, label: "Logout", action: () => { navigate("/"); setMenuOpen(false); } },
                        ].map((item) => (
                            <button
                                key={item.label}
                                onClick={item.action}
                                className="flex items-center gap-2.5 px-4 py-2.5 w-full text-left hover:bg-[#f3f4f8] transition-colors"
                            >
                                <item.icon className="w-4 h-4 text-[#8892a8]" />
                                <span
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: 500,
                                        color: item.label === "Logout" ? "#dc2626" : "#1a1d2e",
                                    }}
                                >
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}
