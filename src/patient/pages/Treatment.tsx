import { useNavigate } from "react-router";
import { usePatientPath } from "../PatientBaseContext";
import { toast } from "sonner";
import { useState } from "react";
import { PatientModal } from "../components/PatientModal";
import { usePrototype } from "../PrototypeContext";

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
    const { data } = usePrototype();

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
                    {data.primaryMed.emoji}
                </div>
                <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1d2e" }}>
                        {data.primaryMed.name}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "#8892a8", marginTop: 2 }}>
                        {data.primaryMed.instructions}
                    </p>
                </div>
                <div className="text-right shrink-0">
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#16a34a" }}>
                        {data.primaryMed.price}
                    </p>
                </div>
            </div>

            {/* Add-ons */}
            {data.addOns.length > 0 && (
                <div className="flex flex-col gap-2 mt-3">
                    {data.addOns.map((addon) => (
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
                                    {addon.instructions}
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
            )}

            {/* Total */}
            <div
                className="flex items-center justify-between mt-4 pt-4"
                style={{ borderTop: "1px solid #e2e6ef" }}
            >
                <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>Monthly total</span>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#16a34a" }}>
                    {data.monthlyTotal}
                </span>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. DOSE JOURNEY TIMELINE
   ═══════════════════════════════════════════ */

function DoseJourney() {
    const { data } = usePrototype();

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>YOUR DOSE JOURNEY</p>

            <div className="flex items-center justify-between mt-5">
                {data.doseSteps.map((step, i) => {
                    const isLast = i === data.doseSteps.length - 1;
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

function ProgressChart() {
    const { data } = usePrototype();
    const { label, unit, direction, startValue, currentValue, changeText, barData, monthLabels } = data.progress;

    const [isModalOpen, setModalOpen] = useState(false);
    const [logInput, setLogInput] = useState("");

    const handleLog = () => {
        if (!logInput) return;
        toast.success(`${label} logged: ${logInput} ${unit}!`);
        setModalOpen(false);
        setLogInput("");
    };

    return (
        <div style={cardStyle} className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p style={sectionTitle}>{label.toUpperCase()} PROGRESS</p>
                <button
                    onClick={() => setModalOpen(true)}
                    className="px-3 py-1 rounded-lg transition-opacity hover:opacity-80"
                    style={{
                        backgroundColor: "#ecfdf5",
                        border: "1px solid #bbf7d0",
                        color: "#16a34a",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                    }}
                >
                    + Log {label}
                </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mt-4 flex-wrap">
                <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>Start: {startValue} {unit}</span>
                <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>→</span>
                <span style={{ fontSize: "0.82rem", color: "#1a1d2e" }}>
                    Now: <strong style={{ color: "#16a34a" }}>{currentValue} {unit}</strong>
                </span>
                <span
                    className="ml-auto"
                    style={{ fontSize: "0.92rem", fontWeight: 700, color: direction === "down" ? "#16a34a" : "#2563eb" }}
                >
                    {changeText}
                </span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end gap-2 mt-5" style={{ height: 60 }}>
                {barData.map((h, i) => (
                    <div
                        key={i}
                        className="flex-1 rounded-t-md"
                        style={{
                            height: `${h}%`,
                            backgroundColor: i === barData.length - 1 ? "#16a34a" : "#2563eb",
                            opacity: 0.85,
                        }}
                    />
                ))}
            </div>

            {/* X-Axis */}
            <div className="flex justify-between mt-2">
                {monthLabels.map((m, i) => (
                    <span key={i} style={{ fontSize: "0.56rem", color: "#8892a8" }}>
                        {m}
                    </span>
                ))}
            </div>

            {/* TRACKING MODAL */}
            <PatientModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                title={`Log Current ${label}`}
            >
                <div>
                    <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#8892a8", textTransform: "uppercase" }}>
                        Current {label} ({unit})
                    </label>
                    <input
                        type="number"
                        placeholder={`e.g. ${currentValue}`}
                        value={logInput}
                        onChange={(e) => setLogInput(e.target.value)}
                        className="w-full mt-2 outline-none transition-colors focus:border-[#2563eb]"
                        style={{
                            backgroundColor: "#f3f4f8",
                            border: "1px solid #e2e6ef",
                            borderRadius: 10,
                            padding: "10px 14px",
                            fontSize: "0.88rem",
                            color: "#1a1d2e",
                        }}
                    />
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="flex-1 py-2.5 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                            style={{ border: "1px solid #e2e6ef", fontSize: "0.82rem", fontWeight: 600, color: "#4a5068" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLog}
                            className="flex-1 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "#16a34a", border: "none", fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}
                        >
                            Save Log
                        </button>
                    </div>
                </div>
            </PatientModal>
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. ACTION BUTTONS
   ═══════════════════════════════════════════ */

function ActionButtons() {
    const { data } = usePrototype();
    const navigate = useNavigate();
    const p = usePatientPath();
    const [isSideEffectOpen, setSideEffectOpen] = useState(false);
    const [isPauseOpen, setPauseOpen] = useState(false);
    const [selectedEffects, setSelectedEffects] = useState<string[]>([]);

    const handleReport = () => {
        toast.success("Report submitted to your doctor.");
        setSideEffectOpen(false);
        setSelectedEffects([]);
    };

    const handlePause = () => {
        toast("Treatment has been paused.");
        setPauseOpen(false);
    };

    const toggleEffect = (eff: string) => {
        setSelectedEffects(prev =>
            prev.includes(eff) ? prev.filter(e => e !== eff) : [...prev, eff]
        );
    };

    return (
        <div className="grid grid-cols-3 gap-2">
            <button
                onClick={() => navigate(p("/messages"))}
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
                onClick={() => setSideEffectOpen(true)}
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
                onClick={() => setPauseOpen(true)}
                className="py-3 rounded-xl transition-colors hover:bg-[#fff7ed]"
                style={{
                    backgroundColor: "#fff",
                    border: "1px solid #fed7aa",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#ea580c",
                }}
            >
                ⏸ Pause Treatment
            </button>

            {/* SIDE EFFECTS MODAL */}
            <PatientModal
                isOpen={isSideEffectOpen}
                onClose={() => setSideEffectOpen(false)}
                title="Report Side Effects"
            >
                <div className="flex flex-col gap-4">
                    <p style={{ fontSize: "0.84rem", color: "#4a5068", lineHeight: 1.5 }}>
                        Select any symptoms you have experienced recently. Your doctor will review these.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {data.sideEffects.map(eff => {
                            const active = selectedEffects.includes(eff);
                            return (
                                <button
                                    key={eff}
                                    onClick={() => toggleEffect(eff)}
                                    className="px-3 py-2 rounded-lg text-left transition-colors"
                                    style={{
                                        border: active ? "1px solid #2563eb" : "1px solid #e2e6ef",
                                        backgroundColor: active ? "#eff6ff" : "#f3f4f8",
                                        color: active ? "#2563eb" : "#4a5068",
                                        fontSize: "0.76rem",
                                        fontWeight: active ? 600 : 500,
                                    }}
                                >
                                    {eff}
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-2">
                        <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#8892a8", textTransform: "uppercase" }}>
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            className="w-full mt-2 outline-none p-3 rounded-lg"
                            style={{ backgroundColor: "#f3f4f8", border: "1px solid #e2e6ef", fontSize: "0.82rem", minHeight: 80, resize: "none" }}
                            placeholder="Describe severity or other details..."
                        />
                    </div>
                    <button
                        onClick={handleReport}
                        className="w-full py-2.5 mt-2 rounded-xl hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: "#2563eb", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}
                    >
                        Submit Report
                    </button>
                </div>
            </PatientModal>

            {/* PAUSE MODAL */}
            <PatientModal
                isOpen={isPauseOpen}
                onClose={() => setPauseOpen(false)}
                title="Pause Treatment?"
            >
                <div className="flex flex-col gap-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa" }}>
                        <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#9a3412" }}>
                            Pausing stops upcoming orders and billing.
                        </p>
                        <p style={{ fontSize: "0.76rem", color: "#9a3412", marginTop: 4, lineHeight: 1.5 }}>
                            Your active prescriptions will remain valid, but you won't receive your next shipment until you resume.
                        </p>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => setPauseOpen(false)}
                            className="flex-1 py-2.5 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                            style={{ border: "1px solid #e2e6ef", fontSize: "0.82rem", fontWeight: 600, color: "#4a5068" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePause}
                            className="flex-1 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: "#ea580c", border: "none", fontSize: "0.82rem", fontWeight: 600, color: "#fff" }}
                        >
                            Confirm Pause
                        </button>
                    </div>
                </div>
            </PatientModal>
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
            <ProgressChart />
            <ActionButtons />
        </div>
    );
}
