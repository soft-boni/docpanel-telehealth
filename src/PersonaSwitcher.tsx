import { usePersona } from "./PersonaContext";
import { mockPatients } from "./mockDatabase";

export function PersonaSwitcher() {
    const { activePatient, switchPersona } = usePersona();

    return (
        <div className="fixed top-0 left-0 w-full z-[100] bg-slate-900 text-white p-2 shadow-md flex items-center gap-4 text-sm font-sans">
            <label htmlFor="persona-select" className="font-bold shrink-0">
                🔧 DEV TOOL: Active Persona:
            </label>
            <select
                id="persona-select"
                value={activePatient.id}
                onChange={(e) => switchPersona(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500 max-w-xl truncate"
            >
                {mockPatients.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.service} ({p.gender}) - {p.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
