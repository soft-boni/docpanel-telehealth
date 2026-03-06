import { Search, ChevronDown, MessageSquare, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { mockPatients } from "../../mockDatabase";
import { usePersona } from "../../PersonaContext";

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

export function PatientDatabase() {
  const navigate = useNavigate();
  const { switchPersona } = usePersona();

  const handleViewPatient = (id: string) => {
    switchPersona(id);
    navigate(`/patients/${id}`);
  };


  return (
    <div className="min-h-screen bg-[#f3f4f8] p-6 lg:p-10 font-sans">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patients Database</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">Master patient directory</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50">
              Filter <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Demographics</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Active Service</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Medication / Plan</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockPatients.map(p => {

                  let badgeColors = 'bg-slate-100 text-slate-700';
                  if (p.flag === 'red') badgeColors = 'bg-red-100 text-red-700';
                  else if (p.flag === 'purple') badgeColors = 'bg-purple-100 text-purple-700';
                  else if (p.flag === 'yellow') badgeColors = 'bg-amber-100 text-amber-700';
                  else if (p.flag === 'green') badgeColors = 'bg-emerald-100 text-emerald-700';

                  return (
                    <tr
                      key={p.id}
                      onClick={() => handleViewPatient(p.id)}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${p.flag === 'red' ? 'bg-red-500' :
                            p.flag === 'purple' ? 'bg-purple-500' :
                              p.flag === 'yellow' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}>
                            {getInitials(p.name)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</div>
                            <div className="text-xs text-slate-500 font-mono mt-0.5">CASE-{p.id.split('-')[1]}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{p.age} yrs</div>
                        <div className="text-xs text-slate-500 mt-0.5">{p.gender}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider">
                          {p.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${badgeColors} whitespace-nowrap`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{p.currentMedication}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{p.planName}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={(e) => { e.stopPropagation(); handleViewPatient(p.id); }}
                            title="View Patient"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={(e) => { e.stopPropagation(); navigate(`/messages`); }}
                            title="Message Patient"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
