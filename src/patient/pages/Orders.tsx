import { toast } from "sonner";
import { useState } from "react";
import { PatientModal } from "../components/PatientModal";

/* ─── Shared ─── */

const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e2e6ef",
    borderRadius: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const sectionTitle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#8892a8",
    textTransform: "uppercase" as const,
};

/* ═══════════════════════════════════════════
   1. CURRENT ORDER TRACKING
   ═══════════════════════════════════════════ */

interface TrackStep {
    label: string;
    status: "done" | "current" | "future";
}

const trackSteps: TrackStep[] = [
    { label: "Prescribed", status: "done" },
    { label: "Preparing", status: "done" },
    { label: "Shipped", status: "current" },
    { label: "Delivered", status: "future" },
];

function CurrentOrderCard() {
    return (
        <div
            className="p-5"
            style={{
                ...cardStyle,
                border: "2px solid #bbf7d0",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", color: "#16a34a", textTransform: "uppercase" }}>
                    📦 CURRENT ORDER
                </p>
                <span style={{ fontSize: "0.68rem", color: "#8892a8" }}>Order #EVR-2026-0847</span>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mt-5">
                {trackSteps.map((step, i) => {
                    const isLast = i === trackSteps.length - 1;
                    return (
                        <div key={step.label} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex items-center justify-center rounded-full"
                                    style={{
                                        width: 28,
                                        height: 28,
                                        backgroundColor:
                                            step.status === "done"
                                                ? "#16a34a"
                                                : step.status === "current"
                                                    ? "#eff6ff"
                                                    : "transparent",
                                        border:
                                            step.status === "done"
                                                ? "none"
                                                : step.status === "current"
                                                    ? "2px solid #2563eb"
                                                    : "2px solid #e2e6ef",
                                        color: step.status === "done" ? "#fff" : step.status === "current" ? "#2563eb" : "#8892a8",
                                        fontSize: "0.68rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    {step.status === "done" ? "✓" : ""}
                                </div>
                                <span
                                    className="mt-1.5"
                                    style={{
                                        fontSize: "0.62rem",
                                        fontWeight: 600,
                                        color: step.status === "done" ? "#16a34a" : step.status === "current" ? "#2563eb" : "#8892a8",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {!isLast && (
                                <div
                                    className="flex-1 mx-1.5"
                                    style={{
                                        height: 2,
                                        backgroundColor: step.status === "done" ? "#16a34a" : "#e2e6ef",
                                        borderRadius: 2,
                                        marginBottom: 20,
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Tracking Info Box */}
            <div
                className="mt-5 px-4 py-3"
                style={{
                    backgroundColor: "#f3f4f8",
                    borderRadius: 8,
                    fontSize: "0.68rem",
                    color: "#4a5068",
                    lineHeight: 1.6,
                }}
            >
                Tracking: SMSA-2026-48291 · ETA: Tomorrow, Feb 26 · Courier: SMSA Express
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. NEXT AUTO-REFILL
   ═══════════════════════════════════════════ */

function AutoRefillCard() {
    const [isRefillOpen, setRefillOpen] = useState(false);
    const [isSkipOpen, setSkipOpen] = useState(false);

    const handleRefill = () => {
        toast.success("Refill processing started.");
        setRefillOpen(false);
    };

    const handleSkip = () => {
        toast("Refill skipped for March.");
        setSkipOpen(false);
    };

    return (
        <div style={cardStyle} className="p-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Left */}
                <div>
                    <p style={sectionTitle}>NEXT AUTO-REFILL</p>
                    <p className="mt-2" style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1d2e" }}>
                        March 1, 2026
                    </p>
                    <p style={{ fontSize: "0.68rem", color: "#8892a8", marginTop: 2 }}>
                        Same medications · 627 SAR
                    </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => setRefillOpen(true)}
                        className="px-3.5 py-2 rounded-lg transition-colors"
                        style={{
                            backgroundColor: "#ecfdf5",
                            border: "1px solid #bbf7d0",
                            color: "#16a34a",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                        }}
                    >
                        Refill Early
                    </button>
                    <button
                        onClick={() => setSkipOpen(true)}
                        className="px-3.5 py-2 rounded-lg hover:bg-[#f3f4f8] transition-colors"
                        style={{
                            backgroundColor: "#fff",
                            border: "1px solid #e2e6ef",
                            color: "#8892a8",
                            fontSize: "0.76rem",
                            fontWeight: 600,
                        }}
                    >
                        Skip Month
                    </button>
                </div>
            </div>

            {/* REFILL EARLY MODAL */}
            <PatientModal
                isOpen={isRefillOpen}
                onClose={() => setRefillOpen(false)}
                title="Refill Early?"
            >
                <div>
                    <p style={{ fontSize: "0.84rem", color: "#4a5068", lineHeight: 1.5 }}>
                        Your next order is scheduled for March 1. Confirming an early refill will immediately charge your default payment method and dispatch your medication within 24 hours.
                    </p>
                    <div className="flex items-center justify-between mt-4 p-3 bg-[#f8f9fb] border border-[#e2e6ef] rounded-xl">
                        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1d2e" }}>Total Amount</span>
                        <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#16a34a" }}>627 SAR</span>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setRefillOpen(false)}
                            className="flex-1 py-2.5 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                            style={{ border: "1px solid #e2e6ef", fontSize: "0.82rem", fontWeight: 600, color: "#4a5068" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRefill}
                            className="flex-1 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "#16a34a", border: "none", fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}
                        >
                            Confirm Payment
                        </button>
                    </div>
                </div>
            </PatientModal>

            {/* SKIP MONTH MODAL */}
            <PatientModal
                isOpen={isSkipOpen}
                onClose={() => setSkipOpen(false)}
                title="Skip Next Refill?"
            >
                <div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
                        <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#9a3412" }}>
                            You are about to skip the March 1 refill.
                        </p>
                        <p style={{ fontSize: "0.76rem", color: "#9a3412", marginTop: 4, lineHeight: 1.5 }}>
                            Your active prescription will not be shipped, and you will not be billed. Your next scheduled shipment will be moved to April 1.
                        </p>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setSkipOpen(false)}
                            className="flex-1 py-2.5 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                            style={{ border: "1px solid #e2e6ef", fontSize: "0.82rem", fontWeight: 600, color: "#4a5068" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSkip}
                            className="flex-1 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "#ea580c", border: "none", fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}
                        >
                            Confirm Skip
                        </button>
                    </div>
                </div>
            </PatientModal>
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. ORDER HISTORY
   ═══════════════════════════════════════════ */

interface OrderRow {
    month: string;
    items: string;
    total: string;
    status: string;
    statusColor: string;
    statusBg: string;
}

const orderHistory: OrderRow[] = [
    {
        month: "Feb 2026",
        items: "Semaglutide + Metformin + B12",
        total: "627 SAR",
        status: "Shipped",
        statusColor: "#2563eb",
        statusBg: "#eff6ff",
    },
    {
        month: "Jan 2026",
        items: "Semaglutide + Metformin + B12",
        total: "627 SAR",
        status: "Delivered ✓",
        statusColor: "#16a34a",
        statusBg: "#ecfdf5",
    },
    {
        month: "Dec 2025",
        items: "Semaglutide + Metformin + B12",
        total: "627 SAR",
        status: "Delivered ✓",
        statusColor: "#16a34a",
        statusBg: "#ecfdf5",
    },
];

function OrderHistoryCard() {
    return (
        <div style={cardStyle} className="p-5">
            <p style={{ ...sectionTitle, marginBottom: 8 }}>ORDER HISTORY</p>

            <div className="flex flex-col">
                {orderHistory.map((order, i) => (
                    <div
                        key={order.month}
                        className="flex items-center justify-between py-3.5 px-1"
                        style={{
                            borderBottom: i < orderHistory.length - 1 ? "1px solid #e2e6ef" : "none",
                        }}
                    >
                        {/* Left */}
                        <div className="min-w-0 flex-1">
                            <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>
                                {order.month}
                            </p>
                            <p style={{ fontSize: "0.62rem", color: "#8892a8", marginTop: 2 }}>
                                {order.items}
                            </p>
                        </div>

                        {/* Center */}
                        <p
                            className="shrink-0 mx-4"
                            style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}
                        >
                            {order.total}
                        </p>

                        {/* Right — Badge */}
                        <span
                            className="shrink-0 px-2.5 py-1 rounded"
                            style={{
                                backgroundColor: order.statusBg,
                                color: order.statusColor,
                                fontSize: "0.68rem",
                                fontWeight: 700,
                            }}
                        >
                            {order.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   ORDERS PAGE
   ═══════════════════════════════════════════ */

export function Orders() {
    return (
        <div className="p-5 md:p-8 flex flex-col gap-4">
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1a1d2e" }}>
                Orders & Shipping
            </h2>
            <CurrentOrderCard />
            <AutoRefillCard />
            <OrderHistoryCard />
        </div>
    );
}
