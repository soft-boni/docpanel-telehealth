import { useNavigate } from "react-router";
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
   1. CURRENT MEDICATIONS
   ═══════════════════════════════════════════ */

function CurrentMedications() {
    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>CURRENT MEDICATIONS</p>

            {/* Primary Medication */}
            <div
                className="flex items-center gap-3 mt-4 p-3"
                style={{
                    backgroundColor: "#ecfdf5",
                    border: "1px solid #bbf7d0",
                    borderRadius: 8,
                }}
            >
                <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                        width: 44,
                        height: 44,
                        backgroundColor: "#16a34a",
                        borderRadius: 10,
                        fontSize: "1.2rem",
                    }}
                >
                    💉
                </div>
                <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1d2e" }}>
                        Generic Semaglutide 0.5mg
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "#8892a8", marginTop: 2 }}>
                        Inject once weekly · Every Monday · Abdomen or thigh
                    </p>
                </div>
                <div className="text-right shrink-0">
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#16a34a" }}>
                        549 SAR
                    </p>
                    <p style={{ fontSize: "0.62rem", color: "#8892a8" }}>/month</p>
                </div>
            </div>

            {/* Add-ons */}
            <div className="flex flex-col gap-2 mt-3">
                {[
                    { emoji: "💊", name: "Metformin 500mg", sub: "Take daily with dinner", price: "+49 SAR" },
                    { emoji: "💊", name: "Vitamin B12", sub: "Take daily", price: "+29 SAR" },
                ].map((addon) => (
                    <div
                        key={addon.name}
                        className="flex items-center gap-3 p-3"
                        style={{ border: "1px solid #e2e6ef", borderRadius: 8, background: "#fff" }}
                    >
                        <span style={{ fontSize: "1.1rem" }}>{addon.emoji}</span>
                        <div className="flex-1 min-w-0">
                            <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
                                {addon.name}
                            </p>
                            <p style={{ fontSize: "0.68rem", color: "#8892a8", marginTop: 1 }}>
                                {addon.sub}
                            </p>
                        </div>
                        <p
                            className="shrink-0"
                            style={{ fontSize: "0.84rem", fontWeight: 700, color: "#16a34a" }}
                        >
                            {addon.price}
                        </p>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div
                className="flex items-center justify-between mt-4 pt-4"
                style={{ borderTop: "1px solid #e2e6ef" }}
            >
                <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>Monthly total</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#16a34a" }}>
                    627 SAR/mo
                </span>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. DOSE JOURNEY TIMELINE
   ═══════════════════════════════════════════ */

interface DoseStep {
    dose: string;
    sub: string;
    status: "done" | "current" | "future";
}

const doseSteps: DoseStep[] = [
    { dose: "0.25mg", sub: "Wk 1-4", status: "done" },
    { dose: "0.5mg", sub: "Current", status: "current" },
    { dose: "1.0mg", sub: "Wk 9-12", status: "future" },
    { dose: "Maintain", sub: "Wk 13+", status: "future" },
];

function DoseJourney() {
    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>YOUR DOSE JOURNEY</p>

            <div className="flex items-center justify-between mt-5">
                {doseSteps.map((step, i) => {
                    const isLast = i === doseSteps.length - 1;
                    return (
                        <div key={step.dose} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                {/* Circle */}
                                <div
                                    className="flex items-center justify-center rounded-full"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor:
                                            step.status === "done"
                                                ? "#16a34a"
                                                : step.status === "current"
                                                    ? "#2563eb"
                                                    : "transparent",
                                        border:
                                            step.status === "done"
                                                ? "none"
                                                : step.status === "current"
                                                    ? "2.5px solid #2563eb"
                                                    : "2px solid #e2e6ef",
                                        color: step.status === "done" || step.status === "current" ? "#fff" : "#8892a8",
                                        fontSize: "0.72rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    {step.status === "done" ? "✓" : step.status === "current" ? "●" : ""}
                                </div>
                                {/* Labels */}
                                <p
                                    className="mt-1.5"
                                    style={{
                                        fontSize: "0.72rem",
                                        fontWeight: 700,
                                        color: "#1a1d2e",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {step.dose}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.6rem",
                                        fontWeight: 500,
                                        color:
                                            step.status === "current"
                                                ? "#2563eb"
                                                : "#8892a8",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {step.sub}
                                </p>
                            </div>

                            {/* Connecting line */}
                            {!isLast && (
                                <div
                                    className="flex-1 mx-2"
                                    style={{
                                        height: 2,
                                        backgroundColor: step.status === "done" ? "#16a34a" : "#e2e6ef",
                                        borderRadius: 2,
                                        marginBottom: 30,
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
   3. WEIGHT PROGRESS GRAPH
   ═══════════════════════════════════════════ */

function WeightProgress() {
    const barHeights = [95, 85, 72, 60, 52, 48, 42, 38];
    const months = ["Nov", "Dec", "Jan", "Feb"];

    return (
        <div style={cardStyle} className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p style={sectionTitle}>WEIGHT PROGRESS</p>
                <button
                    onClick={() => toast.success("Weight logged!")}
                    className="px-3 py-1 rounded-lg"
                    style={{
                        backgroundColor: "#ecfdf5",
                        border: "1px solid #bbf7d0",
                        color: "#16a34a",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                    }}
                >
                    + Log Weight
                </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 flex-wrap">
                <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>Start: 103 kg</span>
                <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>→</span>
                <span style={{ fontSize: "0.82rem", color: "#1a1d2e" }}>
                    Now: <strong style={{ color: "#16a34a" }}>94.8 kg</strong>
                </span>
                <span
                    className="ml-auto"
                    style={{ fontSize: "0.92rem", fontWeight: 700, color: "#16a34a" }}
                >
                    -8.2 kg
                </span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-2 mt-5" style={{ height: 60 }}>
                {barHeights.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-md"
                        style={{
                            height: `${h}%`,
                            backgroundColor: i === barHeights.length - 1 ? "#16a34a" : "#2563eb",
                            opacity: 0.85,
                        }}
                    />
                ))}
            </div>

            {/* X-Axis */}
            <div className="flex justify-between mt-2">
                {months.map((m) => (
                    <span key={m} style={{ fontSize: "0.56rem", color: "#8892a8" }}>
                        {m}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. ACTION BUTTONS
   ═══════════════════════════════════════════ */

function ActionButtons() {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-3 gap-2">
            <button
                onClick={() => navigate("/messages")}
                className="py-3 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                style={{
                    border: "1px solid #e2e6ef",
                    background: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#1a1d2e",
                }}
            >
                💬 Message Doctor
            </button>
            <button
                onClick={() => toast("Side effect report submitted")}
                className="py-3 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                style={{
                    border: "1px solid #e2e6ef",
                    background: "#fff",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#1a1d2e",
                }}
            >
                ⚠️ Report Side Effect
            </button>
            <button
                onClick={() => toast("Treatment paused")}
                className="py-3 rounded-xl transition-colors"
                style={{
                    backgroundColor: "#fff7ed",
                    border: "1px solid #fed7aa",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#ea580c",
                }}
            >
                ⏸ Pause Treatment
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   TREATMENT PAGE
   ═══════════════════════════════════════════ */

export function Treatment() {
    return (
        <div className="p-5 md:p-8 flex flex-col gap-4">
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1a1d2e" }}>
                My Treatment
            </h2>
            <CurrentMedications />
            <DoseJourney />
            <WeightProgress />
            <ActionButtons />
        </div>
    );
}
