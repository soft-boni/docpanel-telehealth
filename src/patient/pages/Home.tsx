import { useNavigate } from "react-router";
import { usePatientPath } from "../PatientBaseContext";
import { usePersona } from "../../PersonaContext";
import {
    MessageSquare,
    Package,
    Scale,
    RefreshCw,
    CheckCircle2,
    AlertCircle,
    MessageCircle,
    Activity,
    Camera,
    Pill,
} from "lucide-react";

/* ─── Shared ─── */

const card = "bg-white border border-slate-200 rounded-xl shadow-sm";

/* ═══════════════════════════════════════════
   GREETING HEADER
   ═══════════════════════════════════════════ */

function GreetingHeader({ patient }: { patient: any }) {
    const initials = patient.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
    const firstName = patient.name.split(" ")[0];

    const greetings: Record<string, string> = {
        "Weight Loss": "Your weight loss journey is on track.",
        "Sexual Health": "Your refill is coming up soon.",
        "Hair Regrowth": "Time to log your monthly progress photos.",
        "Testosterone": "Your hormone levels are improving.",
        "Mental Health": "Remember to check in today.",
        "Skincare": "Your skin routine is working — keep it up!",
        "Menopause": "Your symptoms are trending down.",
        "Labs": "Your latest lab results are ready to view.",
    };

    return (
        <div className={`${card} flex items-center justify-between px-5 py-4`}>
            <div>
                <h2 className="text-lg font-bold text-slate-900">
                    Hello, {firstName} <span role="img" aria-label="wave">👋</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {greetings[patient.service] || "Welcome back to your dashboard."}
                </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                {initials}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   STATUS CARD
   ═══════════════════════════════════════════ */

function StatusCard({ patient }: { patient: any }) {
    const statusMap: Record<string, { bg: string; icon: string; text: string }> = {
        "Active": { bg: "bg-emerald-600", icon: "🎉", text: `Your treatment is active. Next refill: Mar 1.` },
        "Titration Due": { bg: "bg-purple-600", icon: "💜", text: `Your dose adjustment is due. Your doctor will review soon.` },
        "Pending Review": { bg: "bg-amber-500", icon: "⏳", text: `Your medical team is reviewing your case. You'll hear back within 24 hours.` },
        "Urgent Review": { bg: "bg-red-600", icon: "🚨", text: `Your case requires immediate attention. A doctor will contact you shortly.` },
        "Results Ready": { bg: "bg-teal-600", icon: "🔬", text: `Your lab results are ready. Head to My Labs to view them.` },
    };

    const info = statusMap[patient.status] || statusMap["Active"];

    return (
        <div className={`${info.bg} rounded-xl px-5 py-5 text-white`}>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-white/50">CURRENT STATUS</p>
            <h3 className="mt-1.5 text-base font-bold leading-relaxed">
                {info.icon} {info.text}
            </h3>
            {(patient.status === "Active" || patient.status === "Results Ready") && (
                <div className="flex items-center gap-2 mt-3">
                    {["Prescribed", "Preparing", "Shipped", "Delivered"].map((step, i) => (
                        <div key={step} className="flex items-center gap-1.5 flex-1">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 4 ? "bg-white/30 text-white" : "bg-white/10 text-white/50"}`}>{i < 4 ? "✓" : i + 1}</div>
                            <span className="text-[10px] text-white/70 font-medium hidden sm:inline">{step}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════
   QUICK ACTIONS
   ═══════════════════════════════════════════ */

function QuickActions({ patient }: { patient: any }) {
    const navigate = useNavigate();
    const p = usePatientPath();

    const logLabel = (() => {
        switch (patient.service) {
            case "Weight Loss": return "Log Weight";
            case "Testosterone": return "Log Energy";
            case "Mental Health": return "Mood Check";
            case "Skincare":
            case "Hair Regrowth": return "Upload Photo";
            case "Menopause": return "Log Symptoms";
            default: return "Check-in";
        }
    })();

    const logIcon = (() => {
        switch (patient.service) {
            case "Weight Loss": return Scale;
            case "Testosterone": return Activity;
            case "Skincare":
            case "Hair Regrowth": return Camera;
            default: return Activity;
        }
    })();

    const actions = [
        { icon: MessageSquare, label: "Message Doctor", color: "#2563eb", path: "/messages" },
        { icon: Package, label: "Track Order", color: "#ea580c", path: "/orders" },
        { icon: logIcon, label: logLabel, color: "#7c3aed", path: "/treatment" },
        { icon: RefreshCw, label: "Refill Early", color: "#16a34a", path: "/orders" },
    ];

    return (
        <div className="grid grid-cols-4 gap-2">
            {actions.map((a) => (
                <button key={a.label} onClick={() => navigate(p(a.path))} className={`${card} flex flex-col items-center justify-center gap-2 py-4 px-2 hover:bg-slate-50 transition-colors cursor-pointer`}>
                    <a.icon className="w-5 h-5" style={{ color: a.color }} />
                    <span className="text-[11px] font-semibold text-slate-900 text-center leading-tight">{a.label}</span>
                </button>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   PROGRESS CHART — built from real mock data
   ═══════════════════════════════════════════ */

function ProgressChart({ patient }: { patient: any }) {
    const td = patient.trackingData || {};

    // Determine the data source based on service
    let points: number[] = [];
    let labels: string[] = [];
    let title = "Progress";
    let unit = "";
    let direction: "down" | "up" = "down";

    if (td.weightLog) {
        points = td.weightLog.map((e: any) => e.weight);
        labels = td.weightLog.map((e: any) => e.date.split("-").slice(1).join("/"));
        title = "Weight";
        unit = "kg";
        direction = "down";
    } else if (td.trtLog) {
        points = td.trtLog.map((e: any) => e.totalT);
        labels = td.trtLog.map((e: any) => e.date.split("-").slice(1).join("/"));
        title = "Total Testosterone";
        unit = "ng/dL";
        direction = "up";
    } else if (td.moodLog) {
        points = td.moodLog.map((e: any) => e.gad7Score);
        labels = td.moodLog.map((e: any) => e.date.split("-").slice(1).join("/"));
        title = "GAD-7 Score";
        unit = "pts";
        direction = "down";
    } else if (td.phq9Log) {
        points = td.phq9Log.map((e: any) => e.phq9Score);
        labels = td.phq9Log.map((e: any) => e.date.split("-").slice(1).join("/"));
        title = "PHQ-9 Score";
        unit = "pts";
        direction = "down";
    } else if (td.symptomLog) {
        points = td.symptomLog.map((e: any) => e.hotFlashesPerDay);
        labels = td.symptomLog.map((e: any) => e.date.split("-").slice(1).join("/"));
        title = "Hot Flashes / Day";
        unit = "";
        direction = "down";
    } else if (td.comfortLog) {
        points = td.comfortLog.map((e: any) => e.comfortScore);
        labels = td.comfortLog.map((e: any) => e.date.split("-").slice(1).join("/"));
        title = "Comfort Score";
        unit = "/10";
        direction = "up";
    }

    if (points.length === 0) {
        return (
            <div className={`${card} p-5`}>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Your Progress</p>
                <p className="mt-3 text-sm text-slate-400">No tracking data available yet.</p>
            </div>
        );
    }

    const maxVal = Math.max(...points);
    const minVal = Math.min(...points);
    const range = maxVal - minVal || 1;

    const w = 320;
    const h = 120;
    const padX = 10;
    const padY = 10;
    const plotW = w - padX * 2;
    const plotH = h - padY * 2;

    const coords = points.map((v: number, i: number) => ({
        x: padX + (i / Math.max(1, points.length - 1)) * plotW,
        y: padY + (1 - (v - minVal) / range) * plotH,
    }));

    const linePoints = coords.map((c: any) => `${c.x},${c.y}`).join(" ");
    const areaPoints = `${padX},${h - padY} ${linePoints} ${padX + plotW},${h - padY}`;
    const goodColor = direction === "down" ? "#16a34a" : "#2563eb";

    const change = points[points.length - 1] - points[0];
    const changeText = direction === "down"
        ? `↓ ${Math.abs(change).toFixed(1)} ${unit}`
        : `↑ ${Math.abs(change).toFixed(1)} ${unit}`;

    return (
        <div className={`${card} p-5`}>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{title} Progress</p>
            <p className="mt-2 text-2xl font-extrabold" style={{ color: goodColor }}>{changeText}</p>
            <p className="text-xs text-slate-400 mt-1">Since starting treatment</p>

            <div className="mt-4">
                <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 130 }}>
                    {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
                        <line key={frac} x1={padX} x2={w - padX} y1={padY + frac * plotH} y2={padY + frac * plotH} stroke="#e2e6ef" strokeWidth={0.5} />
                    ))}
                    <polygon points={areaPoints} fill={goodColor} opacity={0.1} />
                    <polyline points={linePoints} fill="none" stroke={goodColor} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    {coords.map((c: any, i: number) => (
                        <circle key={i} cx={c.x} cy={c.y} r={3.5} fill="#fff" stroke={goodColor} strokeWidth={2} />
                    ))}
                </svg>
            </div>

            <div className="flex justify-between mt-1 px-2">
                {labels.map((m: string, i: number) => (
                    <span key={i} className="text-[10px] text-slate-400">{m}</span>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                    <p className="text-base font-extrabold text-slate-900">{points[0]}</p>
                    <p className="text-[10px] text-slate-400">Start</p>
                </div>
                <div className="text-center">
                    <p className="text-base font-extrabold" style={{ color: goodColor }}>{points[points.length - 1]}</p>
                    <p className="text-[10px] text-slate-400">Current</p>
                </div>
                <div className="text-center">
                    <p className="text-base font-extrabold text-slate-900">{points.length}</p>
                    <p className="text-[10px] text-slate-400">Data points</p>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   TODO CARD
   ═══════════════════════════════════════════ */

function ToDoCard({ patient }: { patient: any }) {
    const checkinMap: Record<string, string> = {
        "Weight Loss": "Log your weight this week",
        "Testosterone": "Log your energy and mood",
        "Mental Health": "How are you feeling today?",
        "Menopause": "Log today's symptoms",
        "Skincare": "Any new side effects to report?",
        "Hair Regrowth": "Upload your monthly progress photos",
        "Sexual Health": "Any concerns to share with your doctor?",
        "Labs": "Review your latest lab results",
    };

    const items = [
        { icon: <AlertCircle className="w-4 h-4 text-amber-500" />, text: checkinMap[patient.service] || "Complete your check-in", done: false },
        { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: `Take your ${patient.currentMedication || "medication"}`, done: true },
        { icon: <MessageCircle className="w-4 h-4 text-blue-500" />, text: "New message from Dr. Alharbi", done: false },
    ];

    return (
        <div className={`${card} p-5`}>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To-Do</p>
            <div className="flex flex-col gap-3.5 mt-4">
                {items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <span className={`text-sm font-medium leading-relaxed ${item.done ? "text-slate-400 line-through" : "text-slate-900"}`}>{item.text}</span>
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
    const { activePatient } = usePersona();

    if (!activePatient) {
        return <div className="p-8 text-center text-slate-400">No patient selected.</div>;
    }

    return (
        <div className="min-h-screen bg-[#f3f4f8]">
            <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-4 max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto pb-24">
                <GreetingHeader patient={activePatient} />
                <StatusCard patient={activePatient} />
                <QuickActions patient={activePatient} />

                <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                    <ProgressChart patient={activePatient} />
                    <ToDoCard patient={activePatient} />
                </div>
            </div>
        </div>
    );
}
