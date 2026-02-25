import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

/* ═══════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════ */

function PatientHeader() {
  return (
    <div className="bg-white border-b border-[#e2e6ef] px-8 py-5">
      <Link
        to="/patients"
        className="inline-flex items-center gap-1.5 mb-4 text-[#2563eb] hover:underline"
        style={{ fontSize: "0.82rem", fontWeight: 500 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </Link>

      <div className="flex items-center gap-4">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0"
          style={{
            backgroundColor: "#16a34a",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          OR
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1d2e" }}>
              Omar Al-Rashid
            </span>
            <span
              className="px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "rgba(22,163,74,0.1)",
                color: "#16a34a",
                fontSize: "0.68rem",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.03em",
              }}
            >
              ACTIVE
            </span>
          </div>
          <p style={{ fontSize: "0.78rem", color: "#8892a8", marginTop: 2 }}>
            42y · Male · Weight Loss · Started Nov 15, 2025
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEFT COLUMN CARDS
   ═══════════════════════════════════════════ */

function CurrentTreatment() {
  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 14 }}>
        💊 Current Treatment
      </h4>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1a1d2e" }}>
            Generic Semaglutide
          </span>
          <span
            className="ml-2"
            style={{ fontSize: "0.78rem", color: "#8892a8" }}
          >
            Started Nov 15, 2025
          </span>
        </div>
        <span
          className="px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(22,163,74,0.1)",
            color: "#16a34a",
            fontSize: "0.68rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.03em",
          }}
        >
          ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Current Dose", value: "1.0mg" },
          { label: "Monthly", value: "549 SAR" },
          { label: "Next Refill", value: "Mar 1" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center py-3 rounded-xl"
            style={{ backgroundColor: "#f3f4f8" }}
          >
            <span
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#1a1d2e",
                fontFamily: "var(--font-mono)",
              }}
            >
              {item.value}
            </span>
            <span style={{ fontSize: "0.7rem", color: "#8892a8", marginTop: 2, fontWeight: 500 }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Titration (INTERACTIVE) ─── */

function DoseTitration() {
  const [decided, setDecided] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { num: "1", dose: "0.25mg", done: true },
    { num: "2", dose: "0.5mg", done: true },
    { num: "3", dose: "1.0mg", done: true },
    {
      num: decided ? "✓" : "?",
      dose: decided ? "Maintained" : "Maintain?",
      done: decided,
      decision: !decided,
    },
  ];

  const handleMaintain = () => {
    setDecided(true);
    toast.success("Dose maintained at 1.0mg", {
      description: "Omar Al-Rashid's titration decision has been recorded.",
    });
  };

  return (
    <div
      style={{
        ...cardStyle,
        borderColor: decided ? "#e2e6ef" : "#ddd6fe",
      }}
      className="p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
          📈 Dose Titration
        </h4>
        {!decided && (
          <span
            className="px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(124,58,237,0.1)",
              color: "#7c3aed",
              fontSize: "0.68rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.03em",
            }}
          >
            DECISION NEEDED
          </span>
        )}
        {decided && (
          <span
            className="px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(22,163,74,0.1)",
              color: "#16a34a",
              fontSize: "0.68rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.03em",
            }}
          >
            DECIDED ✓
          </span>
        )}
      </div>

      {/* Timeline */}
      <div className="flex items-center justify-center mb-6">
        {steps.map((step, i) => (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              {step.done ? (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    border: "2px solid #7c3aed",
                    backgroundColor: "rgba(124,58,237,0.08)",
                    color: "#7c3aed",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}
                >
                  ?
                </div>
              )}
              <span style={{ fontSize: "0.65rem", color: "#8892a8", fontWeight: 500 }}>
                {step.dose}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="mx-2"
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor: steps[i + 1].done ? "#16a34a" : "#e2e6ef",
                  marginBottom: 22,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      {!decided ? (
        <div className="flex gap-2.5">
          <button
            onClick={handleMaintain}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#16a34a", fontSize: "0.84rem", fontWeight: 600 }}
          >
            ✓ Maintain 1.0mg
          </button>
          <button
            onClick={() => navigate("/messages")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
            style={{ fontSize: "0.84rem", fontWeight: 500 }}
          >
            💬 Message
          </button>
        </div>
      ) : (
        <div
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl"
          style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}
        >
          <Check className="w-4 h-4 text-[#16a34a]" strokeWidth={3} />
          <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#16a34a" }}>
            Dose maintained at 1.0mg
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Weight Progress ─── */

function WeightProgress() {
  const data = [
    { month: "Nov", weight: 103 },
    { month: "Dec", weight: 99 },
    { month: "Jan", weight: 95 },
    { month: "Feb", weight: 92 },
  ];
  const maxW = 105;
  const minW = 88;
  const range = maxW - minW;

  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 4 }}>
        ⚖️ Weight Progress
      </h4>

      <p className="mb-5" style={{ fontSize: "0.84rem", color: "#1a1d2e" }}>
        Start:{" "}
        <span style={{ fontWeight: 600, fontFamily: "var(--font-mono)" }}>103 kg</span>
        {" → Now: "}
        <span style={{ fontWeight: 700, color: "#16a34a", fontFamily: "var(--font-mono)" }}>
          92 kg
        </span>
        <span
          className="ml-2 px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(22,163,74,0.1)",
            color: "#16a34a",
            fontSize: "0.72rem",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
          }}
        >
          -11 kg (10.7%)
        </span>
      </p>

      <div className="flex items-end gap-4" style={{ height: 120 }}>
        {data.map((d) => {
          const pct = ((d.weight - minW) / range) * 100;
          return (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "#1a1d2e",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {d.weight}
              </span>
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: `${pct}%`,
                  minHeight: 16,
                  background:
                    d.month === "Feb"
                      ? "linear-gradient(180deg, #16a34a, #22c55e)"
                      : "linear-gradient(180deg, #2563eb, #60a5fa)",
                  borderRadius: "8px 8px 0 0",
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: "0.68rem", color: "#8892a8", fontWeight: 500 }}>
                {d.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Fulfillment Tracker ─── */

function FulfillmentTracker() {
  const steps = [
    { label: "Prescribed", status: "done" as const },
    { label: "Dispensing", status: "done" as const },
    { label: "Shipped", status: "current" as const },
    { label: "Delivered", status: "pending" as const },
  ];

  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 16 }}>
        📦 Fulfillment — February
      </h4>

      <div className="flex items-center justify-center mb-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              {step.status === "done" ? (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              ) : step.status === "current" ? (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    border: "2px solid #2563eb",
                    backgroundColor: "rgba(37,99,235,0.08)",
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: "#2563eb" }}
                  />
                </div>
              ) : (
                <div
                  className="w-9 h-9 rounded-full"
                  style={{
                    border: "2px solid #e2e6ef",
                    backgroundColor: "#fff",
                  }}
                />
              )}
              <span style={{ fontSize: "0.65rem", color: "#8892a8", fontWeight: 500 }}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="mx-2"
                style={{
                  width: 40,
                  height: 2,
                  backgroundColor:
                    steps[i + 1].status === "done" || steps[i + 1].status === "current"
                      ? "#16a34a"
                      : "#e2e6ef",
                  marginBottom: 22,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.78rem", color: "#8892a8", textAlign: "center" }}>
        Tracking:{" "}
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
          SMSA-2026-48291
        </span>
        {" · ETA: Feb 26"}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   RIGHT COLUMN CARDS
   ═══════════════════════════════════════════ */

function LastCheckIn() {
  const items = [
    { label: "Side Effects", value: "Mild nausea, resolved" },
    { label: "Weight", value: "92 kg (-0.8)" },
    { label: "Compliance", value: "All 4 injections" },
    { label: "Exercise", value: "Walking 4x/week" },
  ];

  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 14 }}>
        📋 Last Check-in (Feb 20)
      </h4>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex gap-2">
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1d2e", minWidth: 110 }}>
              {item.label}:
            </span>
            <span style={{ fontSize: "0.82rem", color: "#8892a8" }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SOAPNotes() {
  const notes = [
    {
      date: "Feb 20",
      text: "Month 4 check-in. Weight trending well, patient tolerating 1.0mg dose. Mild nausea first 2 days post-injection, self-resolving.",
      last: false,
    },
    {
      date: "Jan 22",
      text: "Dose increase to 1.0mg. Patient lost 4kg on 0.5mg. No adverse effects. Cleared for next titration step.",
      last: false,
    },
    {
      date: "Nov 15",
      text: "Initial consult. BMI 33.1, qualifying for GLP-1 therapy. Started Semaglutide 0.25mg. Baseline labs ordered.",
      last: true,
    },
  ];

  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 14 }}>
        📄 SOAP Notes
      </h4>
      <div className="flex flex-col">
        {notes.map((note) => (
          <div
            key={note.date}
            className={`py-3.5 ${!note.last ? "border-b border-[#e2e6ef]" : ""}`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a1d2e" }}>
                {note.date}
              </span>
              <span
                className="px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(22,163,74,0.1)",
                  color: "#16a34a",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Signed ✓
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#8892a8", lineHeight: 1.5 }}>
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export function PatientView() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      <PatientHeader />

      <div
        className="px-8 pt-6 pb-10"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Left */}
        <div className="flex flex-col gap-4">
          <CurrentTreatment />
          <DoseTitration />
          <WeightProgress />
          <FulfillmentTracker />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <LastCheckIn />
          <SOAPNotes />
        </div>
      </div>
    </div>
  );
}
