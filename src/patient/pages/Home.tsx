import {
    MessageSquare,
    Package,
    Scale,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
    MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router";

/* ─── Shared ─── */

const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e2e6ef",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

/* ═══════════════════════════════════════════
   1. GREETING HEADER
   ═══════════════════════════════════════════ */

function GreetingHeader() {
    return (
        <div style={cardStyle} className="flex items-center justify-between px-5 py-4">
            <div>
                <h2
                    style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#1a1d2e",
                    }}
                >
                    Hello, Omar{" "}
                    <span role="img" aria-label="wave">
                        👋
                    </span>
                </h2>
                <p style={{ fontSize: "0.78rem", color: "#8892a8", marginTop: 2 }}>
                    You're on Week 8 of your journey
                </p>
            </div>
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                style={{
                    background: "linear-gradient(135deg, #16a34a, #15803d)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                }}
            >
                OR
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. CURRENT STATUS CARD
   ═══════════════════════════════════════════ */

interface StepData {
    label: string;
    done: boolean;
    active: boolean;
}

const steps: StepData[] = [
    { label: "Approved", done: true, active: false },
    { label: "Preparing", done: true, active: false },
    { label: "Shipped", done: false, active: true },
    { label: "Delivered", done: false, active: false },
];

function StatusCard() {
    return (
        <div
            className="px-5 py-5"
            style={{
                background: "linear-gradient(135deg, #0f172a, #164e63)",
                borderRadius: 12,
                color: "#fff",
            }}
        >
            <p
                style={{
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                }}
            >
                CURRENT STATUS
            </p>
            <h3
                style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    marginTop: 6,
                    lineHeight: 1.3,
                }}
            >
                📦 Your order is on its way
            </h3>
            <p
                style={{
                    fontSize: "0.76rem",
                    color: "rgba(255,255,255,0.65)",
                    marginTop: 4,
                }}
            >
                Tracking: SMSA-2026-48291 · Arriving tomorrow
            </p>

            {/* Stepper */}
            <div className="flex items-center justify-between mt-6">
                {steps.map((step, i) => {
                    const isLast = i === steps.length - 1;
                    return (
                        <div key={step.label} className="flex items-center flex-1">
                            {/* Circle */}
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex items-center justify-center rounded-full"
                                    style={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor: step.done
                                            ? "#16a34a"
                                            : step.active
                                                ? "rgba(59,130,246,0.25)"
                                                : "transparent",
                                        border: step.done
                                            ? "none"
                                            : step.active
                                                ? "2px solid #3b82f6"
                                                : "2px solid rgba(255,255,255,0.25)",
                                        fontSize: "0.7rem",
                                        fontWeight: 700,
                                        color: step.done ? "#fff" : step.active ? "#93c5fd" : "rgba(255,255,255,0.4)",
                                    }}
                                >
                                    {step.done ? "✓" : ""}
                                </div>
                                <span
                                    className="mt-1.5"
                                    style={{
                                        fontSize: "0.62rem",
                                        fontWeight: step.done || step.active ? 600 : 400,
                                        color: step.done
                                            ? "#4ade80"
                                            : step.active
                                                ? "#93c5fd"
                                                : "rgba(255,255,255,0.35)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connecting line */}
                            {!isLast && (
                                <div
                                    className="flex-1 mx-1"
                                    style={{
                                        height: 2,
                                        backgroundColor: step.done
                                            ? "#16a34a"
                                            : "rgba(255,255,255,0.12)",
                                        borderRadius: 2,
                                        marginBottom: 18,
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. QUICK ACTIONS GRID
   ═══════════════════════════════════════════ */

function QuickActions() {
    const navigate = useNavigate();

    const actions = [
        { icon: MessageSquare, label: "Message Doctor", color: "#2563eb", path: "/patient/messages" },
        { icon: Package, label: "Track Order", color: "#ea580c", path: "/patient/orders" },
        { icon: Scale, label: "Log Weight", color: "#7c3aed", path: "/patient/profile" },
        { icon: RefreshCw, label: "Refill Early", color: "#16a34a", path: "/patient/orders" },
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
            }}
        >
            {actions.map((a) => (
                <button
                    key={a.label}
                    onClick={() => navigate(a.path)}
                    style={cardStyle}
                    className="flex flex-col items-center justify-center gap-2 py-4 px-2 hover:bg-[#f8f9fb] transition-colors cursor-pointer"
                >
                    <a.icon className="w-5 h-5" style={{ color: a.color }} />
                    <span
                        style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            color: "#1a1d2e",
                            textAlign: "center",
                            lineHeight: 1.3,
                        }}
                    >
                        {a.label}
                    </span>
                </button>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. SPLIT LAYOUT – PROGRESS & TO-DO
   ═══════════════════════════════════════════ */

function ProgressCard() {
    const bars = [
        { height: 52, color: "#2563eb" },
        { height: 42, color: "#2563eb" },
        { height: 34, color: "#2563eb" },
        { height: 26, color: "#2563eb" },
        { height: 18, color: "#16a34a" },
    ];

    return (
        <div style={cardStyle} className="p-5">
            <p
                style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#8892a8",
                    textTransform: "uppercase",
                }}
            >
                YOUR PROGRESS
            </p>

            <p
                className="mt-3"
                style={{
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "#16a34a",
                    lineHeight: 1,
                }}
            >
                -8.2 kg
            </p>
            <p
                style={{
                    fontSize: "0.72rem",
                    color: "#8892a8",
                    marginTop: 4,
                    lineHeight: 1.4,
                }}
            >
                Lost since starting · 9.1% of body weight
            </p>

            {/* Mini bar chart */}
            <div className="flex items-end gap-2 mt-5" style={{ height: 60 }}>
                {bars.map((bar, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-md"
                        style={{
                            height: bar.height,
                            backgroundColor: bar.color,
                            opacity: 0.85,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function ToDoCard() {
    const items = [
        {
            icon: <AlertCircle className="w-4 h-4" style={{ color: "#ea580c" }} />,
            text: "Complete monthly check-in",
            done: false,
        },
        {
            icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16a34a" }} />,
            text: "Injection this week",
            done: true,
        },
        {
            icon: <MessageCircle className="w-4 h-4" style={{ color: "#2563eb" }} />,
            text: "New message from Dr. Alharbi",
            done: false,
        },
    ];

    return (
        <div style={cardStyle} className="p-5">
            <p
                style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#8892a8",
                    textTransform: "uppercase",
                }}
            >
                TO-DO
            </p>

            <div className="flex flex-col gap-3.5 mt-4">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <span
                            style={{
                                fontSize: "0.82rem",
                                fontWeight: 500,
                                color: item.done ? "#8892a8" : "#1a1d2e",
                                textDecoration: item.done ? "line-through" : "none",
                                lineHeight: 1.4,
                            }}
                        >
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */

export function Home() {
    return (
        <div className="p-5 md:p-8 flex flex-col gap-4">
            <GreetingHeader />
            <StatusCard />
            <QuickActions />

            {/* Progress + To-Do split */}
            <div
                className="grid gap-3"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                }}
            >
                <ProgressCard />
                <ToDoCard />
            </div>
        </div>
    );
}
