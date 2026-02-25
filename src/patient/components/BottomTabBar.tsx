import { NavLink } from "react-router";
import {
    Home,
    Pill,
    Package,
    MessageSquare,
    User,
} from "lucide-react";

interface TabItem {
    to: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    end?: boolean;
    dot?: boolean;
}

const tabItems: TabItem[] = [
    { to: "/patient", icon: Home, label: "Home", end: true },
    { to: "/patient/treatment", icon: Pill, label: "Treatment" },
    { to: "/patient/orders", icon: Package, label: "Orders" },
    { to: "/patient/messages", icon: MessageSquare, label: "Messages", dot: true },
    { to: "/patient/account", icon: User, label: "Account" },
];

export function BottomTabBar() {
    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-white border-t border-[#e2e6ef]"
            style={{
                height: 64,
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
                fontFamily: "var(--font-sans)",
            }}
        >
            {tabItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                        `flex flex-col items-center justify-center gap-0.5 py-1 px-3 transition-colors ${isActive ? "text-[#16a34a]" : "text-[#8892a8]"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <div className="relative">
                                <item.icon
                                    className="w-5 h-5"
                                />
                                {item.dot && (
                                    <span className="absolute -top-0.5 -right-1 w-2 h-2 bg-[#16a34a] rounded-full" />
                                )}
                            </div>
                            <span
                                style={{
                                    fontSize: "0.62rem",
                                    fontWeight: isActive ? 600 : 500,
                                }}
                            >
                                {item.label}
                            </span>
                        </>
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
