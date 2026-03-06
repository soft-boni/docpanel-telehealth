import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { mockPatients } from "../../mockDatabase";

// Section definitions strictly sorted into the 4 required types
const SECTIONS = [
  { flag: 'red', title: '🔴 Urgent', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-800' },
  { flag: 'purple', title: '💜 Titration Due', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800' },
  { flag: 'yellow', title: '🟡 Pending Review', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-800' },
  { flag: 'green', title: '🟢 Standard Review', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-800' }
] as const;

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

function getAlertText(patient: typeof mockPatients[0]) {
  if (patient.flag === 'red' && patient.questionnaire.takesNitrates) return 'Takes nitrates';
  if (patient.flag === 'red') return 'Requires immediate attention';
  if (patient.flag === 'purple') return 'Action needed: ' + patient.status;
  if (patient.flag === 'yellow') return 'Pending review';
  return 'No issues';
}

export function CasesQueue() {
  const navigate = useNavigate();

  // Filter out completely Active patients that require no review
  const queuePatients = mockPatients.filter(p => p.status !== "Active");

  return (
    <div className="min-h-screen bg-[#f3f4f8] p-6 lg:p-10 font-sans">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Cases Queue</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Prioritized review items</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {SECTIONS.map(section => {
            const cases = queuePatients.filter(p => p.flag === section.flag);
            if (cases.length === 0) return null;

            return (
              <div key={section.flag} className={`bg-white rounded-2xl border ${section.border} overflow-hidden shadow-sm`}>
                <div className={`px-6 py-4 ${section.bg} border-b ${section.border} flex justify-between items-center`}>
                  <h2 className={`font-bold ${section.text} text-sm uppercase tracking-wider`}>{section.title}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${section.badge}`}>
                    {cases.length} {cases.length === 1 ? 'Case' : 'Cases'}
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {cases.map(p => (
                    <div key={p.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${section.flag === 'red' ? 'bg-red-500' :
                            section.flag === 'purple' ? 'bg-purple-500' :
                              section.flag === 'yellow' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}>
                          {getInitials(p.name)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900">{p.name}</h3>
                            <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">CASE-{p.id.split('-')[1]}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider">
                              {p.service}
                            </span>
                            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
                              {getAlertText(p)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/cases/${p.id}`)}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm w-full sm:w-auto"
                      >
                        Review Case
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
