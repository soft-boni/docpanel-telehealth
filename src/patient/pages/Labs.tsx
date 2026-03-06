import { useState } from "react";
import { usePersona } from "../../PersonaContext";

// ════════════════════════════════════════
// SHARED
// ════════════════════════════════════════

const card = "bg-white border border-slate-200 rounded-xl shadow-sm";

// ════════════════════════════════════════
// OVERVIEW TAB
// ════════════════════════════════════════

function OverviewTab({ patient }: { patient: any }) {
    const biomarkers = patient.trackingData?.biomarkers || [];
    const optimal = biomarkers.filter((b: any) => b.status === "optimal").length;
    const abnormal = biomarkers.filter((b: any) => b.status === "abnormal").length;
    const total = biomarkers.length;
    const pct = total > 0 ? Math.round((optimal / total) * 100) : 90;

    const dots = Array.from({ length: 80 }, (_, i) => i);
    const redDots = Math.round((abnormal / Math.max(1, total)) * 80);
    const yellowDots = Math.round(80 * 0.05);

    const categories = [
        { emoji: "❤️", label: "Heart Health", markers: ["LDL", "HDL"], hasAbnormal: biomarkers.some((b: any) => ["LDL", "HDL"].includes(b.name) && b.status === "abnormal") },
        { emoji: "🧬", label: "Hormones", markers: ["Estradiol", "FSH", "Testosterone"], hasAbnormal: biomarkers.some((b: any) => ["Estradiol", "FSH", "Testosterone"].includes(b.name) && b.status === "abnormal") },
        { emoji: "🦴", label: "Vitamins", markers: ["Vitamin D", "Vitamin B12"], hasAbnormal: biomarkers.some((b: any) => ["Vitamin D", "Vitamin B12"].includes(b.name) && b.status === "abnormal") },
        { emoji: "🧪", label: "Metabolism", markers: ["HbA1c", "Ferritin"], hasAbnormal: biomarkers.some((b: any) => ["HbA1c", "Ferritin"].includes(b.name) && b.status === "abnormal") },
        { emoji: "🫁", label: "Thyroid", markers: ["TSH", "Free T3"], hasAbnormal: biomarkers.some((b: any) => ["TSH", "Free T3"].includes(b.name) && b.status === "abnormal") },
        { emoji: "🩸", label: "Iron Stores", markers: ["Ferritin"], hasAbnormal: biomarkers.some((b: any) => ["Ferritin"].includes(b.name) && b.status === "abnormal") },
    ];

    // Only show categories that have at least 1 matching marker  
    const activeCategories = categories.filter(cat => cat.markers.some(m => biomarkers.some((b: any) => b.name === m)));

    return (
        <div className="flex flex-col gap-4">
            {/* Headline + Dots */}
            <div className={`${card} p-6 text-center`}>
                <h3 className="text-xl font-bold text-slate-900 mb-1">You're in good health! 💪</h3>
                <p className="text-sm text-slate-500 font-medium mb-6">{pct}% of your biomarkers are optimal.</p>

                <div className="flex flex-wrap justify-center gap-1.5 max-w-[280px] mx-auto">
                    {dots.map((_, i) => {
                        let color = "bg-emerald-400";
                        if (i < redDots) color = "bg-red-500 animate-pulse ring-1 ring-red-200";
                        else if (i < redDots + yellowDots) color = "bg-amber-400";
                        return <div key={i} className={`w-3 h-3 rounded-full ${color}`} />;
                    })}
                </div>
            </div>

            {/* Biological Age */}
            <div className={`${card} p-5`}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Biological Age</div>
                        <div className="flex items-baseline gap-3">
                            <div>
                                <div className="text-2xl font-bold text-slate-900">31.3</div>
                                <div className="text-xs text-slate-400 font-medium">Bio Age</div>
                            </div>
                            <div className="text-slate-300 text-lg">vs</div>
                            <div>
                                <div className="text-2xl font-bold text-slate-400">34.4</div>
                                <div className="text-xs text-slate-400 font-medium">Actual Age</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-teal-100 border-4 border-teal-500 flex items-center justify-center">
                        <span className="text-sm font-bold text-teal-700">-3 yrs</span>
                    </div>
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-3">
                {activeCategories.map((cat) => (
                    <div key={cat.label} className={`${card} p-4 text-center ${cat.hasAbnormal ? "border-red-300 bg-red-50" : ""}`}>
                        <span className="text-2xl mb-2 block">{cat.emoji}</span>
                        <div className={`text-sm font-bold ${cat.hasAbnormal ? "text-red-800" : "text-slate-900"}`}>{cat.label}</div>
                        <div className={`text-xs mt-1 font-bold ${cat.hasAbnormal ? "text-red-600" : "text-emerald-600"}`}>
                            {cat.hasAbnormal ? "⚠ Abnormal" : "✓ Optimal"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ════════════════════════════════════════
// BIOMARKERS TAB
// ════════════════════════════════════════

function BiomarkersTab({ patient }: { patient: any }) {
    const biomarkers = patient.trackingData?.biomarkers || [];

    const abnormals = biomarkers.filter((b: any) => b.status === "abnormal");
    const optimals = biomarkers.filter((b: any) => b.status === "optimal");

    return (
        <div className="flex flex-col gap-3">
            {/* Abnormal markers first */}
            {abnormals.map((bm: any) => (
                <div key={bm.name} className={`${card} p-5 border-red-200 bg-red-50`}>
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <div className="text-sm font-bold text-red-900">{bm.name}</div>
                            <div className="text-xs text-red-700 mt-0.5 font-medium">Status: Abnormal (Low)</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold text-red-600">{bm.value} <span className="text-xs text-red-400 font-normal">{bm.unit}</span></div>
                            <span className="px-2 py-0.5 bg-red-200 text-red-800 text-[10px] font-bold rounded-full uppercase">ABNORMAL</span>
                        </div>
                    </div>

                    {/* Range slider */}
                    <div className="mt-4 mb-2">
                        <div className="h-3 w-full rounded-full relative overflow-hidden" style={{ background: "linear-gradient(to right, #ef4444 0%, #ef4444 25%, #facc15 25%, #facc15 40%, #22c55e 40%, #22c55e 70%, #facc15 70%, #facc15 85%, #ef4444 85%, #ef4444 100%)" }}>
                            <div className="absolute top-0 w-4 h-full bg-white border-2 border-red-600 rounded-full shadow-md" style={{ left: "12%", transform: "translateX(-50%)" }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider">
                            <span>Low</span><span>Optimal</span><span>High</span>
                        </div>
                    </div>

                    <p className="text-xs text-red-800 mt-3 leading-relaxed font-medium bg-white rounded-lg p-3 border border-red-100">
                        Your {bm.name} level of {bm.value} {bm.unit} is below the optimal range ({bm.range}). This may indicate a deficiency that your doctor will address.
                    </p>
                </div>
            ))}

            {/* Optimal markers */}
            {optimals.map((bm: any) => (
                <div key={bm.name} className={`${card} p-4`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-sm font-bold text-slate-900">{bm.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">Range: {bm.range}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-emerald-600">{bm.value} <span className="text-xs text-slate-400 font-normal">{bm.unit}</span></div>
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">Optimal</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ════════════════════════════════════════
// DOCTOR'S PLAN TAB
// ════════════════════════════════════════

function DoctorsPlanTab({ patient }: { patient: any }) {
    const biomarkers = patient.trackingData?.biomarkers || [];
    const abnormals = biomarkers.filter((b: any) => b.status === "abnormal");

    const recommendations = [
        { emoji: "💊", title: "Vitamin D3 2,000 IU daily", subtitle: "To address low Vitamin D levels" },
        { emoji: "☀️", title: "10-20 mins direct sunlight", subtitle: "Morning sun exposure is most effective" },
        { emoji: "🥗", title: "Increase fatty fish intake", subtitle: "Salmon, tuna 2-3 times per week" },
        { emoji: "🔁", title: "Retest in 90 days", subtitle: "Follow-up panel to track improvement" },
    ];

    return (
        <div className="flex flex-col gap-4">
            {/* Doctor Avatar */}
            <div className={`${card} p-5 bg-gradient-to-br from-blue-50 to-white`}>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-blue-200 shrink-0">👨‍⚕️</div>
                    <div>
                        <div className="text-sm font-bold text-slate-900">Reviewed by Dr. Alharbi</div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">"Overall your panel looks great. Let's supplement your Vitamin D and follow up in 3 months."</p>
                    </div>
                </div>
            </div>

            {/* Action Plan */}
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Recommendations</div>
            {recommendations.map((rec, i) => (
                <div key={i} className={`${card} p-4 flex items-center gap-4`}>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl shrink-0">{rec.emoji}</div>
                    <div>
                        <div className="text-sm font-bold text-slate-900">{rec.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5 font-medium">{rec.subtitle}</div>
                    </div>
                </div>
            ))}

            {/* Upsell */}
            <div className="mt-2 p-6 rounded-2xl border border-blue-300 bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-6 -top-6 opacity-10 text-8xl transform -rotate-12">🏃‍♂️</div>
                <div className="relative z-10">
                    <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1">Recommended Next Step</div>
                    <div className="text-lg font-bold mb-2 leading-tight">Explore Weight Management</div>
                    <p className="text-xs text-blue-100 mb-5 leading-relaxed font-medium">Based on your lipid trends, our clinical team suggests exploring our medical weight loss program.</p>
                    <button className="w-full py-3 bg-white text-blue-800 text-sm font-bold rounded-xl hover:bg-blue-50 transition shadow-sm">Learn More →</button>
                </div>
            </div>
        </div>
    );
}

// ════════════════════════════════════════
// UPSELL STATE (non-Labs personas)
// ════════════════════════════════════════

function LabsUpsell() {
    return (
        <div className="min-h-screen bg-[#f3f4f8] p-4 pb-24">
            <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6">
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-3xl">🔬</div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">My Labs</h2>
                    <p className="text-sm text-slate-500 font-medium max-w-xs">You don't have any lab results yet.</p>
                </div>

                <div className="w-full bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="text-center">
                        <div className="text-[10px] font-bold text-teal-200 uppercase tracking-widest mb-2">Unlock Insights</div>
                        <h3 className="text-lg font-bold mb-2">Discover your baseline.</h3>
                        <p className="text-xs text-teal-100 mb-5 leading-relaxed font-medium">Buy an Essential or Advanced Lab Panel today to understand your body at a molecular level.</p>
                        <div className="flex gap-3">
                            <button className="flex-1 py-3 bg-white text-teal-800 text-sm font-bold rounded-xl hover:bg-teal-50 transition shadow-sm">Essential Panel</button>
                            <button className="flex-1 py-3 bg-teal-400/30 text-white border border-teal-300 text-sm font-bold rounded-xl hover:bg-teal-400/50 transition">Advanced Panel</button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                    {[
                        { emoji: "❤️", label: "Heart Health" },
                        { emoji: "🧬", label: "Hormones" },
                        { emoji: "🦴", label: "Vitamins" },
                    ].map((c) => (
                        <div key={c.label} className={`${card} p-3 text-center`}>
                            <span className="text-xl block mb-1">{c.emoji}</span>
                            <div className="text-[10px] font-bold text-slate-600">{c.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ════════════════════════════════════════
// MAIN LABS PAGE
// ════════════════════════════════════════

export function Labs() {
    const { activePatient } = usePersona();
    const [activeTab, setActiveTab] = useState(0);

    if (!activePatient) return <div>No patient selected.</div>;

    if (activePatient.service !== "Labs") return <LabsUpsell />;

    const tabs = ["Overview", "Biomarkers", "Doctor's Plan"];

    return (
        <div className="min-h-screen bg-[#f3f4f8] p-4 pb-24">
            <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col gap-4">
                <div className="pt-2">
                    <h1 className="text-xl font-bold text-slate-900">My Labs</h1>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{activePatient.name} · {activePatient.planName}</p>
                </div>

                {/* Sticky Tab Bar */}
                <div className="sticky top-12 z-20 bg-[#f3f4f8] pt-1 pb-2">
                    <div className="flex bg-slate-200/60 p-1 rounded-xl">
                        {tabs.map((tab, i) => (
                            <button key={tab} onClick={() => setActiveTab(i)} className={`flex-1 py-2 text-[11px] uppercase tracking-wider font-bold rounded-lg transition-colors ${activeTab === i ? "bg-white shadow-sm text-teal-700" : "text-slate-500 hover:text-slate-700"}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 0 && <OverviewTab patient={activePatient} />}
                {activeTab === 1 && <BiomarkersTab patient={activePatient} />}
                {activeTab === 2 && <DoctorsPlanTab patient={activePatient} />}
            </div>
        </div>
    );
}
