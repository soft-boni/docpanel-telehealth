import { NavLink } from "react-router";
import {
    Home,
    Pill,
    Package,
    MessageSquare,
    Heart,
} from "lucide-react";
import { usePatientBase } from "../PatientBaseContext";

interface TabItem {
    path: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    end?: boolean;
    dot?: boolean;
}

const tabDefs: TabItem[] = [
    { path: "/", icon: Home, label: "Home", end: true },
    { path: "/treatment", icon: Pill, label: "Treatment" },
    { path: "/orders", icon: Package, label: "Orders" },
    { path: "/messages", icon: MessageSquare, label: "Messages", dot: true },
    { path: "/profile", icon: Heart, label: "Profile" },
];

export function BottomTabBar() {
    const base = usePatientBase();
    const p = (path: string) => (path === "/" ? base || "/" : `${base}${path}`);

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-[#e2e6ef]"
            style={{
                height: 64,
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
                fontFamily: "var(--font-sans)",
            }}
        >
            {tabDefs.map((item) => (
                <NavLink
                    key={item.path}
                    to={p(item.path)}
                    end={item.end}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-0.5 py-1 px-3 transition-colors ${isActive ? "text-[#16a34a]" : "text-[#8892a8]"
                        }`
                    }
                >
                    {() => (
                        <>
                            <div className="relative">
                                <item.icon className="w-5 h-5" />
                                {item.dot && (
                                    <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-[#16a34a] rounded-full" />
                                )}
                            </div>
                            <span style={{ fontSize: "0.62rem", fontWeight: 500 }}>
                                {item.label}
                            </span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
