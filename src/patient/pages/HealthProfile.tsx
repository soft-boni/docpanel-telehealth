import { usePersona } from "../../PersonaContext";
import { FileText, Camera, FlaskConical } from "lucide-react";

// ════════════════════════════════════════
// SHARED
// ════════════════════════════════════════

const card = "bg-white border border-slate-200 rounded-xl shadow-sm";

// ════════════════════════════════════════
// HEALTH PROFILE PAGE
// ════════════════════════════════════════

export function HealthProfile() {
    const { activePatient } = usePersona();

    if (!activePatient) return <div>No patient selected.</div>;

    const p = activePatient;
    const lastWeight = p.trackingData?.weightLog?.[p.trackingData.weightLog.length - 1]?.weight;
    const bmi = lastWeight && p.age ? Math.round((lastWeight / ((1.72) ** 2)) * 10) / 10 : null;

    // Dynamic documents based on service
    const getDocuments = () => {
        const docs: { name: string; icon: any; date: string }[] = [];
        switch (p.service) {
            case "Menopause":
                docs.push({ name: "Hormone Panel 2025.pdf", icon: FlaskConical, date: "Jan 15, 2025" });
                docs.push({ name: "Mammogram Report.pdf", icon: FileText, date: "Dec 03, 2024" });
                break;
            case "Skincare":
            case "Hair Regrowth":
                docs.push({ name: "Intake Photos.jpg", icon: Camera, date: "Oct 15, 2024" });
                docs.push({ name: "Dermatology Questionnaire.pdf", icon: FileText, date: "Oct 14, 2024" });
                break;
            case "Testosterone":
                docs.push({ name: "Recent Bloodwork.pdf", icon: FlaskConical, date: "Nov 20, 2024" });
                docs.push({ name: "TRT Consent Form.pdf", icon: FileText, date: "Nov 18, 2024" });
                break;
            case "Labs":
                docs.push({ name: "Lab Results – " + p.planName + ".pdf", icon: FlaskConical, date: "Feb 01, 2025" });
                break;
            default:
                docs.push({ name: "Initial Questionnaire.pdf", icon: FileText, date: "Jan 05, 2024" });
                docs.push({ name: "ID Verification.pdf", icon: FileText, date: "Jan 05, 2024" });
                break;
        }
        return docs;
    };

    const documents = getDocuments();

    return (
        <div className="min-h-screen bg-[#f3f4f8] p-4 pb-24">
            <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col gap-4">
                {/* Page Header */}
                <div className="pt-2">
                    <h1 className="text-xl font-bold text-slate-900">📋 Health Profile</h1>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{p.name} · {p.service}</p>
                </div>

                {/* Personal & Vitals Card */}
                <div className={`${card} p-5`}>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Personal & Vitals</div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-slate-600 shrink-0">
                            {p.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">{p.name}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{p.age} yrs · {p.gender}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                            <div className="text-[10px] text-slate-500 font-bold uppercase">Age</div>
                            <div className="text-lg font-bold text-slate-900 mt-1">{p.age}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                            <div className="text-[10px] text-slate-500 font-bold uppercase">Gender</div>
                            <div className="text-lg font-bold text-slate-900 mt-1">{p.gender === "Male" ? "♂" : "♀"}</div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3 text-center">
                            <div className="text-[10px] text-slate-500 font-bold uppercase">{lastWeight ? "Weight" : "BMI"}</div>
                            <div className="text-lg font-bold text-slate-900 mt-1">{lastWeight ? `${lastWeight}kg` : bmi ? bmi : "—"}</div>
                        </div>
                    </div>
                </div>

                {/* Medical History Card */}
                <div className={`${card} p-5`}>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Medical History</div>

                    <div className="flex flex-col gap-3">
                        <div>
                            <div className="text-xs text-slate-500 font-medium mb-1.5">Conditions</div>
                            <div className="flex flex-wrap gap-1.5">
                                {(p.medicalHistory || []).map((h: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">{h}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-slate-500 font-medium mb-1.5">Current Medication</div>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                                <span className="text-sm font-bold text-emerald-800">{p.currentMedication || "None"}</span>
                            </div>
                        </div>

                        <div>
                            <div className="text-xs text-slate-500 font-medium mb-1.5">Allergies</div>
                            <div className="bg-slate-50 rounded-lg p-3">
                                <span className="text-sm font-medium text-slate-700">No known allergies</span>
                            </div>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4 flex items-start gap-2">
                        <span className="text-sm shrink-0">⚠️</span>
                        <p className="text-xs font-bold text-amber-800 leading-relaxed">Updating your medications may trigger a safety review by your doctor.</p>
                    </div>
                </div>

                {/* Uploaded Documents */}
                <div className={`${card} p-5`}>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Uploaded Documents</div>

                    <div className="flex flex-col gap-2">
                        {documents.map((doc, i) => (
                            <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-lg p-3 hover:bg-slate-100 transition-colors cursor-pointer">
                                <div className="w-9 h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                                    <doc.icon className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-slate-900 truncate">{doc.name}</div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">{doc.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-3 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">
                        ➕ Upload Document
                    </button>
                </div>
            </div>
        </div>
    );
}
