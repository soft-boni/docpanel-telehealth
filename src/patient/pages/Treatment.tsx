import { useNavigate } from "react-router";
import { usePatientPath } from "../PatientBaseContext";
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
    const [isWeightModalOpen, setWeightModalOpen] = useState(false);
    const [weightInput, setWeightInput] = useState("");

    const handleLogWeight = () => {
        if (!weightInput) return;
        toast.success(`Weight logged: ${weightInput} kg!`);
        setWeightModalOpen(false);
        setWeightInput("");
    };

    return (
        <div style={cardStyle} className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <p style={sectionTitle}>WEIGHT PROGRESS</p>
                <button
                    onClick={() => setWeightModalOpen(true)}
                    className="px-3 py-1 rounded-lg transition-opacity hover:opacity-80"
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

            {/* WEIGHT MODAL */}
            <PatientModal
                isOpen={isWeightModalOpen}
                onClose={() => setWeightModalOpen(false)}
                title="Log Current Weight"
            >
                <div>
                    <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#8892a8", textTransform: "uppercase" }}>
                        Current Weight (kg)
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 94.5"
                        value={weightInput}
                        onChange={(e) => setWeightInput(e.target.value)}
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
                            onClick={() => setWeightModalOpen(false)}
                            className="flex-1 py-2.5 rounded-xl hover:bg-[#f3f4f8] transition-colors"
                            style={{ border: "1px solid #e2e6ef", fontSize: "0.82rem", fontWeight: 600, color: "#4a5068" }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogWeight}
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
    const navigate = useNavigate();
    const p = usePatientPath();
    const [isSideEffectOpen, setSideEffectOpen] = useState(false);
    const [isPauseOpen, setPauseOpen] = useState(false);
    const [selectedEffects, setSelectedEffects] = useState<string[]>([]);

    const handleReport = () => {
        toast.success("Side effects reported to your doctor.");
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

    const effectsList = ["Nausea", "Headache", "Fatigue", "Dizziness", "Stomach Pain", "Other"];

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
                        {effectsList.map(eff => {
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
            <WeightProgress />
            <ActionButtons />
        </div>
    );
}
