import { useState } from "react";
import { useNavigate } from "react-router";
import {
    MessageSquare,
    Package,
    Scale,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
    MessageCircle,
} from "lucide-react";

/* ─── Types ─── */

type PatientStatus =
    | "waiting"
    | "approved"
    | "shipped"
    | "delivered"
    | "dose_change"
    | "declined"
    | "payment_failed"
    | "paused";

const statusLabels: Record<PatientStatus, string> = {
    waiting: "1. Waiting",
    approved: "2. Approved",
    shipped: "3. Shipped",
    delivered: "4. Delivered (Active)",
    dose_change: "5. Dose Change",
    declined: "6. Declined",
    payment_failed: "7. Payment Failed",
    paused: "8. Paused",
};

/* ─── Shared ─── */

const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e2e6ef",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

/* ═══════════════════════════════════════════
   STATE SWITCHER (DEV TOOL)
   ═══════════════════════════════════════════ */

function StateSwitcher({
    value,
    onChange,
}: {
    value: PatientStatus;
    onChange: (s: PatientStatus) => void;
}) {
    return (
        <div
            className="sticky top-0 z-50 flex items-center gap-3 px-5 py-2.5"
            style={{
                background: "linear-gradient(90deg, #1e1b4b, #312e81)",
                borderBottom: "2px solid #6366f1",
            }}
        >
            <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#c7d2fe" }}>
                🔧 Prototype State Switcher
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as PatientStatus)}
                className="outline-none cursor-pointer"
                style={{
                    backgroundColor: "#1e1b4b",
                    color: "#e0e7ff",
                    border: "1px solid #6366f1",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: "0.74rem",
                    fontWeight: 600,
                }}
            >
                {(Object.entries(statusLabels) as [PatientStatus, string][]).map(
                    ([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    )
                )}
            </select>
        </div>
    );
}

/* ═══════════════════════════════════════════
   GREETING HEADER
   ═══════════════════════════════════════════ */

function GreetingHeader() {
    return (
        <div style={cardStyle} className="flex items-center justify-between px-5 py-4">
            <div>
                <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1a1d2e" }}>
                    Hello, Omar{" "}
                    <span role="img" aria-label="wave">👋</span>
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
   PAYMENT FAILED BANNER
   ═══════════════════════════════════════════ */

function PaymentBanner() {
    const navigate = useNavigate();
    return (
        <div
            className="flex items-center justify-between gap-4 px-5 py-3 rounded-xl flex-wrap"
            style={{ backgroundColor: "#fef2f2", border: "2px solid #fecaca" }}
        >
            <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#dc2626", flex: 1 }}>
                ⚠️ Your payment didn't go through. Update your card to continue treatment without interruption.
            </p>
            <button
                onClick={() => navigate("/settings")}
                className="shrink-0 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#dc2626", color: "#fff", fontSize: "0.76rem", fontWeight: 600, border: "none" }}
            >
                Update Card
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   STATUS CARD (Dynamic)
   ═══════════════════════════════════════════ */

interface StepData { label: string; done: boolean; active: boolean; }

function ShippingStepper({ steps }: { steps: StepData[] }) {
    return (
        <div className="flex items-center justify-between mt-5">
            {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                return (
                    <div key={step.label} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div
                                className="flex items-center justify-center rounded-full"
                                style={{
                                    width: 28, height: 28,
                                    backgroundColor: step.done ? "#16a34a" : step.active ? "rgba(59,130,246,0.25)" : "transparent",
                                    border: step.done ? "none" : step.active ? "2px solid #3b82f6" : "2px solid rgba(255,255,255,0.25)",
                                    fontSize: "0.7rem", fontWeight: 700,
                                    color: step.done ? "#fff" : step.active ? "#93c5fd" : "rgba(255,255,255,0.4)",
                                }}
                            >
                                {step.done ? "✓" : ""}
                            </div>
                            <span className="mt-1.5" style={{
                                fontSize: "0.62rem", fontWeight: step.done || step.active ? 600 : 400,
                                color: step.done ? "#4ade80" : step.active ? "#93c5fd" : "rgba(255,255,255,0.35)",
                                whiteSpace: "nowrap",
                            }}>
                                {step.label}
                            </span>
                        </div>
                        {!isLast && (
                            <div className="flex-1 mx-1" style={{
                                height: 2, backgroundColor: step.done ? "#16a34a" : "rgba(255,255,255,0.12)",
                                borderRadius: 2, marginBottom: 18,
                            }} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function StatusCard({ status }: { status: PatientStatus }) {
    if (status === "waiting") {
        return (
            <div className="px-5 py-5" style={{ backgroundColor: "#ea580c", borderRadius: 12, color: "#fff" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    ⏳ Your medical team is reviewing your case. You'll hear back within 24 hours.
                </h3>
            </div>
        );
    }

    if (status === "approved") {
        return (
            <div className="px-5 py-5" style={{ backgroundColor: "#16a34a", borderRadius: 12, color: "#fff" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    ✅ Great news! Your prescription has been approved. Your order is being prepared.
                </h3>
                <ShippingStepper steps={[
                    { label: "Prescribed", done: true, active: false },
                    { label: "Preparing", done: true, active: false },
                    { label: "Shipped", done: false, active: false },
                    { label: "Delivered", done: false, active: false },
                ]} />
            </div>
        );
    }

    if (status === "shipped") {
        return (
            <div className="px-5 py-5" style={{ background: "linear-gradient(135deg, #0f172a, #164e63)", borderRadius: 12, color: "#fff" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    📦 Your medication is on its way!
                </h3>
                <p className="mt-1" style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.65)" }}>
                    Tracking: SMSA-2026-48291 · Arriving tomorrow
                </p>
                <ShippingStepper steps={[
                    { label: "Prescribed", done: true, active: false },
                    { label: "Preparing", done: true, active: false },
                    { label: "Shipped", done: false, active: true },
                    { label: "Delivered", done: false, active: false },
                ]} />
            </div>
        );
    }

    if (status === "delivered") {
        return (
            <div className="px-5 py-5" style={{ background: "#fff", border: "2px solid #bbf7d0", borderRadius: 12, color: "#1a1d2e" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "#16a34a", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    🎉 Your treatment is active. Next refill: Mar 1.
                </h3>
            </div>
        );
    }

    if (status === "dose_change") {
        return (
            <div className="px-5 py-5" style={{ backgroundColor: "#7c3aed", borderRadius: 12, color: "#fff" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    💜 Your dose has been increased to 0.5mg. Here's what to expect...
                </h3>
                <p className="mt-1" style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.65)" }}>
                    Your new monthly cost is 627 SAR.
                </p>
            </div>
        );
    }

    if (status === "declined") {
        return (
            <div className="px-5 py-5" style={{ backgroundColor: "#dc2626", borderRadius: 12, color: "#fff" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    ❌ Our medical team has determined this treatment isn't right for you at this time. A full refund has been issued to your card.
                </h3>
            </div>
        );
    }

    if (status === "payment_failed") {
        return (
            <div className="px-5 py-5" style={{ background: "#fff", border: "2px solid #bbf7d0", borderRadius: 12, color: "#1a1d2e", opacity: 0.55 }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "#16a34a", textTransform: "uppercase" }}>CURRENT STATUS</p>
                <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                    🎉 Your treatment is active. Next refill: Mar 1.
                </h3>
            </div>
        );
    }

    // paused
    return (
        <div className="px-5 py-5" style={{ backgroundColor: "#ea580c", borderRadius: 12, color: "#fff" }}>
            <p style={{ fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>CURRENT STATUS</p>
            <h3 className="mt-1.5" style={{ fontSize: "1.08rem", fontWeight: 700, lineHeight: 1.4 }}>
                ⏸ Your subscription is paused until April 1. Resume anytime.
            </h3>
            <button
                className="mt-3 px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#fff", color: "#ea580c", fontSize: "0.82rem", fontWeight: 700, border: "none" }}
            >
                Resume Treatment
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   QUICK ACTIONS
   ═══════════════════════════════════════════ */

function QuickActions() {
    const navigate = useNavigate();
    const actions = [
        { icon: MessageSquare, label: "Message Doctor", color: "#2563eb", path: "/messages" },
        { icon: Package, label: "Track Order", color: "#ea580c", path: "/orders" },
        { icon: Scale, label: "Log Weight", color: "#7c3aed", path: "/profile" },
        { icon: RefreshCw, label: "Refill Early", color: "#16a34a", path: "/orders" },
    ];
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {actions.map((a) => (
                <button key={a.label} onClick={() => navigate(a.path)} style={cardStyle}
                    className="flex flex-col items-center justify-center gap-2 py-4 px-2 hover:bg-[#f8f9fb] transition-colors cursor-pointer"
                >
                    <a.icon className="w-5 h-5" style={{ color: a.color }} />
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#1a1d2e", textAlign: "center", lineHeight: 1.3 }}>{a.label}</span>
                </button>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   PROGRESS CARD (Dynamic)
   ═══════════════════════════════════════════ */

function ProgressCard({ status }: { status: PatientStatus }) {
    const isGreyed = status === "paused";

    if (status === "waiting") {
        return (
            <div style={cardStyle} className="p-5">
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", color: "#8892a8", textTransform: "uppercase" }}>YOUR PROGRESS</p>
                <p className="mt-3" style={{ fontSize: "0.82rem", color: "#8892a8" }}>Getting started...</p>
                <div className="mt-3 w-full rounded-full" style={{ height: 8, backgroundColor: "#e2e6ef" }}>
                    <div className="rounded-full" style={{ width: "25%", height: "100%", backgroundColor: "#ea580c" }} />
                </div>
                <p className="mt-1.5" style={{ fontSize: "0.62rem", color: "#8892a8" }}>25% — Profile complete</p>
            </div>
        );
    }

    const bars = [
        { height: 52, color: "#2563eb" },
        { height: 42, color: "#2563eb" },
        { height: 34, color: "#2563eb" },
        { height: 26, color: "#2563eb" },
        { height: 18, color: "#16a34a" },
    ];

    return (
        <div style={{ ...cardStyle, opacity: isGreyed ? 0.45 : 1, filter: isGreyed ? "grayscale(0.6)" : "none" }} className="p-5">
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", color: "#8892a8", textTransform: "uppercase" }}>YOUR PROGRESS</p>
            <p className="mt-3" style={{ fontSize: "1.6rem", fontWeight: 800, color: "#16a34a", lineHeight: 1 }}>-8.2 kg</p>
            <p style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 4, lineHeight: 1.4 }}>Lost since starting · 9.1% of body weight</p>
            <div className="flex items-end gap-2 mt-5" style={{ height: 60 }}>
                {bars.map((bar, i) => (
                    <div key={i} className="flex-1 rounded-t-md" style={{ height: bar.height, backgroundColor: bar.color, opacity: 0.85 }} />
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   TODO CARD (Dynamic)
   ═══════════════════════════════════════════ */

function ToDoCard({ status }: { status: PatientStatus }) {
    let items: { icon: React.ReactNode; text: string; done: boolean }[] = [];

    if (status === "waiting") {
        items = [{ icon: <AlertCircle className="w-4 h-4" style={{ color: "#ea580c" }} />, text: "Complete your profile details", done: false }];
    } else if (status === "dose_change") {
        items = [{ icon: <MessageCircle className="w-4 h-4" style={{ color: "#7c3aed" }} />, text: "Read new dose instructions", done: false }];
    } else {
        items = [
            { icon: <AlertCircle className="w-4 h-4" style={{ color: "#ea580c" }} />, text: "Complete monthly check-in", done: false },
            { icon: <CheckCircle2 className="w-4 h-4" style={{ color: "#16a34a" }} />, text: "Injection this week", done: true },
            { icon: <MessageCircle className="w-4 h-4" style={{ color: "#2563eb" }} />, text: "New message from Dr. Alharbi", done: false },
        ];
    }

    return (
        <div style={cardStyle} className="p-5">
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", color: "#8892a8", textTransform: "uppercase" }}>TO-DO</p>
            <div className="flex flex-col gap-3.5 mt-4">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <span style={{
                            fontSize: "0.82rem", fontWeight: 500,
                            color: item.done ? "#8892a8" : "#1a1d2e",
                            textDecoration: item.done ? "line-through" : "none",
                            lineHeight: 1.4,
                        }}>{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   DECLINED — DOCTOR MESSAGE
   ═══════════════════════════════════════════ */

function DeclinedExtras() {
    const navigate = useNavigate();
    return (
        <div style={cardStyle} className="p-5">
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", color: "#8892a8", textTransform: "uppercase" }}>DOCTOR'S MESSAGE</p>
            <p className="mt-3" style={{ fontSize: "0.82rem", color: "#4a5068", lineHeight: 1.6 }}>
                "Based on your medical history and current medications, we've determined that GLP-1 treatment carries too high a risk at this time. We recommend consulting with your primary care physician about alternative weight management options. Your full payment of 627 SAR has been refunded."
            </p>
            <p className="mt-2" style={{ fontSize: "0.72rem", color: "#8892a8" }}>— Dr. Alharbi</p>
            <button
                onClick={() => navigate("/")}
                className="mt-4 w-full py-3 rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#2563eb", color: "#fff", fontSize: "0.84rem", fontWeight: 700, border: "none" }}
            >
                Start a new consultation (Other Services)
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════ */

export function Home() {
    const [patientStatus, setPatientStatus] = useState<PatientStatus>("shipped");

    const hideProgressAndTodo = patientStatus === "declined";
    const showPaymentBanner = patientStatus === "payment_failed";

    return (
        <div className="flex flex-col">
            <StateSwitcher value={patientStatus} onChange={setPatientStatus} />

            <div className="p-5 md:p-8 flex flex-col gap-4">
                {showPaymentBanner && <PaymentBanner />}

                <GreetingHeader />
                <StatusCard status={patientStatus} />

                {patientStatus === "declined" && <DeclinedExtras />}

                {!hideProgressAndTodo && <QuickActions />}

                {!hideProgressAndTodo && (
                    <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                        <ProgressCard status={patientStatus} />
                        <ToDoCard status={patientStatus} />
                    </div>
                )}
            </div>
        </div>
    );
}
