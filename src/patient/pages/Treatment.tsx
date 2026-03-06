import { useState } from "react";
import { toast } from "sonner";
import { usePersona } from "../../PersonaContext";
import { CheckCircle2, Camera, ArrowRight } from "lucide-react";

// ════════════════════════════════════════
// SHARED
// ════════════════════════════════════════

const card = "bg-white border border-slate-200 rounded-xl shadow-sm";

function MedCard({ emoji, name, dosage, instructions, price, badge }: { emoji: string; name: string; dosage?: string; instructions: string; price: string; badge?: string }) {
    return (
        <div className={`${card} p-4`}>
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Medication</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">{badge || "Active"}</span>
            </div>
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center text-xl shrink-0">{emoji}</div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 text-sm">{name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{instructions}</div>
                </div>
            </div>
            <div className="mt-3 text-right text-xs font-bold text-slate-500">{price}</div>
        </div>
    );
}

function ActionButton({ label, onClick, variant = "default" }: { label: string; onClick?: () => void; variant?: "default" | "blue" | "danger" }) {
    const cls = variant === "blue" ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" : variant === "danger" ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
    return (
        <button onClick={onClick || (() => toast.success("Action triggered!"))} className={`w-full py-3 rounded-xl border font-bold text-sm transition-colors ${cls}`}>
            {label}
        </button>
    );
}

// ════════════════════════════════════════
// 1. WEIGHT LOSS
// ════════════════════════════════════════

function WeightLossTreatment({ patient }: { patient: any }) {
    const log = patient.trackingData?.weightLog || [];
    const titration = patient.trackingData?.titrationTimeline || {};

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left column */}
                <div className="flex flex-col gap-4">
                    <MedCard emoji="💉" name={patient.currentMedication} instructions="Inject once weekly · Every Monday" price="549 SAR/mo" />
                    {/* Dose Journey */}
                    <div className={`${card} p-4`}>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Dose Journey</h3>
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded z-0" />
                            {Object.entries(titration).length > 0 ? Object.entries(titration).map(([dose, status], i) => {
                                const st = status as string;
                                const isDone = st === "Completed";
                                const isCurrent = st === "Current";
                                return (
                                    <div key={dose} className="relative z-10 flex flex-col items-center gap-1.5">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs font-bold ${isDone ? "bg-emerald-500 border-emerald-500 text-white" : isCurrent ? "bg-white border-purple-500 text-purple-600" : "bg-white border-slate-200 text-slate-400"}`}>
                                            {isDone ? "✓" : i + 1}
                                        </div>
                                        <div className={`text-xs font-bold ${isCurrent ? "text-purple-700" : "text-slate-600"}`}>{dose}</div>
                                        <div className="text-[10px] text-slate-400">{st}</div>
                                    </div>
                                );
                            }) : (
                                <>
                                    {[{ label: "Wk 1-4", dose: "0.25mg", status: "done" }, { label: "Wk 5-8", dose: "0.5mg", status: "current" }, { label: "Wk 9-12", dose: "1.0mg", status: "future" }].map((s, i) => (
                                        <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs font-bold ${s.status === "done" ? "bg-emerald-500 border-emerald-500 text-white" : s.status === "current" ? "bg-white border-purple-500 text-purple-600" : "bg-white border-slate-200 text-slate-400"}`}>
                                                {s.status === "done" ? "✓" : i + 1}
                                            </div>
                                            <div className={`text-xs font-bold ${s.status === "current" ? "text-purple-700" : "text-slate-600"}`}>{s.dose}</div>
                                            <div className="text-[10px] text-slate-400">{s.label}</div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {/* Right column */}
                <div className="flex flex-col gap-4">
                    <div className={`${card} p-4`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weight Progress</h3>
                            <button onClick={() => toast.success("Weight logged!")} className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">➕ Log Weight</button>
                        </div>
                        {log.length > 0 && (
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-500">Start: <b className="text-slate-900">{log[0].weight}kg</b></span>
                                <ArrowRight className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm text-slate-500">Now: <b className="text-emerald-600">{log[log.length - 1].weight}kg</b></span>
                            </div>
                        )}
                        <div className="h-32 flex items-end gap-2 pt-4 border-b border-l border-slate-100 pl-2 pb-1">
                            {log.map((entry: any, i: number) => {
                                const h = Math.max(15, Math.min(100, ((entry.weight - 80) / 30) * 100));
                                return (
                                    <div key={i} className="flex flex-col items-center flex-1 gap-1">
                                        <div className="w-full max-w-[28px] bg-blue-100 rounded-t-sm relative flex justify-center" style={{ height: `${h}%` }}>
                                            <span className="absolute -top-5 text-[10px] font-bold text-blue-600">{entry.weight}</span>
                                        </div>
                                        <span className="text-[9px] text-slate-400">{entry.date.split("-")[1]}/{entry.date.split("-")[2]}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <ActionButton label="💬 Message Doctor" variant="blue" />
                <ActionButton label="⚠️ Report Side Effect" />
                <ActionButton label="⏸ Pause Treatment" variant="danger" />
            </div>
        </div>
    );
}

// ════════════════════════════════════════
// 2. SEXUAL HEALTH (Male ED & Female)
// ════════════════════════════════════════

function SexualHealthTreatment({ patient }: { patient: any }) {
    const nextRefill = patient.trackingData?.refillSchedule?.nextRefill || "N/A";
    const comfortLog = patient.trackingData?.comfortLog;

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MedCard emoji="💊" name={patient.currentMedication} instructions={patient.gender === "Male" ? "Take once daily · Same time each day" : "Apply as directed"} price={patient.gender === "Male" ? "229 SAR/mo" : "199 SAR/mo"} />

                {/* Refill / Schedule */}
                <div className={`${card} p-4`}>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Refill & Shipping</h3>
                    <div className="flex gap-3">
                        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
                            <div className="text-xs text-blue-600 font-bold mb-1">Next Auto-Refill</div>
                            <div className="text-lg font-bold text-blue-800">{nextRefill}</div>
                        </div>
                        <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
                            <div className="text-xs text-slate-500 font-bold mb-1">Shipping</div>
                            <div className="text-sm font-bold text-slate-800">📦 Discrete</div>
                            <div className="text-[10px] text-slate-400 mt-1">Plain packaging</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comfort Log (Female) */}
            {comfortLog && (
                <div className={`${card} p-4`}>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Comfort Progress</h3>
                    <div className="flex justify-between items-end gap-2 h-24 border-b border-slate-100 pb-1">
                        {comfortLog.map((entry: any, i: number) => {
                            const h = (entry.comfortScore / 10) * 100;
                            return (
                                <div key={i} className="flex flex-col items-center flex-1 gap-1">
                                    <div className="w-full max-w-[24px] bg-pink-100 rounded-t-sm" style={{ height: `${h}%` }} />
                                    <span className="text-[9px] text-slate-400 font-bold">{entry.comfortScore}/10</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
                <ActionButton label="🔄 Refill Early" variant="blue" />
                <ActionButton label="💬 Message Doctor" />
                <ActionButton label="⏸ Pause Treatment" variant="danger" />
            </div>
        </div>
    );
}

// ════════════════════════════════════════
// 3. HAIR REGROWTH
// ════════════════════════════════════════

function HairRegrowthTreatment({ patient }: { patient: any }) {
    const photos = patient.trackingData?.photoLog || [];

    return (
        <div className="flex flex-col gap-4">
            <MedCard emoji="🧴" name={patient.currentMedication} instructions="Apply to scalp twice daily" price="159 SAR/mo" />

            {/* Progress Photos Timeline */}
            <div className={`${card} p-4`}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Progress Photos</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {/* Existing photos */}
                    {photos.slice(0, 2).map((p: any, i: number) => (
                        <div key={i} className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0 relative">
                            <Camera className="w-6 h-6 text-slate-400 mb-1" />
                            <span className="text-[10px] font-bold text-slate-600">{p.type}</span>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    ))}
                    {photos.slice(2, 4).map((p: any, i: number) => (
                        <div key={i + 2} className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0 relative">
                            <Camera className="w-6 h-6 text-slate-400 mb-1" />
                            <span className="text-[10px] font-bold text-slate-600">{p.type}</span>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    ))}
                    {/* Upload placeholder */}
                    <button onClick={() => toast.success("Upload triggered!")} className="w-24 h-24 border-2 border-dashed border-blue-300 rounded-xl flex flex-col items-center justify-center shrink-0 text-blue-500 hover:bg-blue-50 transition-colors">
                        <span className="text-lg mb-0.5">➕</span>
                        <span className="text-[9px] font-bold leading-tight text-center px-1">Upload Month 3</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <ActionButton label="📸 Upload Photos" variant="blue" />
                <ActionButton label="💬 Message Doctor" />
            </div>
        </div>
    );
}

// ════════════════════════════════════════
// 4. TRT (TESTOSTERONE)
// ════════════════════════════════════════

function TRTTreatment({ patient }: { patient: any }) {
    const log = patient.trackingData?.trtLog || [];

    return (
        <div className="flex flex-col gap-4">
            <MedCard emoji="💉" name={patient.currentMedication} instructions="Inject once weekly · Same day" price="349 SAR/mo" />

            {/* Hormone + Energy Chart */}
            <div className={`${card} p-4`}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Hormone & Symptom Tracker</h3>
                <div className="flex items-end gap-4 h-32 border-b border-l border-slate-100 pl-2 pb-1 relative">
                    {log.map((entry: any, i: number) => {
                        const tH = Math.max(15, ((entry.totalT - 200) / 600) * 100);
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 relative">
                                <div className="w-full max-w-[24px] bg-blue-200 rounded-t-sm relative flex justify-center" style={{ height: `${tH}%` }}>
                                    <span className="absolute -top-5 text-[9px] font-bold text-blue-600">{entry.totalT}</span>
                                </div>
                                <span className="text-[9px] text-slate-400">{entry.date.split("-").slice(1).join("/")}</span>
                            </div>
                        );
                    })}
                </div>
                {/* Libido dots */}
                <div className="flex justify-around mt-3">
                    {log.map((entry: any, i: number) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-6 h-6 rounded-full bg-orange-100 border-2 border-orange-400 flex items-center justify-center text-[10px] font-bold text-orange-700">{entry.libidoScore}</div>
                            <span className="text-[9px] text-slate-400">Energy</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500"><div className="w-2.5 h-2.5 rounded bg-blue-200" /> Total T</div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500"><div className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Energy/Libido</div>
                </div>
            </div>

            <button onClick={() => toast.success("Weekly log saved!")} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                ➕ Log This Week's Energy & Mood
            </button>

            <ActionButton label="💬 Message Doctor" />
        </div>
    );
}

// ════════════════════════════════════════
// 5. MENTAL HEALTH
// ════════════════════════════════════════

function MentalHealthTreatment({ patient }: { patient: any }) {
    const moodLog = patient.trackingData?.moodLog || [];
    const phq9Log = patient.trackingData?.phq9Log || [];
    const log = moodLog.length > 0 ? moodLog : phq9Log;
    const scoreKey = moodLog.length > 0 ? "gad7Score" : "phq9Score";

    const moodEmoji = (score: number) => {
        if (score <= 5) return "🙂";
        if (score <= 10) return "😐";
        if (score <= 15) return "😟";
        return "😢";
    };

    return (
        <div className="flex flex-col gap-4">
            <MedCard emoji="💊" name={patient.currentMedication} instructions="Take once daily · Morning with food" price="169 SAR/mo" />

            {/* Mood Tracker */}
            <div className={`${card} p-4`}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Mood Tracker</h3>
                <div className="flex justify-between gap-2">
                    {log.map((entry: any, i: number) => {
                        const score = entry[scoreKey];
                        return (
                            <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                                <span className="text-2xl">{moodEmoji(score)}</span>
                                <div className="w-full bg-slate-100 rounded-full h-16 relative flex items-end overflow-hidden">
                                    <div className={`w-full rounded-t-sm transition-all ${score > 10 ? "bg-red-200" : score > 5 ? "bg-amber-200" : "bg-emerald-200"}`} style={{ height: `${Math.max(10, (score / 21) * 100)}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-slate-600">{score}</span>
                                <span className="text-[9px] text-slate-400">{entry.date.split("-").slice(1).join("/")}</span>
                            </div>
                        );
                    })}
                </div>
                {log.length > 1 && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center">
                        <span className="text-xs font-bold text-emerald-700">
                            ↓ Score improved from {log[0][scoreKey]} → {log[log.length - 1][scoreKey]}
                        </span>
                    </div>
                )}
            </div>

            <button onClick={() => toast.success("Check-in saved!")} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                ➕ Check-in: How are you feeling today?
            </button>

            <ActionButton label="💬 Message Doctor" />
        </div>
    );
}

// ════════════════════════════════════════
// 6. SKINCARE
// ════════════════════════════════════════

function SkincareTreatment({ patient }: { patient: any }) {
    const photos = patient.trackingData?.photoLog || [];
    const formula = patient.trackingData?.formulaDetails?.activeIngredients || patient.currentMedication.split(" + ").map((s: string) => s.trim());
    const [sideEffects, setSideEffects] = useState<Record<string, boolean>>({});

    const toggleSE = (key: string) => setSideEffects((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="flex flex-col gap-4">
            {/* Formula Card */}
            <div className={`${card} p-4`}>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Formula</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Active</span>
                </div>
                <div className="flex items-center gap-3 bg-pink-50 border border-pink-100 rounded-xl p-3 mb-3">
                    <div className="w-11 h-11 bg-pink-500 rounded-xl flex items-center justify-center text-xl shrink-0">🧴</div>
                    <div>
                        <div className="font-bold text-slate-900 text-sm">Custom Rx Acne Cream</div>
                        <div className="text-xs text-slate-500 mt-0.5">Apply nightly · Clean, dry skin</div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {formula.map((ing: string, i: number) => (
                        <span key={i} className="px-2.5 py-1 bg-pink-100 text-pink-700 text-[11px] font-bold rounded-full">{ing}</span>
                    ))}
                </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                <span className="text-sm shrink-0">⚠️</span>
                <p className="text-xs font-bold text-amber-800 leading-relaxed">Side effects in first 2-4 weeks (redness, peeling) are normal. Contact your doctor if severe.</p>
            </div>

            {/* Progress Photos */}
            <div className={`${card} p-4`}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Skin Progress</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                    {photos.map((p: any, i: number) => (
                        <div key={i} className="w-24 h-24 bg-slate-100 border border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0">
                            <Camera className="w-6 h-6 text-slate-400 mb-1" />
                            <span className="text-[10px] font-bold text-slate-600">{p.type}</span>
                            <span className="text-[9px] text-slate-400">{p.date}</span>
                        </div>
                    ))}
                    <button onClick={() => toast.success("Upload triggered!")} className="w-24 h-24 border-2 border-dashed border-pink-300 rounded-xl flex flex-col items-center justify-center shrink-0 text-pink-500 hover:bg-pink-50 transition-colors">
                        <span className="text-lg">➕</span>
                        <span className="text-[9px] font-bold">New Photo</span>
                    </button>
                </div>
                {/* Doctor's Note */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-3">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Doctor's Note</div>
                    <p className="text-xs text-blue-800 font-medium leading-relaxed">Skin is responding well. Continue current formula. Expect purging to subside by week 6.</p>
                </div>
            </div>

            {/* Skin-Specific Side Effects */}
            <div className={`${card} p-4`}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Report Side Effects</h3>
                <div className="flex flex-col gap-2">
                    {[
                        { key: "redness", label: "🔴 Severe redness", color: "red" },
                        { key: "peeling", label: "🟡 Peeling / flaking", color: "amber" },
                        { key: "purging", label: "😤 Purging (more breakouts)", color: "orange" },
                    ].map((se) => (
                        <button key={se.key} onClick={() => toggleSE(se.key)} className={`px-4 py-3 rounded-full border text-sm font-bold transition-colors ${sideEffects[se.key] ? `bg-${se.color === "red" ? "red" : se.color === "amber" ? "amber" : "orange"}-100 border-${se.color === "red" ? "red" : se.color === "amber" ? "amber" : "orange"}-300 text-${se.color === "red" ? "red" : se.color === "amber" ? "amber" : "orange"}-800` : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                            {se.label}
                        </button>
                    ))}
                </div>
                {Object.values(sideEffects).some(Boolean) && (
                    <button onClick={() => { toast.success("Side effects reported!"); setSideEffects({}); }} className="w-full mt-3 py-2.5 bg-pink-600 text-white rounded-xl font-bold text-sm hover:bg-pink-700 transition-colors">
                        Submit Report
                    </button>
                )}
            </div>

            <ActionButton label="💬 Message Doctor" variant="blue" />
        </div>
    );
}

// ════════════════════════════════════════
// 7. MENOPAUSE (HRT)
// ════════════════════════════════════════

function MenopauseTreatment({ patient }: { patient: any }) {
    const log = patient.trackingData?.symptomLog || [];

    return (
        <div className="flex flex-col gap-4">
            <MedCard emoji="💊" name={patient.currentMedication} instructions="Patch twice weekly · Progesterone daily" price="289 SAR/mo" />

            {/* Symptom Tracker */}
            <div className={`${card} p-4`}>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Daily Symptom Tracker</h3>

                {/* Hot Flashes Bars */}
                <div className="mb-3">
                    <div className="text-[10px] font-bold text-rose-600 mb-2">🔥 Hot Flashes / Day</div>
                    <div className="flex items-end gap-2 h-20 border-b border-slate-100 pb-1">
                        {log.map((entry: any, i: number) => {
                            const h = Math.max(10, (entry.hotFlashesPerDay / 10) * 100);
                            return (
                                <div key={i} className="flex flex-col items-center flex-1 gap-0.5">
                                    <div className="w-full max-w-[20px] bg-rose-100 border border-rose-200 rounded-t-sm" style={{ height: `${h}%` }} />
                                    <span className="text-[9px] font-bold text-rose-600">{entry.hotFlashesPerDay}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Sleep Quality */}
                <div>
                    <div className="text-[10px] font-bold text-indigo-600 mb-2">😴 Sleep Quality (1-10)</div>
                    <div className="flex justify-between gap-2">
                        {log.map((entry: any, i: number) => (
                            <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center text-[10px] font-bold text-indigo-700">{entry.sleepQuality}</div>
                                <span className="text-[9px] text-slate-400">{entry.date.split("-").slice(1).join("/")}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {log.length > 1 && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-lg p-2 text-center">
                        <span className="text-xs font-bold text-emerald-700">
                            Hot flashes: {log[0].hotFlashesPerDay}/day → {log[log.length - 1].hotFlashesPerDay}/day 🎉
                        </span>
                    </div>
                )}
            </div>

            <button onClick={() => toast.success("Symptoms logged!")} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                ➕ Log Today's Symptoms (Hot Flashes, Sleep, Brain Fog)
            </button>

            <ActionButton label="💬 Message Doctor" />
        </div>
    );
}

// ════════════════════════════════════════
// DEFAULT FALLBACK
// ════════════════════════════════════════

function DefaultTreatment({ patient }: { patient: any }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <span className="text-slate-400 font-bold text-sm">Treatment view for "{patient.service}" coming soon.</span>
        </div>
    );
}

// ════════════════════════════════════════
// DYNAMIC WRAPPER
// ════════════════════════════════════════

export function Treatment() {
    const { activePatient } = usePersona();

    if (!activePatient) return <div>No patient selected.</div>;

    // Labs redirect
    if (activePatient.service === "Labs") {
        return (
            <div className="min-h-screen bg-[#f3f4f8] p-4 pb-24">
                <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto">
                    <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 text-center mt-8">
                        <span className="text-3xl mb-3 block">🔬</span>
                        <h2 className="text-lg font-bold text-teal-900 mb-2">Lab Results</h2>
                        <p className="text-sm text-teal-700 font-medium">Your lab results are located in the <b>My Labs</b> tab.</p>
                    </div>
                </div>
            </div>
        );
    }

    let ViewComponent;
    switch (activePatient.service) {
        case "Weight Loss": ViewComponent = WeightLossTreatment; break;
        case "Sexual Health": ViewComponent = SexualHealthTreatment; break;
        case "Hair Regrowth": ViewComponent = HairRegrowthTreatment; break;
        case "Testosterone": ViewComponent = TRTTreatment; break;
        case "Mental Health": ViewComponent = MentalHealthTreatment; break;
        case "Skincare": ViewComponent = SkincareTreatment; break;
        case "Menopause": ViewComponent = MenopauseTreatment; break;
        default: ViewComponent = DefaultTreatment; break;
    }

    return (
        <div className="min-h-screen bg-[#f3f4f8] p-4 pb-24">
            <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col gap-4">
                {/* Page Title */}
                <div className="pt-2">
                    <h1 className="text-xl font-bold text-slate-900">My Treatment</h1>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{activePatient.name} · {activePatient.service}</p>
                </div>

                <ViewComponent patient={activePatient} />
            </div>
        </div>
    );
}
