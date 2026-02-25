import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Ban, X } from "lucide-react";
import { toast } from "sonner";
import { getCaseById, flagConfig, type CaseData } from "../data/mockData";

/* ═══════════════════════════════════════════
   SHARED
   ═══════════════════════════════════════════ */

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

/* ═══════════════════════════════════════════
   PATIENT HEADER
   ═══════════════════════════════════════════ */

function PatientHeader({ caseData, setShowExportModal }: { caseData: CaseData, setShowExportModal: (v: boolean) => void }) {
  const cfg = flagConfig[caseData.flag];
  const navigate = useNavigate();

  return (
    <div
      className="bg-white border-b border-[#e2e6ef] px-8 py-5"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Link
        to="/cases"
        className="inline-flex items-center gap-1.5 mb-4 text-[#2563eb] hover:underline"
        style={{ fontSize: "0.82rem", fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cases
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0"
            style={{
              backgroundColor: cfg.color,
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {caseData.initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1d2e" }}>
                {caseData.patientName}
              </span>
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: cfg.badgeBg,
                  color: cfg.color,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.03em",
                }}
              >
                {cfg.badge}
              </span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "#8892a8", marginTop: 2 }}>
              {caseData.email} · {caseData.age}y · {caseData.gender} · BMI{" "}
              {caseData.bmi}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/messages")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
            style={{ fontSize: "0.82rem", fontWeight: 500 }}
          >
            💬 Message
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
            style={{ fontSize: "0.82rem", fontWeight: 500 }}
          >
            📄 Export
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HARD STOP BANNER (RED only)
   ═══════════════════════════════════════════ */

function HardStopBanner({ caseData }: { caseData: CaseData }) {
  if (caseData.flag !== "red") return null;

  return (
    <div
      className="mx-8 mt-6 flex items-start gap-3 px-5 py-4"
      style={{
        backgroundColor: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: 12,
      }}
    >
      <Ban className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
      <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#dc2626", lineHeight: 1.5 }}>
        HARD STOP: Patient takes Isosorbide Mononitrate (nitrate). PDE5
        inhibitors contraindicated. Prescribing is blocked.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEFT COLUMN CARDS
   ═══════════════════════════════════════════ */

function DemographicsGrid({ caseData }: { caseData: CaseData }) {
  const items = [
    { label: "Age", value: `${caseData.age}y` },
    { label: "BMI", value: String(caseData.bmi) },
    { label: "Location", value: caseData.location },
    { label: "Service", value: caseData.type },
  ];
  return (
    <div style={cardStyle} className="p-5">
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center py-3 rounded-xl bg-[#f8f9fb]"
          >
            <span
              style={{
                fontSize: "1.15rem",
                fontWeight: 700,
                color: "#1a1d2e",
                fontFamily: "var(--font-mono)",
              }}
            >
              {item.value}
            </span>
            <span
              style={{
                fontSize: "0.72rem",
                color: "#8892a8",
                marginTop: 2,
                fontWeight: 500,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FlagsAlerts({ caseData }: { caseData: CaseData }) {
  const levelConfig = {
    red: { bg: "#fef2f2", border: "#fecaca", color: "#dc2626", emoji: "🔴" },
    yellow: { bg: "#fffbeb", border: "#fde68a", color: "#d97706", emoji: "🟡" },
    green: { bg: "#f0fdf4", border: "#bbf7d0", color: "#16a34a", emoji: "🟢" },
  };

  return (
    <div style={cardStyle} className="p-5">
      <h4
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#1a1d2e",
          marginBottom: 12,
        }}
      >
        Flags &amp; Alerts
      </h4>
      <div className="flex flex-col gap-2.5">
        {caseData.flags.map((flag, i) => {
          const lc = levelConfig[flag.level];
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
              style={{ backgroundColor: lc.bg, border: `1px solid ${lc.border}` }}
            >
              <span style={{ fontSize: "0.82rem" }}>{lc.emoji}</span>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: lc.color }}>
                {flag.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AIIntakeSummary({ caseData }: { caseData: CaseData }) {
  return (
    <div style={cardStyle} className="p-5">
      <h4
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#1a1d2e",
          marginBottom: 12,
        }}
      >
        AI Intake Summary
      </h4>
      <div
        className="px-4 py-3.5 rounded-xl"
        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
      >
        <span
          className="inline-block px-2 py-0.5 rounded-full mb-2"
          style={{
            backgroundColor: "#16a34a",
            color: "#fff",
            fontSize: "0.62rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.05em",
          }}
        >
          AI GENERATED
        </span>
        <p style={{ fontSize: "0.82rem", color: "#1a1d2e", lineHeight: 1.6 }}>
          {caseData.aiSummary}
        </p>
      </div>
    </div>
  );
}

function QuestionnaireResponses({ caseData }: { caseData: CaseData }) {
  return (
    <div style={cardStyle} className="p-5">
      <h4
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#1a1d2e",
          marginBottom: 12,
        }}
      >
        Questionnaire Responses
      </h4>
      <div className="flex flex-col gap-0">
        {caseData.questionnaire.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 py-3 ${i < caseData.questionnaire.length - 1
              ? "border-b border-[#e2e6ef]"
              : ""
              }`}
          >
            <span style={{ fontSize: "0.78rem", color: "#8892a8", fontWeight: 500 }}>
              {item.q}
            </span>
            <span style={{ fontSize: "0.84rem", color: "#1a1d2e" }}>
              {item.a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CurrentMedications({ caseData }: { caseData: CaseData }) {
  if (caseData.meds.length === 0) return null;

  return (
    <div style={cardStyle} className="overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e" }}>
          Current Medications
        </h4>
      </div>
      <table className="w-full" style={{ fontSize: "0.82rem" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fb" }}>
            <th
              className="text-left px-5 py-2.5"
              style={{ fontWeight: 600, color: "#8892a8", fontSize: "0.72rem" }}
            >
              Medication
            </th>
            <th
              className="text-left px-5 py-2.5"
              style={{ fontWeight: 600, color: "#8892a8", fontSize: "0.72rem" }}
            >
              Condition
            </th>
          </tr>
        </thead>
        <tbody>
          {caseData.meds.map((med) => (
            <tr
              key={med.name}
              className="border-t border-[#e2e6ef]"
              style={med.flagged ? { backgroundColor: "#fef2f2" } : undefined}
            >
              <td
                className="px-5 py-3"
                style={{
                  fontWeight: med.flagged ? 600 : 400,
                  color: med.flagged ? "#dc2626" : "#1a1d2e",
                }}
              >
                {med.name}
              </td>
              <td
                className="px-5 py-3"
                style={{ color: med.flagged ? "#dc2626" : "#8892a8" }}
              >
                {med.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AITreatmentSuggestion({ caseData }: { caseData: CaseData }) {
  return (
    <div style={cardStyle} className="p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e" }}>
          AI Treatment Suggestion
        </h4>
        <span
          className="px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(22,163,74,0.12)",
            color: "#16a34a",
            fontSize: "0.65rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.03em",
          }}
        >
          AI CONFIDENCE: 94%
        </span>
      </div>
      <div
        className="px-4 py-3.5 rounded-xl"
        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
      >
        <p style={{ fontSize: "0.82rem", color: "#1a1d2e", lineHeight: 1.6 }}>
          {caseData.aiSuggestion}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   WARNING MODAL (Yellow case only)
   ═══════════════════════════════════════════ */

function WarningModal({
  onConfirm,
  onClose,
}: {
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-md mx-4"
        style={{
          ...cardStyle,
          borderColor: "#fde68a",
          padding: 0,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            backgroundColor: "#fffbeb",
            borderBottom: "1px solid #fde68a",
            borderRadius: "14px 14px 0 0",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#d97706" }}>
            ⚠️ Warning — Confirm Prescription
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/60 text-[#d97706] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p style={{ fontSize: "0.88rem", color: "#1a1d2e", lineHeight: 1.6, marginBottom: 16 }}>
            Warning: You are prescribing despite elevated risk factors (borderline BMI). Please
            confirm you have reviewed the patient's history and accept clinical responsibility.
          </p>

          <label className="flex items-start gap-3 cursor-pointer group">
            <button
              onClick={() => setChecked((v) => !v)}
              className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-colors"
              style={{
                backgroundColor: checked ? "#16a34a" : "transparent",
                border: checked ? "none" : "2px solid #c4c9d4",
                borderRadius: 5,
              }}
            >
              {checked && (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path
                    d="M1 5L4.5 8.5L11 1"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
            <span
              style={{ fontSize: "0.84rem", color: "#1a1d2e", lineHeight: 1.5 }}
            >
              I confirm I have reviewed the patient history, understand the
              elevated risks, and accept clinical responsibility for this
              prescription.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div
          className="flex items-center justify-end gap-2.5 px-6 py-4"
          style={{ borderTop: "1px solid #e2e6ef" }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
            style={{ fontSize: "0.84rem", fontWeight: 500 }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!checked}
            className="px-5 py-2.5 rounded-xl text-white transition-all"
            style={{
              backgroundColor: checked ? "#16a34a" : "#c4c9d4",
              fontSize: "0.84rem",
              fontWeight: 600,
              cursor: checked ? "pointer" : "not-allowed",
              opacity: checked ? 1 : 0.7,
            }}
          >
            Confirm Approval
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   RIGHT COLUMN — CLINICAL DECISION
   ═══════════════════════════════════════════ */

function ClinicalDecisionPanel({ caseData }: { caseData: CaseData }) {
  const navigate = useNavigate();
  const [selectedMed, setSelectedMed] = useState("semaglutide");
  const [addOns, setAddOns] = useState<Record<string, boolean>>({
    metformin: false,
    b12: false,
    bupropion: false,
  });
  const [showWarningModal, setShowWarningModal] = useState(false);

  const baseMeds = [
    { id: "oral", label: "Oral Weight Loss Kit", price: 299 },
    { id: "semaglutide", label: "Generic Semaglutide 0.25mg", price: 549, star: true },
    { id: "ozempic", label: "Ozempic 0.25mg", price: 599 },
    { id: "mounjaro", label: "Mounjaro 2.5mg", price: 799 },
  ];

  const addOnItems = [
    { id: "metformin", label: "Metformin 500mg", price: 49 },
    { id: "b12", label: "Vitamin B12", price: 29 },
    { id: "bupropion", label: "Bupropion XL 150mg", price: 79 },
  ];

  const toggleAddOn = (id: string) =>
    setAddOns((prev) => ({ ...prev, [id]: !prev[id] }));

  const selectedBaseMed = baseMeds.find((m) => m.id === selectedMed);
  const basePrice = selectedBaseMed?.price ?? 0;
  const addOnTotal = addOnItems.reduce(
    (sum, a) => sum + (addOns[a.id] ? a.price : 0),
    0
  );
  const total = basePrice + addOnTotal;

  const isRed = caseData.flag === "red";
  const isYellow = caseData.flag === "yellow";
  const isGreen = caseData.flag === "green";
  const isPurple = caseData.flag === "purple";

  const handleApprove = () => {
    if (isRed) return; // blocked

    if (isYellow) {
      setShowWarningModal(true);
      return;
    }

    // Green or Purple — direct approve
    toast.success("Prescription sent to pharmacy", {
      description: `Treatment plan for ${caseData.patientName} has been submitted.`,
    });
    setTimeout(() => navigate("/cases"), 600);
  };

  const handleWarningConfirm = () => {
    setShowWarningModal(false);
    toast.success("Prescription approved with warning", {
      description: `Treatment plan for ${caseData.patientName} approved despite elevated risks.`,
    });
    setTimeout(() => navigate("/cases"), 600);
  };

  const handleDecline = () => {
    toast.error("Case Declined. Refund Initiated.", {
      description: `Case ${caseData.caseId} has been declined and payment refund started.`,
    });
    setTimeout(() => navigate("/cases"), 600);
  };

  const steps = isPurple
    ? [
      { num: "1", dose: "0.25mg", active: true },
      { num: "2", dose: "0.5mg", active: true },
      { num: "3", dose: "1.0mg", active: false },
      { num: "M", dose: "Maintain", active: false },
    ]
    : [
      { num: "1", dose: "0.25mg", active: true },
      { num: "2", dose: "0.5mg", active: false },
      { num: "3", dose: "1.0mg", active: false },
      { num: "M", dose: "Maintain", active: false },
    ];

  return (
    <>
      <div
        style={{
          ...cardStyle,
          position: "sticky",
          top: 24,
        }}
        className="p-5 flex flex-col gap-5"
      >
        <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1d2e" }}>
          🩺 Clinical Decision
        </h3>

        {/* Provider Notes */}
        <div>
          <label
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1a1d2e",
              display: "block",
              marginBottom: 6,
            }}
          >
            Provider Notes
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] placeholder-[#8892a8] resize-none outline-none focus:border-[#2563eb] transition-colors"
            rows={3}
            placeholder="Add your clinical notes here..."
            style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
          />
        </div>

        {/* Treatment Plan Builder */}
        <div>
          <label
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1a1d2e",
              display: "block",
              marginBottom: 8,
            }}
          >
            Base Medication
          </label>
          <div className="flex flex-col gap-2">
            {baseMeds.map((med) => {
              const isSelected = selectedMed === med.id;
              return (
                <button
                  key={med.id}
                  onClick={() => setSelectedMed(med.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                  style={{
                    backgroundColor: isSelected ? "#ecfdf5" : "#fff",
                    borderColor: isSelected ? "#86efac" : "#e2e6ef",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: isSelected ? "#16a34a" : "#c4c9d4",
                    }}
                  >
                    {isSelected && (
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#16a34a" }}
                      />
                    )}
                  </div>
                  <span
                    className="flex-1"
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "#1a1d2e",
                    }}
                  >
                    {med.label}
                    {med.star && <span className="ml-1">⭐</span>}
                  </span>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: isSelected ? "#16a34a" : "#8892a8",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {med.price} SAR/mo
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add-Ons */}
        <div>
          <label
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1a1d2e",
              display: "block",
              marginBottom: 8,
            }}
          >
            Add-Ons
          </label>
          <div className="flex flex-col gap-2">
            {addOnItems.map((addon) => {
              const checked = addOns[addon.id];
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
                  style={{
                    backgroundColor: checked ? "#ecfdf5" : "#fff",
                    borderColor: checked ? "#86efac" : "#e2e6ef",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: checked ? "#16a34a" : "transparent",
                      border: checked ? "none" : "2px solid #c4c9d4",
                      borderRadius: 4,
                    }}
                  >
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="#fff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className="flex-1"
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "#1a1d2e",
                    }}
                  >
                    {addon.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: checked ? "#16a34a" : "#8892a8",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    +{addon.price} SAR
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Titration Schedule */}
        <div>
          <label
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1a1d2e",
              display: "block",
              marginBottom: 10,
            }}
          >
            Titration Schedule
          </label>
          <div className="flex items-center gap-0">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: step.active ? "#16a34a" : "#f3f4f8",
                      color: step.active ? "#fff" : "#8892a8",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      border: step.active ? "none" : "1.5px solid #e2e6ef",
                    }}
                  >
                    {step.num}
                  </div>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      color: "#8892a8",
                      fontWeight: 500,
                    }}
                  >
                    {step.dose}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="mx-1"
                    style={{
                      width: 28,
                      height: 2,
                      backgroundColor: step.active ? "#16a34a" : "#e2e6ef",
                      marginBottom: 18,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <label
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#1a1d2e",
              display: "block",
              marginBottom: 8,
            }}
          >
            Order Summary
          </label>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span style={{ fontSize: "0.82rem", color: "#1a1d2e" }}>
                {selectedBaseMed?.label ?? "—"}
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontFamily: "var(--font-mono)",
                  color: "#1a1d2e",
                }}
              >
                {basePrice}
              </span>
            </div>
            {addOnItems
              .filter((a) => addOns[a.id])
              .map((a) => (
                <div key={a.id} className="flex justify-between">
                  <span style={{ fontSize: "0.82rem", color: "#1a1d2e" }}>
                    {a.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontFamily: "var(--font-mono)",
                      color: "#1a1d2e",
                    }}
                  >
                    {a.price}
                  </span>
                </div>
              ))}
            <div
              className="flex justify-between pt-3 mt-1"
              style={{ borderTop: "1.5px solid #e2e6ef" }}
            >
              <span
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  color: "#1a1d2e",
                }}
              >
                Monthly Total
              </span>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#16a34a",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {total} SAR
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons — Conditional on flag */}
        <div>
          <p
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#8892a8",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: 8,
              fontFamily: "var(--font-mono)",
            }}
          >
            {isRed && "Red Flag — Blocked"}
            {isYellow && "Yellow Flag — Requires Confirmation"}
            {isGreen && "Green Flag — Ready to Approve"}
            {isPurple && "Titration — Dose Escalation"}
          </p>

          {isRed ? (
            <div className="flex gap-2">
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl cursor-not-allowed"
                style={{
                  backgroundColor: "#e2e6ef",
                  color: "#8892a8",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                }}
              >
                🚫 Approve Blocked
              </button>
              <button
                onClick={handleDecline}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#dc2626",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                }}
              >
                ✕ Decline
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#16a34a",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                }}
              >
                {isYellow
                  ? "✓ Approve ⚠️"
                  : isPurple
                    ? "✓ Approve Dose Increase"
                    : "✓ Approve & Send Plan"}
              </button>
              <button
                onClick={handleDecline}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "#dc2626",
                  fontSize: "0.84rem",
                  fontWeight: 600,
                }}
              >
                ✕ Decline
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Warning Modal */}
      {showWarningModal && (
        <WarningModal
          onConfirm={handleWarningConfirm}
          onClose={() => setShowWarningModal(false)}
        />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const caseData = getCaseById(id ?? "");
  const [showExportModal, setShowExportModal] = useState(false);

  // Fallback for unknown IDs — try parsing old numeric IDs
  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: "var(--font-sans)" }}>
        <div className="text-center">
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>
            Case Not Found
          </h2>
          <p className="mt-2" style={{ fontSize: "0.88rem", color: "#8892a8" }}>
            The case ID "{id}" does not exist in the system.
          </p>
          <Link to="/cases"
            className="mt-4 px-5 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#16a34a", fontSize: "0.84rem", fontWeight: 600 }}
          >
            ← Back to Cases
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: "#fbfcfd", fontFamily: "var(--font-sans)" }}>
      <PatientHeader caseData={caseData} setShowExportModal={setShowExportModal} /> {/* Passed setShowExportModal */}
      <HardStopBanner caseData={caseData} />

      {/* Main Grid: 2 columns */}
      <div
        className="px-8 mt-6"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          <DemographicsGrid caseData={caseData} />
          <FlagsAlerts caseData={caseData} />
          <AIIntakeSummary caseData={caseData} />
          <QuestionnaireResponses caseData={caseData} />
          <CurrentMedications caseData={caseData} />
          <AITreatmentSuggestion caseData={caseData} />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          <ClinicalDecisionPanel caseData={caseData} />
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[340px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-5 py-4 flex items-center justify-between border-b border-[#e2e6ef]">
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1d2e" }}>Export Case Record</h3>
              <button onClick={() => setShowExportModal(false)} className="text-[#8892a8] hover:text-[#1a1d2e] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e6ef] cursor-pointer hover:bg-[#f8f9fb] transition-colors">
                <input type="radio" name="export-format" defaultChecked className="w-4 h-4 accent-[#16a34a]" />
                <span style={{ fontSize: "0.86rem", fontWeight: 500, color: "#1a1d2e" }}>PDF Document (.pdf)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e2e6ef] cursor-pointer hover:bg-[#f8f9fb] transition-colors">
                <input type="radio" name="export-format" className="w-4 h-4 accent-[#16a34a]" />
                <span style={{ fontSize: "0.86rem", fontWeight: 500, color: "#1a1d2e" }}>CSV Spreadsheet (.csv)</span>
              </label>
            </div>
            <div className="px-5 py-4 bg-[#f8f9fb] border-t border-[#e2e6ef] flex items-center justify-end gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
                style={{ fontSize: "0.84rem", fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  toast.success("Export started");
                }}
                className="px-5 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#16a34a", fontSize: "0.84rem", fontWeight: 600 }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
