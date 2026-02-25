import { useState } from "react";
import { toast } from "sonner";

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
   SETTINGS TABS
   ═══════════════════════════════════════════ */

const tabs = ["Account & Billing", "Personal Info", "Security", "Help & Support"];

function SettingsTabs({
    active,
    onSelect,
}: {
    active: string;
    onSelect: (t: string) => void;
}) {
    return (
        <div className="flex flex-col gap-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onSelect(tab)}
                    className="text-left px-4 py-2.5 rounded-lg transition-colors"
                    style={{
                        backgroundColor: active === tab ? "#ecfdf5" : "transparent",
                        color: active === tab ? "#16a34a" : "#8892a8",
                        fontWeight: active === tab ? 600 : 500,
                        fontSize: "0.84rem",
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 1: YOUR SUBSCRIPTION
   ═══════════════════════════════════════════ */

function SubscriptionCard() {
    return (
        <div className="p-5" style={{ ...cardStyle, border: "2px solid #bbf7d0" }}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", color: "#16a34a", textTransform: "uppercase" }}>
                    YOUR SUBSCRIPTION
                </p>
                <span
                    className="px-2.5 py-1 rounded-md"
                    style={{ backgroundColor: "#ecfdf5", color: "#16a34a", fontSize: "0.66rem", fontWeight: 700 }}
                >
                    Active
                </span>
            </div>

            {/* Details */}
            <p className="mt-3" style={{ fontSize: "0.94rem", fontWeight: 700, color: "#1a1d2e" }}>
                Weight Loss Plan — 6 Month
            </p>
            <p style={{ fontSize: "0.7rem", color: "#8892a8", marginTop: 4 }}>
                627 SAR/month · Started Nov 15, 2025 · Next billing: Mar 1
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
                <button
                    onClick={() => toast("Change plan")}
                    className="px-3.5 py-2 rounded-lg hover:bg-[#f3f4f8] transition-colors"
                    style={{ border: "1px solid #e2e6ef", fontSize: "0.76rem", fontWeight: 600, color: "#1a1d2e", background: "#fff" }}
                >
                    Change Plan
                </button>
                <button
                    onClick={() => toast("Subscription paused")}
                    className="px-3.5 py-2 rounded-lg transition-colors"
                    style={{ border: "1px solid #fed7aa", fontSize: "0.76rem", fontWeight: 600, color: "#ea580c", background: "#fff" }}
                >
                    Pause
                </button>
                <button
                    onClick={() => toast("Cancellation requested")}
                    className="px-3.5 py-2 rounded-lg transition-colors"
                    style={{ border: "1px solid #fecaca", fontSize: "0.76rem", fontWeight: 600, color: "#dc2626", background: "#fff" }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 2: PAYMENT FAILED ALERT
   ═══════════════════════════════════════════ */

function PaymentFailedAlert() {
    return (
        <div
            className="flex items-center gap-4 p-4"
            style={{
                backgroundColor: "#fef2f2",
                border: "2px solid #fecaca",
                borderRadius: 10,
            }}
        >
            <span style={{ fontSize: "1.25rem" }}>⚠️</span>
            <div className="flex-1 min-w-0">
                <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#dc2626" }}>Payment failed</p>
                <p style={{ fontSize: "0.72rem", color: "#1a1d2e", marginTop: 2 }}>
                    Your card was declined. Update your payment method to continue treatment.
                </p>
            </div>
            <button
                onClick={() => toast("Update card dialog")}
                className="shrink-0 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#dc2626", color: "#fff", fontSize: "0.76rem", fontWeight: 600, border: "none" }}
            >
                Update Card
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 3: PAYMENT METHOD
   ═══════════════════════════════════════════ */

function PaymentMethodCard() {
    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>PAYMENT METHOD</p>

            <div className="flex items-center gap-3 mt-3">
                <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#f3f4f8",
                        borderRadius: 8,
                        fontSize: "1.1rem",
                    }}
                >
                    💳
                </div>
                <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>Visa ending in 4242</p>
                    <p style={{ fontSize: "0.68rem", color: "#8892a8", marginTop: 1 }}>Expires 08/2027</p>
                </div>
                <button
                    onClick={() => toast("Update card")}
                    className="shrink-0 px-3.5 py-2 rounded-lg hover:bg-[#f3f4f8] transition-colors"
                    style={{ border: "1px solid #e2e6ef", fontSize: "0.72rem", fontWeight: 600, color: "#1a1d2e", background: "#fff" }}
                >
                    Update Card
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 4: INSTALLMENT PLAN
   ═══════════════════════════════════════════ */

function InstallmentCard() {
    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>INSTALLMENT PLAN</p>

            <div className="flex flex-col gap-2.5 mt-3">
                <div className="flex items-center justify-between">
                    <span style={{ fontSize: "0.78rem", color: "#1a1d2e" }}>Payment 1 of 4: 157 SAR</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#16a34a" }}>Paid ✓</span>
                </div>
                <div className="flex items-center justify-between">
                    <span style={{ fontSize: "0.78rem", color: "#1a1d2e" }}>Payment 2 of 4: 157 SAR</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "#8892a8" }}>Due Mar 15</span>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   CARD 5: BILLING HISTORY
   ═══════════════════════════════════════════ */

function BillingHistoryCard() {
    const rows = [
        { date: "Feb 1, 2026", desc: "Monthly subscription", amount: "627 SAR" },
        { date: "Jan 1, 2026", desc: "Monthly subscription", amount: "627 SAR" },
    ];

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>BILLING HISTORY</p>

            <div className="flex flex-col mt-3">
                {rows.map((row, i) => (
                    <div
                        key={row.date}
                        className="flex items-center justify-between py-3 px-1"
                        style={{ borderBottom: i < rows.length - 1 ? "1px solid #e2e6ef" : "none" }}
                    >
                        <div className="flex-1 min-w-0">
                            <span style={{ fontSize: "0.78rem", color: "#8892a8" }}>{row.date}</span>
                            <span style={{ fontSize: "0.78rem", color: "#8892a8" }}> · {row.desc}</span>
                        </div>
                        <span className="shrink-0 mx-3" style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>
                            {row.amount}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#16a34a" }}>Paid ✓</span>
                            <button
                                onClick={() => toast("Receipt downloaded")}
                                style={{ fontSize: "0.72rem", fontWeight: 600, color: "#2563eb", background: "none", border: "none", cursor: "pointer" }}
                            >
                                Receipt
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   SETTINGS PAGE
   ═══════════════════════════════════════════ */

export function PatientSettings() {
    const [activeTab, setActiveTab] = useState("Account & Billing");

    return (
        <div className="p-5 md:p-8">
            <h2 className="mb-5" style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1a1d2e" }}>
                Settings
            </h2>

            <div
                className="grid gap-6"
                style={{ gridTemplateColumns: "200px 1fr" }}
            >
                {/* Left — Tabs (hidden on mobile, shown above content) */}
                <div className="hidden md:block">
                    <SettingsTabs active={activeTab} onSelect={setActiveTab} />
                </div>

                {/* Mobile tabs — horizontal scroll */}
                <div className="md:hidden col-span-full flex gap-2 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="shrink-0 px-3 py-2 rounded-lg transition-colors"
                            style={{
                                backgroundColor: activeTab === tab ? "#ecfdf5" : "#fff",
                                border: activeTab === tab ? "1px solid #bbf7d0" : "1px solid #e2e6ef",
                                color: activeTab === tab ? "#16a34a" : "#8892a8",
                                fontWeight: activeTab === tab ? 600 : 500,
                                fontSize: "0.76rem",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right — Content */}
                <div className="flex flex-col gap-4">
                    {activeTab === "Account & Billing" && (
                        <>
                            <SubscriptionCard />
                            <PaymentFailedAlert />
                            <PaymentMethodCard />
                            <InstallmentCard />
                            <BillingHistoryCard />
                        </>
                    )}
                    {activeTab === "Personal Info" && (
                        <div style={cardStyle} className="p-5">
                            <p style={sectionTitle}>PERSONAL INFORMATION</p>
                            <p className="mt-3" style={{ fontSize: "0.82rem", color: "#8892a8" }}>
                                Personal info editing will be available here.
                            </p>
                        </div>
                    )}
                    {activeTab === "Security" && (
                        <div style={cardStyle} className="p-5">
                            <p style={sectionTitle}>SECURITY SETTINGS</p>
                            <p className="mt-3" style={{ fontSize: "0.82rem", color: "#8892a8" }}>
                                Password and security settings will be available here.
                            </p>
                        </div>
                    )}
                    {activeTab === "Help & Support" && (
                        <div style={cardStyle} className="p-5">
                            <p style={sectionTitle}>HELP & SUPPORT</p>
                            <p className="mt-3" style={{ fontSize: "0.82rem", color: "#8892a8" }}>
                                FAQs and support contact will be available here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
