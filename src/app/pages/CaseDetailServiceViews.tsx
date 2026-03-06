import { useState } from "react";
import { useNavigate } from "react-router";
import type { CaseData } from "../data/mockData";
import {
    cardStyle,
    DemographicsGrid,
    FlagsAlerts,
    QuestionnaireResponses,
    ClinicalDecisionPanel,
} from "./CaseDetail";

/* ═══════════════════════════════════════════
   1. WEIGHT LOSS VIEW
   ═══════════════════════════════════════════ */

export function WeightLossLeft({ caseData }: { caseData: CaseData }) {
    return (
        <div className="flex flex-col gap-5">
            <DemographicsGrid caseData={caseData} />

            {/* Weight Progress Bar Chart */}
            <div style={cardStyle} className="p-5">
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 16 }}>Weight Progress (4 Weeks)</h4>
                <div className="flex items-end justify-between h-40 px-4 pt-4 border-b border-[#e2e6ef] pb-2 relative">
                    <div className="flex flex-col items-center gap-2">
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8892a8' }}>102kg</span>
                        <div className="w-12 bg-blue-100 rounded-t-sm" style={{ height: '120px' }} />
                        <span style={{ fontSize: '0.7rem', color: '#8892a8' }}>Wk 1</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8892a8' }}>100kg</span>
                        <div className="w-12 bg-blue-200 rounded-t-sm" style={{ height: '100px' }} />
                        <span style={{ fontSize: '0.7rem', color: '#8892a8' }}>Wk 2</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8892a8' }}>98kg</span>
                        <div className="w-12 bg-blue-300 rounded-t-sm" style={{ height: '80px' }} />
                        <span style={{ fontSize: '0.7rem', color: '#8892a8' }}>Wk 3</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16a34a' }}>96kg</span>
                        <div className="w-12 bg-[#16a34a] rounded-t-sm" style={{ height: '60px' }} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#1a1d2e' }}>Wk 4</span>
                    </div>
                </div>
            </div>

            {/* Dose Titration Timeline */}
            <div style={cardStyle} className="p-5">
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 16 }}>Dose Titration Timeline</h4>
                <div className="flex items-center justify-between px-2">
                    {[
                        { d: '0.25mg', s: '✓', c: 'bg-green-500 text-white' },
                        { d: '0.5mg', s: '?', c: 'bg-purple-500 text-white' },
                        { d: '1.0mg', s: '', c: 'bg-gray-100 text-gray-400' },
                        { d: 'Maintain', s: '', c: 'bg-gray-100 text-gray-400' }
                    ].map((s, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${s.c}`}>
                                {s.s || <span className="text-transparent">.</span>}
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1a1d2e' }}>{s.d}</span>
                        </div>
                    ))}
                    {/* Timeline background line */}
                    <div className="absolute left-[10%] right-[10%] h-1 bg-gray-200 z-0" style={{ transform: 'translateY(-10px)' }} />
                </div>
            </div>
        </div>
    );
}

export function WeightLossRight({ caseData }: { caseData: CaseData }) {
    const [approved, setApproved] = useState(false);
    const navigate = useNavigate();
    return (
        <div style={{ ...cardStyle, position: "sticky", top: 24 }} className="p-5 flex flex-col gap-5 border-t-4 border-t-purple-500">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1d2e" }}>Titration Decision Needed</h3>
            <p style={{ fontSize: "0.85rem", color: "#8892a8" }}>Patient has completed 4 weeks of 0.25mg GLP-1 and is requesting dose escalation.</p>
            <div className="flex flex-col gap-3 mt-4">
                <button onClick={() => setApproved(true)} className="w-full py-3 rounded-xl text-white font-bold bg-purple-600 hover:bg-purple-700 transition">
                    {approved ? "✅ Approved 0.5mg!" : "✅ Approve Increase to 0.5mg"}
                </button>
                <button className="w-full py-3 rounded-xl text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 transition">
                    ⏸ Maintain 0.25mg
                </button>
                <button onClick={() => navigate('/messages')} className="w-full py-3 rounded-xl text-indigo-600 font-bold bg-indigo-50 hover:bg-indigo-100 transition">
                    💬 Message Patient
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. ED VIEW
   ═══════════════════════════════════════════ */

export function EDLeft({ caseData }: { caseData: CaseData }) {
    return (
        <div className="flex flex-col gap-5">
            <DemographicsGrid caseData={caseData} />
            <div style={{ ...cardStyle, backgroundColor: '#fef2f2', borderColor: '#fecaca' }} className="p-6">
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#dc2626", display: 'flex', alignItems: 'center', gap: 8 }}>
                    🔴 HARD STOP
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#b91c1c", marginTop: 8, fontWeight: 600 }}>Takes nitrates. PDE5 blocked.</p>
                <p style={{ fontSize: "0.85rem", color: "#991b1b", marginTop: 4 }}>Patient marked YES to taking Isosorbide for Angina. Prescribing PDE5 inhibitors would cause life-threatening hypotension.</p>
            </div>
            <FlagsAlerts caseData={caseData} />
            <QuestionnaireResponses caseData={caseData} />
        </div>
    );
}

export function EDRight({ caseData }: { caseData: CaseData }) {
    const navigate = useNavigate();
    return (
        <div style={{ ...cardStyle, position: "sticky", top: 24 }} className="p-5 flex flex-col gap-5">
            <div className="opacity-50 pointer-events-none flex flex-col gap-4">
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a1d2e" }}>🩺 Clinical Decision</h3>
                <div>
                    <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1a1d2e", display: "block", marginBottom: 8 }}>Base Medication</label>
                    <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between">
                        <span className="text-gray-500 font-medium text-sm">Sildenafil 50mg</span>
                        <span className="text-gray-400 text-xs">199 SAR/mo</span>
                    </div>
                </div>
            </div>

            <div className="mt-2 pt-4 border-t border-gray-200 flex flex-col gap-3">
                <button disabled className="w-full py-3 rounded-xl text-gray-400 font-bold bg-gray-200 cursor-not-allowed">
                    🚫 Approve Blocked
                </button>
                <button onClick={() => navigate('/cases')} className="w-full py-3 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 transition">
                    ❌ Decline Case
                </button>
                <button onClick={() => navigate('/messages')} className="w-full py-3 rounded-xl text-gray-700 font-bold bg-white border border-gray-300 hover:bg-gray-50 transition">
                    💬 Message
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. MENTAL HEALTH VIEW
   ═══════════════════════════════════════════ */

export function MentalHealthLeft({ caseData }: { caseData: CaseData }) {
    return (
        <div className="flex flex-col gap-5">
            <DemographicsGrid caseData={caseData} />
            <div style={cardStyle} className="p-5">
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 16 }}>Clinical Assessment Score Chart</h4>
                {/* GAD-7 Stepper/Line Graph visual */}
                <div className="relative pt-6 pb-2 px-4">
                    <div className="absolute top-8 left-4 right-4 h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full" />
                    <div className="relative flex justify-between text-xs font-bold mt-6 text-gray-500">
                        <span>0 (Minimal)</span>
                        <span>5 (Mild)</span>
                        <span>10 (Mod)</span>
                        <span>15+ (Severe)</span>
                    </div>
                    {/* marker at 16 */}
                    <div className="absolute top-6 w-4 h-6 bg-red-700 rounded-sm border-2 border-white" style={{ left: '90%' }}>
                        <div className="absolute -top-7 -left-10 bg-red-700 text-white text-xs py-1 px-2 rounded-md w-[80px] text-center font-bold">Score: 16</div>
                    </div>
                </div>
            </div>
            <div style={cardStyle} className="p-5">
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 12 }}>Reported Symptoms</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    <li>Trouble sleeping (Insomnia)</li>
                    <li>Restlessness and feeling on edge</li>
                    <li>Difficulty concentrating</li>
                    <li>Excessive worry over past 6 months</li>
                </ul>
            </div>
            <QuestionnaireResponses caseData={caseData} />
        </div>
    );
}

export function MentalHealthRight({ caseData }: { caseData: CaseData }) {
    return (
        <div className="flex flex-col gap-5">
            <ClinicalDecisionPanel caseData={caseData} />
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. HAIR LOSS VIEW
   ═══════════════════════════════════════════ */

export function HairLossLeft({ caseData }: { caseData: CaseData }) {
    const [view, setView] = useState<'current' | 'previous'>('current');
    return (
        <div className="flex flex-col gap-5">
            <DemographicsGrid caseData={caseData} />
            <div style={cardStyle} className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1a1d2e" }}>Scalp Photo Comparison</h4>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button onClick={() => setView('previous')} className={`px-3 py-1 text-xs font-bold rounded-md transition ${view === 'previous' ? 'bg-white shadow' : 'text-gray-500'}`}>Previous Month</button>
                        <button onClick={() => setView('current')} className={`px-3 py-1 text-xs font-bold rounded-md transition ${view === 'current' ? 'bg-white shadow' : 'text-gray-500'}`}>Current Month</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                            <span className="text-gray-400 font-bold text-sm">Crown ({view})</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                            <span className="text-gray-400 font-bold text-sm">Hairline ({view})</span>
                        </div>
                    </div>
                </div>
            </div>
            <FlagsAlerts caseData={caseData} />
            <QuestionnaireResponses caseData={caseData} />
        </div>
    );
}

export function HairLossRight({ caseData }: { caseData: CaseData }) {
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-5 relative">
            <ClinicalDecisionPanel caseData={caseData} />

            {/* Warning confirmation box added under the regular panel */}
            <div style={{ ...cardStyle, borderColor: '#fde68a' }} className="p-5 bg-yellow-50 z-20 sticky bottom-4 shadow-lg shadow-yellow-100">
                <h4 className="text-yellow-800 font-bold text-sm mb-2">⚠️ Warning Triggered</h4>
                <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-1 w-4 h-4 text-yellow-600 rounded bg-yellow-100 border-yellow-300 focus:ring-yellow-500" />
                    <span className="text-xs text-yellow-900 leading-relaxed">
                        Patient reported mild scalp irritation last month. I confirm I have reviewed this and authorize continuing this formulation.
                    </span>
                </label>
                <button disabled={!confirmed} onClick={() => navigate('/cases')} className="mt-4 w-full py-2.5 rounded-xl font-bold transition-all text-sm text-white bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed">
                    ✓ Authorize
                </button>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   5. SKIN CARE VIEW
   ═══════════════════════════════════════════ */

export function SkinCareLeft({ caseData }: { caseData: CaseData }) {
    return (
        <div className="flex flex-col gap-5">
            {/* Hide standard vitals. Massive Patient Photos Panel */}
            <div style={cardStyle} className="p-5">
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1a1d2e", marginBottom: 16 }}>Patient Photos Panel</h4>
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-100 rounded-2xl w-full h-[400px] flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                        <span className="text-gray-500 font-bold text-lg text-center">📸 Front / Full Face<br /><span className="text-sm font-normal">Click to Enlarge</span></span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl w-full h-[300px] flex items-center justify-center cursor-pointer hover:bg-gray-200 transition">
                        <span className="text-gray-500 font-bold text-lg text-center">🔍 Close-Up<br /><span className="text-sm font-normal">Click to Enlarge</span></span>
                    </div>
                </div>
            </div>
            <QuestionnaireResponses caseData={caseData} />
        </div>
    );
}

export function SkinCareRight({ caseData }: { caseData: CaseData }) {
    const [tab, setTab] = useState('Acne');
    const [strength, setStrength] = useState('Mild (0.025%)');
    const navigate = useNavigate();

    return (
        <div style={{ ...cardStyle, position: "sticky", top: 24 }} className="p-5 flex flex-col gap-5 border-t-4 border-t-pink-400">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1a1d2e" }}>✨ Custom Rx Formula Builder</h3>

            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
                {['Acne', 'Anti-Aging', 'Melasma'].map(t => (
                    <button key={t} onClick={() => setTab(t)} className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${tab === t ? 'bg-white shadow text-pink-600' : 'text-gray-500'}`}>
                        {t}
                    </button>
                ))}
            </div>

            {/* Strength Toggle */}
            <div>
                <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wider">Strength</label>
                <div className="flex gap-2">
                    {['Mild (0.025%)', 'Medium (0.05%)'].map(s => (
                        <button key={s} onClick={() => setStrength(s)} className={`px-4 py-2 text-xs font-bold rounded-lg border transition ${strength === s ? 'bg-pink-50 border-pink-300 text-pink-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Editable Ingredients */}
            <div className="flex flex-col gap-2 mt-2">
                <label className="text-xs font-bold text-gray-700 block uppercase tracking-wider">Compounded Ingredients</label>
                <textarea className="w-full h-24 p-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-mono outline-none focus:border-pink-300"
                    defaultValue={`- Tretinoin ${strength.split('(')[1]?.split(')')[0] || '0.025%'}\n- Niacinamide 4%\n- Clindamycin 1%`}
                />
            </div>

            <button onClick={() => navigate('/cases')} className="w-full mt-4 py-3.5 rounded-xl text-white font-bold bg-pink-500 hover:bg-pink-600 transition shadow-lg shadow-pink-200">
                ✅ APPROVE & PRESCRIBE
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   6. LABS VIEW
   ═══════════════════════════════════════════ */

export function LabsLeft({ caseData }: { caseData: CaseData }) {
    return (
        <div className="flex flex-col gap-5">
            <DemographicsGrid caseData={caseData} />
            <div style={cardStyle} className="overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-5 py-4">
                    <h3 className="text-base font-bold text-gray-900">Biomarker Results Table</h3>
                </div>
                <div className="p-5 flex flex-col gap-6">

                    {/* Heart */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Heart Health</h4>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-700">LDL Cholesterol</span>
                            <span className="text-sm font-bold text-green-600">85 mg/dL ✅</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-700">Triglycerides</span>
                            <span className="text-sm font-bold text-green-600">110 mg/dL ✅</span>
                        </div>
                    </div>

                    {/* Vitamins - Abnormal */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Vitamins & Minerals</h4>
                        <div className="flex flex-col py-3 px-4 bg-red-50 rounded-xl border border-red-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-red-700">Vitamin D, 25-Hydroxy</span>
                                <span className="text-sm font-bold text-red-700">18 ng/mL (Abnormal) ⚠️</span>
                            </div>
                            {/* Gradient slider */}
                            <div className="relative w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full mt-2">
                                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-red-600 rounded-full" style={{ left: '18%' }} />
                            </div>
                            <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
                                <span>0</span>
                                <span>30</span>
                                <span>50</span>
                                <span>100+</span>
                            </div>
                        </div>
                    </div>

                    {/* Metabolism */}
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Metabolism</h4>
                        <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-700">Hemoglobin A1c</span>
                            <span className="text-sm font-bold text-green-600">5.2% ✅</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export function LabsRight({ caseData }: { caseData: CaseData }) {
    const [upsell, setUpsell] = useState(true);
    const navigate = useNavigate();
    return (
        <div style={{ ...cardStyle, position: "sticky", top: 24 }} className="p-5 flex flex-col gap-5 border-t-4 border-t-teal-500">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1a1d2e" }}>🩺 Doctor's Action Plan & Upsell Module</h3>

            <div>
                <label className="text-xs font-bold text-gray-700 block mb-2 uppercase tracking-wider">Action Plan Recommendations</label>
                <textarea className="w-full h-32 p-3 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-teal-300"
                    defaultValue={`1. Take Vitamin D3 5000 IU daily with a fatty meal to improve absorption.\n2. Re-test Vitamin D levels in 3 months.\n3. Maintain current diet and exercise routine.`}
                />
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={upsell} onChange={(e) => setUpsell(e.target.checked)} className="mt-0.5 w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-purple-900">☑️ Include supplement bundle</span>
                        <span className="text-xs text-purple-700 mt-1">Automatically recommends Hims Vitamin D3 Gummies to patient checkout.</span>
                    </div>
                </label>
            </div>

            <button onClick={() => navigate('/cases')} className="w-full mt-4 py-3.5 rounded-xl text-white font-bold bg-teal-600 hover:bg-teal-700 transition shadow-lg shadow-teal-200">
                📤 PUBLISH RESULTS & ACTION PLAN
            </button>
        </div>
    );
}
