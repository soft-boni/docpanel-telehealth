import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, AlertCircle, Maximize2, X, Plus, Camera } from "lucide-react";
import { usePersona } from "../../PersonaContext";

// ════════════════════════════════════════
// SHARED
// ════════════════════════════════════════

const cardClass = "bg-white border border-slate-200 rounded-2xl shadow-sm p-6";

function FlagBadge({ flag }: { flag: string }) {
  const flagMap: Record<string, { bg: string; text: string; label: string }> = {
    red: { bg: "bg-red-100", text: "text-red-700", label: "🔴 Urgent" },
    purple: { bg: "bg-purple-100", text: "text-purple-700", label: "💜 Titration Due" },
    yellow: { bg: "bg-amber-100", text: "text-amber-700", label: "🟡 Review" },
    green: { bg: "bg-emerald-100", text: "text-emerald-700", label: "🟢 Standard" },
  };
  const cfg = flagMap[flag] || flagMap.green;
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

// ════════════════════════════════════════
// 1. WEIGHT LOSS
// ════════════════════════════════════════

function WeightLossReview({ patient }: { patient: any }) {
  const log = patient.trackingData?.weightLog || [];
  const titration = patient.trackingData?.titrationTimeline || {};

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 mb-6">Weight Progress</h3>
          <div className="h-48 flex items-end gap-4 justify-between pt-4 border-b border-l border-slate-200 pl-4 pb-2 relative">
            <div className="absolute top-0 left-2 text-xs text-slate-400 font-mono">110kg</div>
            <div className="absolute bottom-2 left-2 text-xs text-slate-400 font-mono">80kg</div>
            {log.map((entry: any, i: number) => {
              const heightPct = Math.max(10, Math.min(100, ((entry.weight - 80) / 30) * 100));
              return (
                <div key={i} className="flex flex-col items-center flex-1 gap-2">
                  <div className="w-full max-w-[40px] bg-blue-100 rounded-t-md relative flex justify-center hover:bg-blue-200 transition-colors" style={{ height: `${heightPct}%` }}>
                    <span className="absolute -top-6 text-xs font-bold text-blue-700">{entry.weight}kg</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{entry.date.split("-").slice(1).join("/")}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 mb-6">Dose Titration Timeline</h3>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded z-0" />
            {Object.entries(titration).map(([dose, status], i) => {
              const st = status as string;
              const isDone = st === "Completed";
              const isCurrent = st === "Current";
              return (
                <div key={dose} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-xs ${isDone ? "bg-emerald-500 border-emerald-500 text-white" : isCurrent ? "bg-white border-purple-500 text-purple-600" : "bg-white border-slate-200 text-slate-400"}`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-bold ${isCurrent ? "text-purple-700" : "text-slate-700"}`}>{dose}</div>
                    <div className="text-xs text-slate-500 font-medium">{st}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl shadow-sm p-6 sticky top-24">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-purple-900">Titration Decision</h3>
          </div>
          <p className="text-sm text-purple-700 mb-6 font-medium leading-relaxed">Patient has completed 4 weeks at current dose. Side effects reported as minimal. Ready for next step?</p>
          <div className="bg-white rounded-xl p-4 border border-purple-100 mb-6 flex justify-between items-center">
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Current</div>
              <div className="font-bold text-slate-900">0.25mg Weekly</div>
            </div>
            <ArrowLeft className="w-4 h-4 text-purple-300 rotate-180 shrink-0" />
            <div className="text-right">
              <div className="text-xs text-purple-500 uppercase font-bold tracking-wider mb-1">Proposed</div>
              <div className="font-bold text-purple-700">0.5mg Weekly</div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Approve Increase to 0.5mg
            </button>
            <button className="w-full py-3 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors">⏸ Maintain 0.25mg</button>
            <button className="w-full py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-bold text-sm transition-colors mt-2">💬 Message Patient</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// 2. TESTOSTERONE (TRT)
// ════════════════════════════════════════

function TestosteroneReview({ patient }: { patient: any }) {
  const log = patient.trackingData?.trtLog || [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 mb-6">Hormone vs. Symptoms Timeline</h3>
          <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-end border-b-2 border-slate-100 pb-2 relative h-40">
              <div className="absolute -left-2 top-0 bottom-0 w-full flex flex-col justify-between text-[10px] text-slate-400 font-mono"><span>800 ng/dL</span><span>200 ng/dL</span></div>
              {log.map((entry: any, i: number) => {
                const heightMap = Math.max(10, Math.min(100, ((entry.totalT - 200) / 600) * 100));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end z-10 gap-2">
                    <div className="w-12 bg-blue-500 rounded-t border-b-0 border border-blue-600 flex items-start justify-center pt-2 text-white text-xs font-bold shadow-sm" style={{ height: `${heightMap}%` }}>{entry.totalT}</div>
                    <span className="text-xs font-bold text-slate-500">{entry.date.split("-").slice(1).join("/")}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center absolute w-full top-1/2 -mt-4 px-12 pointer-events-none">
              {log.map((entry: any, i: number) => (
                <div key={"l" + i} className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-md flex items-center justify-center text-[10px] text-white font-bold z-20" title={`Libido: ${entry.libidoScore}/10`} style={{ transform: `translateY(${-(entry.libidoScore - 5) * 10}px)` }}>{entry.libidoScore}</div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded bg-blue-500"></div> Total T</div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Libido Score</div>
            </div>
          </div>
        </div>
        <div className={`${cardClass} bg-slate-50`}>
          <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4">Recent Lab Work Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Total Testosterone</div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">720 <span className="text-sm text-slate-400 font-normal">ng/dL</span></div>
              <div className="text-xs text-emerald-600 font-bold mt-2 bg-emerald-50 inline-block px-2 py-0.5 rounded">Optimal</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-medium mb-1">Free Testosterone</div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">16.8 <span className="text-sm text-slate-400 font-normal">ng/dL</span></div>
              <div className="text-xs text-emerald-600 font-bold mt-2 bg-emerald-50 inline-block px-2 py-0.5 rounded">Optimal</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
          <h3 className="text-lg font-bold text-slate-900 mb-1">TRT Dosage Builder</h3>
          <p className="text-sm text-slate-500 mb-6">Modify injection protocol</p>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Testosterone Cypionate</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>100mg / week</option><option>120mg / week</option><option>140mg / week</option><option>160mg / week</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Add-Ons</label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl mb-2 cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <div><div className="text-sm font-bold text-slate-900">Anastrozole 1mg</div><div className="text-xs text-slate-500">Aromatase inhibitor</div></div>
              </label>
              <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <div><div className="text-sm font-bold text-slate-900">Clomiphene 25mg</div><div className="text-xs text-slate-500">Fertility preservation</div></div>
              </label>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-2">
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Update TRT Protocol
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// 3. MENOPAUSE (HRT)
// ════════════════════════════════════════

function MenopauseReview({ patient }: { patient: any }) {
  const log = patient.trackingData?.symptomLog || [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 mb-6">Symptom Tracker</h3>
          <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-end border-b-2 border-slate-100 pb-2 relative h-48 pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-[10px] text-slate-400 font-mono py-2"><span>10/d</span><span>5/d</span><span>0/d</span></div>
              {log.map((entry: any, i: number) => {
                const heightMap = Math.max(5, (entry.hotFlashesPerDay / 10) * 100);
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end z-10 gap-2 h-full">
                    <div className="w-10 bg-rose-100 rounded-t border border-rose-200 flex items-start justify-center pt-2 text-rose-700 text-xs font-bold" style={{ height: `${heightMap}%` }}>{entry.hotFlashesPerDay}</div>
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{entry.date.split("-").slice(1).join("/")}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded bg-rose-100 border border-rose-200"></div> Hot Flashes / Day</div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Sleep Quality (1-10)</div>
            </div>
          </div>
        </div>
        <div className={`${cardClass} bg-rose-50 border-rose-100`}>
          <h3 className="text-sm uppercase tracking-wider font-bold text-rose-800 mb-2">Medical History Flags</h3>
          <p className="text-sm text-rose-700 font-medium mb-4">CRITICAL: Review before prescribing HRT</p>
          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-rose-100 text-sm font-bold text-slate-700"><AlertCircle className="w-4 h-4 text-rose-500" /> No personal history of breast cancer</li>
            <li className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-rose-100 text-sm font-bold text-slate-700"><AlertCircle className="w-4 h-4 text-emerald-500" /> No history of DVT / Blood Clots</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
          <h3 className="text-lg font-bold text-slate-900 mb-1">HRT Plan Builder</h3>
          <p className="text-sm text-slate-500 mb-6">Configure hormonal therapy</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber-800 leading-relaxed">⚠️ Uterus intact: Progesterone mandatory with Estrogen therapy.</p>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Estrogen Therapy (Systemic)</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-500">
                <option>Estradiol Patch 0.05mg (Twice weekly)</option><option>Estradiol Patch 0.1mg (Twice weekly)</option><option>Oral Estradiol 1mg (Daily)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Progesterone Protection</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-500">
                <option>Micronized Progesterone 100mg (Daily)</option><option>Micronized Progesterone 200mg (Cyclic)</option><option>Medroxyprogesterone acetate 2.5mg</option>
              </select>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-2">
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Prescribe HRT Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// 4. SKINCARE
// ════════════════════════════════════════

function SkincareReview({ patient }: { patient: any }) {
  const [formulaType, setFormulaType] = useState("Acne");
  const [strength, setStrength] = useState("Mild 0.025%");
  const photos = patient.trackingData?.photoLog || [];

  const formulaTypes = ["Acne", "Anti-Aging", "Melasma", "Rosacea"];
  const strengths = ["Mild 0.025%", "Medium 0.05%", "Strong 0.1%"];
  const ingredients = [
    { name: "Tretinoin", pct: "0.025" },
    { name: "Niacinamide", pct: "4" },
    { name: "Clindamycin", pct: "1" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        {/* Patient Skin Info */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Concern", value: "Acne" },
            { label: "Skin Type", value: "Oily" },
            { label: "Allergies", value: "None" },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-lg font-bold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Photos */}
        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Patient Photos</h3>
          <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 mb-6 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-pink-800 leading-relaxed">⚠️ Photos are the entire clinical basis for skin cases. Enlarge before prescribing.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(photos.length > 0 ? photos.slice(0, 2) : [{ type: "Front / Full Face" }, { type: "Close-Up" }]).map((p: any, i: number) => (
              <div key={i} className="relative bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl aspect-square flex flex-col items-center justify-center group hover:border-pink-400 transition-colors">
                <Camera className="w-10 h-10 text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-600">{p.type || `Photo ${i + 1}`}</span>
                {p.url && <span className="text-[10px] text-slate-400 mt-1 truncate max-w-[80%]">{p.url}</span>}
                <button className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-lg p-1.5 shadow-sm border border-slate-200 text-slate-500 hover:text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Side Effect Log */}
        {patient.trackingData?.sideEffectLog && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl shadow-sm p-6">
            <h3 className="text-sm uppercase tracking-wider font-bold text-amber-800 mb-3">Side Effect Reports</h3>
            {patient.trackingData.sideEffectLog.map((se: any, i: number) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{se.issue}</div>
                  <div className="text-xs text-slate-500 mt-1">Severity: {se.severity} · {se.date}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT - Custom Rx Formula Builder */}
      <div className="flex flex-col gap-6">
        <div className="bg-white border border-pink-200 rounded-2xl shadow-sm p-6 sticky top-24">
          <h3 className="text-lg font-bold text-pink-900 mb-1">Custom Rx Formula Builder</h3>
          <p className="text-sm text-slate-500 mb-6">Compound a custom prescription</p>

          {/* Formula Type */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Formula Type</label>
            <div className="flex flex-wrap gap-2">
              {formulaTypes.map((ft) => (
                <button key={ft} onClick={() => setFormulaType(ft)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${formulaType === ft ? "bg-pink-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {ft}
                </button>
              ))}
            </div>
          </div>

          {/* Strength */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Strength</label>
            <div className="grid grid-cols-3 gap-2">
              {strengths.map((s) => (
                <button key={s} onClick={() => setStrength(s)} className={`px-3 py-3 rounded-xl text-xs font-bold transition-colors text-center ${strength === s ? "bg-pink-100 text-pink-700 border-2 border-pink-400" : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Active Ingredients */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Active Ingredients</label>
            <div className="flex flex-col gap-2">
              {ingredients.map((ing) => (
                <div key={ing.name} className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-sm font-bold text-slate-900">{ing.name}</span>
                  <input type="text" defaultValue={`${ing.pct}%`} className="w-16 text-right bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-pink-700 outline-none focus:border-pink-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Notes */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Doctor Notes to Patient</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-pink-400 min-h-[80px] resize-none" placeholder="Apply nightly to clean skin. Expect mild purging for the first 2-4 weeks..." />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
              ✅ APPROVE & PRESCRIBE
            </button>
            <button className="w-full py-3 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              ❌ DECLINE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// 5. HAIR REGROWTH
// ════════════════════════════════════════

function HairRegrowthReview({ patient }: { patient: any }) {
  const [photoMonth, setPhotoMonth] = useState<"previous" | "current">("current");
  const [confirmed, setConfirmed] = useState(false);
  const photos = patient.trackingData?.photoLog || [];

  const crownPhotos = photos.filter((p: any) => p.type === "Crown" || p.type === "Part Line");
  const hairlinePhotos = photos.filter((p: any) => p.type === "Hairline");

  const getPhotoForSlot = (arr: any[], slot: "previous" | "current") => {
    if (arr.length === 0) return null;
    return slot === "previous" ? arr[0] : arr[arr.length - 1];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className={cardClass}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Scalp Photo Comparison</h3>
            <div className="flex bg-slate-100 rounded-xl p-1">
              <button onClick={() => setPhotoMonth("previous")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${photoMonth === "previous" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                Previous Month
              </button>
              <button onClick={() => setPhotoMonth("current")} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${photoMonth === "current" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
                Current Month
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Crown */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Crown</h4>
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl aspect-square flex flex-col items-center justify-center hover:border-amber-400 transition-colors">
                <Camera className="w-10 h-10 text-slate-400 mb-2" />
                {(() => {
                  const photo = getPhotoForSlot(crownPhotos, photoMonth);
                  return photo ? (
                    <>
                      <span className="text-sm font-bold text-slate-600">{photo.type}</span>
                      <span className="text-[10px] text-slate-400 mt-1">{photo.date}</span>
                    </>
                  ) : <span className="text-sm font-bold text-slate-500">No photo</span>;
                })()}
              </div>
            </div>
            {/* Hairline */}
            <div>
              <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Hairline</h4>
              <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl aspect-square flex flex-col items-center justify-center hover:border-amber-400 transition-colors">
                <Camera className="w-10 h-10 text-slate-400 mb-2" />
                {(() => {
                  const photo = getPhotoForSlot(hairlinePhotos, photoMonth);
                  return photo ? (
                    <>
                      <span className="text-sm font-bold text-slate-600">{photo.type}</span>
                      <span className="text-[10px] text-slate-400 mt-1">{photo.date}</span>
                    </>
                  ) : <span className="text-sm font-bold text-slate-500">No photo</span>;
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Treatment Plan</h3>
          <p className="text-sm text-slate-500 mb-6">Hair restoration protocol</p>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber-800 leading-relaxed">🟡 Patient reported mild scalp irritation last month.</p>
          </div>

          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Primary Treatment</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-500">
                <option>Topical Minoxidil 5%</option>
                <option>Topical Minoxidil 2%</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Secondary Treatment</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:border-blue-500">
                <option>Oral Finasteride 1mg</option>
                <option>Oral Finasteride 0.5mg</option>
                <option>No secondary treatment</option>
              </select>
            </div>
          </div>

          {/* Confirmation */}
          <label className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200 cursor-pointer mb-6">
            <input type="checkbox" checked={confirmed} onChange={() => setConfirmed(!confirmed)} className="w-4 h-4 text-blue-600 rounded mt-0.5" />
            <span className="text-xs font-bold text-slate-700 leading-relaxed">I have reviewed the irritation report and it is safe to continue treatment.</span>
          </label>

          <button disabled={!confirmed} className={`w-full py-3 rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2 ${confirmed ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
            <CheckCircle2 className="w-4 h-4" /> Approve Treatment
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════
// 6. LABS
// ════════════════════════════════════════

function LabsReview({ patient }: { patient: any }) {
  const [step, setStep] = useState<1 | 2>(1);
  const biomarkers = patient.trackingData?.biomarkers || [];
  const optimalCount = biomarkers.filter((b: any) => b.status === "optimal").length;
  const abnormalCount = biomarkers.filter((b: any) => b.status === "abnormal").length;
  const totalCount = biomarkers.length;
  const optimalPct = totalCount > 0 ? Math.round((optimalCount / totalCount) * 100) : 0;

  const [recs, setRecs] = useState([
    "Vitamin D3 5,000 IU daily for 3 months",
    "Retest Vitamin D in 90 days",
  ]);
  const [newRec, setNewRec] = useState("");

  return (
    <div>
      {/* Step Toggle */}
      <div className="flex bg-slate-100 rounded-xl p-1 mb-6 max-w-md">
        <button onClick={() => setStep(1)} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${step === 1 ? "bg-white text-teal-700 shadow-sm" : "text-slate-500"}`}>
          Step 1: Approve Order
        </button>
        <button onClick={() => setStep(2)} className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${step === 2 ? "bg-white text-teal-700 shadow-sm" : "text-slate-500"}`}>
          Step 2: Review Results
        </button>
      </div>

      {step === 1 ? (
        /* ─── STEP 1: APPROVE ORDER ─── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className={cardClass}>
              <h3 className="text-lg font-bold text-slate-900 mb-4">Patient Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-slate-500 font-medium">Name:</span> <span className="font-bold text-slate-900">{patient.name}</span></div>
                <div><span className="text-slate-500 font-medium">Age:</span> <span className="font-bold text-slate-900">{patient.age}</span></div>
                <div><span className="text-slate-500 font-medium">Selected Plan:</span> <span className="font-bold text-teal-700">{patient.planName}</span></div>
                <div><span className="text-slate-500 font-medium">Gender:</span> <span className="font-bold text-slate-900">{patient.gender}</span></div>
              </div>
            </div>
            <div className={cardClass}>
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-4">Safety Check Q&A</h3>
              <div className="flex flex-col gap-3">
                {Object.entries(patient.questionnaire || {}).filter(([k]) => typeof k === "string" && k !== "takesNitrates").map(([q, a]) => (
                  <div key={q} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 font-medium mb-1">{q}</div>
                    <div className="text-sm font-bold text-slate-900">{String(a)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Tests Included</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {["❤️ Heart", "🧬 Hormones", "🫁 Liver", "🩸 Blood Count", "🦴 Vitamins", "🧪 Metabolic"].map((t) => (
                  <div key={t} className="bg-teal-50 border border-teal-100 rounded-xl p-3 text-center">
                    <span className="text-sm font-bold text-teal-800">{t}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
                ✅ APPROVE LAB ORDER
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ─── STEP 2: REVIEW RESULTS ─── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className={cardClass}>
              <h3 className="text-lg font-bold text-slate-900 mb-6">Biomarker Results</h3>
              <div className="flex flex-col gap-3">
                {biomarkers.map((bm: any) => {
                  const isAbnormal = bm.status === "abnormal";
                  return (
                    <div key={bm.name} className={`rounded-xl p-4 border-2 ${isAbnormal ? "border-red-300 bg-red-50" : "border-slate-100 bg-white"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-bold text-slate-900">{bm.name}</div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isAbnormal ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {isAbnormal ? "Abnormal" : "Optimal"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`text-2xl font-bold ${isAbnormal ? "text-red-700" : "text-slate-900"}`}>
                          {bm.value} <span className="text-sm font-normal text-slate-400">{bm.unit}</span>
                        </div>
                        <div className="text-xs text-slate-500">Range: {bm.range}</div>
                      </div>
                      {/* CSS Gradient Range Slider */}
                      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #ef4444 0%, #ef4444 25%, #facc15 25%, #facc15 40%, #22c55e 40%, #22c55e 70%, #facc15 70%, #facc15 85%, #ef4444 85%, #ef4444 100%)" }}>
                        <div className="absolute top-0 w-3 h-3 bg-white border-2 border-slate-800 rounded-full shadow-md" style={{ left: isAbnormal ? "12%" : "55%", transform: "translateX(-50%)" }} />
                      </div>
                      <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-mono">
                        <span>Low</span><span>Optimal</span><span>High</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sticky top-24">
              {/* System Summary */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 text-center">
                <div className="text-3xl font-bold text-teal-700">{optimalPct}%</div>
                <div className="text-xs text-teal-600 font-bold uppercase tracking-wider mt-1">OPTIMAL</div>
                <div className="text-xs text-slate-500 mt-2">{optimalCount} optimal · {abnormalCount} abnormal</div>
              </div>

              {/* Action Plan */}
              <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 mb-3">Doctor's Action Plan</h3>
              <div className="flex flex-col gap-2 mb-4">
                {recs.map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <span className="text-sm font-medium text-slate-700 pr-2">{r}</span>
                    <button onClick={() => setRecs(recs.filter((_, j) => j !== i))} className="text-slate-400 hover:text-red-500 shrink-0"><X className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mb-6">
                <input type="text" value={newRec} onChange={(e) => setNewRec(e.target.value)} placeholder="Add recommendation..." className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500" />
                <button onClick={() => { if (newRec.trim()) { setRecs([...recs, newRec.trim()]); setNewRec(""); } }} className="bg-teal-100 text-teal-700 rounded-lg px-3 py-2 hover:bg-teal-200 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>

              {/* Upsell */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                <h4 className="text-xs uppercase tracking-wider font-bold text-purple-700 mb-3">Suggested Programs</h4>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-purple-600 rounded mt-0.5" />
                  <span className="text-xs font-bold text-purple-800 leading-relaxed">☑️ Suggest Weight Management program based on rising LDL</span>
                </label>
              </div>

              <button className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2">
                📤 PUBLISH RESULTS & ACTION PLAN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════
// DEFAULT FALLBACK
// ════════════════════════════════════════

function DefaultReview({ patient }: { patient: any }) {
  return (
    <div className="flex items-center justify-center h-64 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl font-bold">
      Detailed view for {patient.service} coming soon.
    </div>
  );
}

// ════════════════════════════════════════
// DYNAMIC WRAPPER PAGE
// ════════════════════════════════════════

export function CaseDetail() {
  const { activePatient } = usePersona();

  if (!activePatient) return <div>No patient selected.</div>;

  let ViewComponent;
  switch (activePatient.service) {
    case "Weight Loss": ViewComponent = WeightLossReview; break;
    case "Testosterone": ViewComponent = TestosteroneReview; break;
    case "Menopause": ViewComponent = MenopauseReview; break;
    case "Skincare": ViewComponent = SkincareReview; break;
    case "Hair Regrowth": ViewComponent = HairRegrowthReview; break;
    case "Labs": ViewComponent = LabsReview; break;
    default: ViewComponent = DefaultReview; break;
  }

  const initials = activePatient.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  let avatarBg = "bg-slate-500";
  if (activePatient.flag === "red") avatarBg = "bg-red-500";
  else if (activePatient.flag === "purple") avatarBg = "bg-purple-500";
  else if (activePatient.flag === "yellow") avatarBg = "bg-amber-500";
  else if (activePatient.flag === "green") avatarBg = "bg-emerald-500";

  return (
    <div className="min-h-screen bg-[#f3f4f8] font-sans pb-20">
      {/* Patient Header */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-10 py-6">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/cases" className="inline-flex items-center gap-1.5 mb-5 text-blue-600 hover:underline text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Cases
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0 ${avatarBg}`}>{initials}</div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold text-slate-900">{activePatient.name}</h1>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-bold uppercase tracking-wider">{activePatient.service}</span>
                  <FlagBadge flag={activePatient.flag} />
                </div>
                <div className="text-sm font-medium text-slate-500 mt-1.5 flex items-center gap-3 flex-wrap">
                  <span className="font-mono bg-slate-50 px-2 py-0.5 rounded text-xs border border-slate-100">CASE-{activePatient.id.split("-")[1]}</span>
                  <span>{activePatient.age} yrs</span>
                  <span>•</span>
                  <span>{activePatient.gender}</span>
                  <span>•</span>
                  <span>{activePatient.planName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 lg:p-10 max-w-[1200px] mx-auto">
        <ViewComponent patient={activePatient} />
      </div>
    </div>
  );
}
