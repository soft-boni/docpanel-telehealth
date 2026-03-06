import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Check, MessageSquare, FileText, Package, Activity } from "lucide-react";
import { toast } from "sonner";
import { usePersona } from "../../PersonaContext";

const card = "bg-white border border-slate-200 rounded-2xl shadow-sm";

/* ═══════════════════════════════════════════
   HEADER — dynamic from patient
   ═══════════════════════════════════════════ */

function PatientHeader({ patient }: { patient: any }) {
  const initials = patient.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  const flagColor: Record<string, string> = {
    red: "bg-red-500", purple: "bg-purple-500", yellow: "bg-amber-500", green: "bg-emerald-500",
  };
  const statusColor: Record<string, string> = {
    "Active": "bg-emerald-50 text-emerald-700", "Titration Due": "bg-purple-50 text-purple-700",
    "Pending Review": "bg-amber-50 text-amber-700", "Urgent Review": "bg-red-50 text-red-700",
    "Results Ready": "bg-teal-50 text-teal-700",
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-6">
      <div className="max-w-[1200px] mx-auto">
        <Link to="/patients" className="inline-flex items-center gap-1.5 mb-5 text-blue-600 hover:underline text-sm font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Patients
        </Link>
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 font-bold ${flagColor[patient.flag] || "bg-slate-500"}`}>
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-xl font-bold text-slate-900">{patient.name}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusColor[patient.status] || "bg-slate-100 text-slate-600"}`}>
                {patient.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              {patient.age}y · {patient.gender} · {patient.service} · {patient.planName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CURRENT TREATMENT — dynamic
   ═══════════════════════════════════════════ */

function CurrentTreatment({ patient }: { patient: any }) {
  const medPrices: Record<string, string> = {
    "Weight Loss": "549 SAR", "Testosterone": "699 SAR", "Menopause": "399 SAR",
    "Skincare": "249 SAR", "Hair Regrowth": "349 SAR", "Sexual Health": "229 SAR",
    "Mental Health": "199 SAR", "Labs": "299 SAR",
  };

  return (
    <div className={`${card} p-5`}>
      <h4 className="text-base font-semibold text-slate-900 mb-4">💊 Current Treatment</h4>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-bold text-slate-900">{patient.currentMedication}</span>
          <span className="ml-2 text-xs text-slate-500">Started Nov 15, 2025</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
          ACTIVE
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Current Dose", value: patient.service === "Weight Loss" ? "1.0mg" : "—" },
          { label: "Monthly", value: medPrices[patient.service] || "—" },
          { label: "Next Refill", value: "Mar 1" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center py-3 rounded-xl bg-slate-50">
            <span className="text-lg font-bold text-slate-900 font-mono">{item.value}</span>
            <span className="text-[11px] text-slate-500 mt-1 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Titration (Weight Loss specific) ─── */

function DoseTitration({ patient }: { patient: any }) {
  const [decided, setDecided] = useState(false);
  const navigate = useNavigate();
  const titration = patient.trackingData?.titrationTimeline || {};
  const entries = Object.entries(titration);

  const handleMaintain = () => {
    setDecided(true);
    toast.success("Dose decision recorded", {
      description: `${patient.name}'s titration decision has been saved.`,
    });
  };

  if (entries.length === 0) return null;

  return (
    <div className={`${card} p-5`} style={{ borderColor: decided ? undefined : "#ddd6fe" }}>
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-base font-semibold text-slate-900">📈 Dose Titration</h4>
        {!decided ? (
          <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-bold uppercase tracking-wider">DECISION NEEDED</span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">DECIDED ✓</span>
        )}
      </div>

      <div className="flex items-center justify-center mb-6">
        {entries.map(([dose, status], i) => {
          const st = status as string;
          const isDone = st === "Completed";
          return (
            <div key={dose} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                {isDone || decided ? (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-500">
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-purple-500 bg-purple-50 text-purple-700 text-sm font-bold">?</div>
                )}
                <span className="text-[11px] text-slate-500 font-medium">{dose}</span>
              </div>
              {i < entries.length - 1 && (
                <div className="mx-2" style={{ width: 40, height: 2, backgroundColor: "#16a34a", marginBottom: 22 }} />
              )}
            </div>
          );
        })}
      </div>

      {!decided ? (
        <div className="flex gap-2.5">
          <button onClick={handleMaintain} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 text-sm font-semibold transition-colors">
            ✓ Maintain Current Dose
          </button>
          <button onClick={() => navigate("/messages")} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 text-sm font-medium transition-colors">
            💬 Message
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
          <span className="text-sm font-semibold text-emerald-600">Dose decision recorded</span>
        </div>
      )}
    </div>
  );
}

/* ─── Progress Visualization — dynamic ─── */

function DataVisualization({ patient }: { patient: any }) {
  const td = patient.trackingData || {};

  let data: { label: string; value: number }[] = [];
  let title = "Progress";
  let unit = "";

  if (td.weightLog) {
    data = td.weightLog.map((e: any) => ({ label: e.date.split("-").slice(1).join("/"), value: e.weight }));
    title = "⚖️ Weight Progress";
    unit = "kg";
  } else if (td.trtLog) {
    data = td.trtLog.map((e: any) => ({ label: e.date.split("-").slice(1).join("/"), value: e.totalT }));
    title = "💪 Testosterone Levels";
    unit = "ng/dL";
  } else if (td.moodLog) {
    data = td.moodLog.map((e: any) => ({ label: e.date.split("-").slice(1).join("/"), value: e.gad7Score }));
    title = "🧠 GAD-7 Score";
    unit = "pts";
  } else if (td.symptomLog) {
    data = td.symptomLog.map((e: any) => ({ label: e.date.split("-").slice(1).join("/"), value: e.hotFlashesPerDay }));
    title = "🌡️ Hot Flashes / Day";
    unit = "";
  } else if (td.comfortLog) {
    data = td.comfortLog.map((e: any) => ({ label: e.date.split("-").slice(1).join("/"), value: e.comfortScore }));
    title = "💜 Comfort Score";
    unit = "/10";
  }

  if (data.length === 0) return null;

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;
  const startVal = data[0].value;
  const endVal = data[data.length - 1].value;
  const change = endVal - startVal;
  const isDown = change < 0;

  return (
    <div className={`${card} p-5`}>
      <h4 className="text-base font-semibold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-900 mb-5">
        Start: <span className="font-bold font-mono">{startVal} {unit}</span>
        {" → Now: "}
        <span className={`font-bold font-mono ${isDown ? "text-emerald-600" : "text-blue-600"}`}>{endVal} {unit}</span>
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold font-mono ${isDown ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"}`}>
          {change > 0 ? "+" : ""}{change} {unit} ({Math.abs((change / startVal) * 100).toFixed(1)}%)
        </span>
      </p>

      <div className="flex items-end gap-4" style={{ height: 120 }}>
        {data.map((d, i) => {
          const pct = ((d.value - minVal) / range) * 100;
          const isLast = i === data.length - 1;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[11px] font-bold font-mono text-slate-700">{d.value}</span>
              <div className="w-full rounded-t-lg" style={{
                height: `${Math.max(15, pct)}%`, minHeight: 16,
                background: isLast ? `linear-gradient(180deg, ${isDown ? "#16a34a" : "#2563eb"}, ${isDown ? "#22c55e" : "#60a5fa"})` : "linear-gradient(180deg, #2563eb, #60a5fa)",
                borderRadius: "8px 8px 0 0", opacity: 0.85,
              }} />
              <span className="text-[11px] text-slate-500 font-medium">{d.label}</span>
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
    <div className={`${card} p-5`}>
      <h4 className="text-base font-semibold text-slate-900 mb-4">📦 Fulfillment</h4>
      <div className="flex items-center justify-center mb-4">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              {step.status === "done" ? (
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-500">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              ) : step.status === "current" ? (
                <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-blue-500 bg-blue-50">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full border-2 border-slate-200 bg-white" />
              )}
              <span className="text-[11px] text-slate-500 font-medium">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="mx-2" style={{
                width: 40, height: 2, marginBottom: 22,
                backgroundColor: steps[i + 1].status === "done" || steps[i + 1].status === "current" ? "#16a34a" : "#e2e6ef",
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   RIGHT COLUMN — dynamic
   ═══════════════════════════════════════════ */

function LastCheckIn({ patient }: { patient: any }) {
  const td = patient.trackingData || {};

  const items: { label: string; value: string }[] = [];

  if (td.weightLog && td.weightLog.length > 0) {
    const last = td.weightLog[td.weightLog.length - 1];
    const prev = td.weightLog.length > 1 ? td.weightLog[td.weightLog.length - 2] : null;
    items.push({ label: "Weight", value: `${last.weight} kg${prev ? ` (${(last.weight - prev.weight).toFixed(1)})` : ""}` });
  }
  if (td.trtLog && td.trtLog.length > 0) {
    const last = td.trtLog[td.trtLog.length - 1];
    items.push({ label: "Total T", value: `${last.totalT} ng/dL` });
    items.push({ label: "Energy", value: `${last.energyScore}/10` });
  }
  if (td.moodLog && td.moodLog.length > 0) {
    const last = td.moodLog[td.moodLog.length - 1];
    items.push({ label: "GAD-7", value: `${last.gad7Score}` });
    items.push({ label: "Mood", value: last.mood || "Stable" });
  }
  if (td.symptomLog && td.symptomLog.length > 0) {
    const last = td.symptomLog[td.symptomLog.length - 1];
    items.push({ label: "Hot Flashes", value: `${last.hotFlashesPerDay}/day` });
    items.push({ label: "Sleep", value: `${last.sleepQuality}/10` });
  }

  if (items.length === 0) {
    items.push({ label: "Compliance", value: "On track" });
    items.push({ label: "Side Effects", value: "None reported" });
  }

  return (
    <div className={`${card} p-5`}>
      <h4 className="text-base font-semibold text-slate-900 mb-4">📋 Last Check-in</h4>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex gap-2">
            <span className="text-sm font-semibold text-slate-900 min-w-[110px]">{item.label}:</span>
            <span className="text-sm text-slate-500">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicalHistory({ patient }: { patient: any }) {
  return (
    <div className={`${card} p-5`}>
      <h4 className="text-base font-semibold text-slate-900 mb-4">🏥 Medical History</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {(patient.medicalHistory || []).map((condition: string, i: number) => (
          <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">{condition}</span>
        ))}
        {(!patient.medicalHistory || patient.medicalHistory.length === 0) && (
          <span className="text-sm text-slate-400">No medical history recorded</span>
        )}
      </div>
      {patient.questionnaire && (
        <div className="border-t border-slate-100 pt-3 mt-3">
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Questionnaire</h5>
          {Object.entries(patient.questionnaire).map(([q, a]) => (
            <div key={q} className="mb-2">
              <p className="text-xs font-semibold text-slate-700">{q}</p>
              <p className="text-xs text-slate-500">{a as string}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Questionnaire({ patient }: { patient: any }) {
  if (!patient.questionnaire) return null;

  return (
    <div className={`${card} p-5`}>
      <h4 className="text-base font-semibold text-slate-900 mb-4">📝 Intake Questionnaire</h4>
      <div className="flex flex-col gap-3">
        {Object.entries(patient.questionnaire).map(([q, a]) => (
          <div key={q} className="border-b border-slate-50 pb-2.5 last:border-0">
            <p className="text-sm font-semibold text-slate-800">{q}</p>
            <p className="text-sm text-slate-500 mt-0.5">{a as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE — fully dynamic
   ═══════════════════════════════════════════ */

export function PatientView() {
  const { activePatient, switchPersona } = usePersona();
  const { id } = useParams();

  // If we navigated via URL param, sync the persona
  if (id && activePatient && activePatient.id !== id) {
    switchPersona(id);
  }

  if (!activePatient) return <div className="p-8 text-center text-slate-400">No patient selected.</div>;

  return (
    <div className="min-h-screen font-sans">
      <PatientHeader patient={activePatient} />

      <div className="px-6 lg:px-10 pt-6 pb-10 max-w-[1200px] mx-auto"
        style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "start" }}
      >
        {/* Left */}
        <div className="flex flex-col gap-4">
          <CurrentTreatment patient={activePatient} />
          <DoseTitration patient={activePatient} />
          <DataVisualization patient={activePatient} />
          <FulfillmentTracker />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          <LastCheckIn patient={activePatient} />
          <MedicalHistory patient={activePatient} />
          <Questionnaire patient={activePatient} />
        </div>
      </div>
    </div>
  );
}
