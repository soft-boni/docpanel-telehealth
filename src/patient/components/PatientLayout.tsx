import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { PatientSidebar } from "./PatientSidebar";
import { BottomTabBar } from "./BottomTabBar";
import { PatientBaseProvider } from "../PatientBaseContext";
import {
    PrototypeProvider,
    usePrototype,
    maleTreatments,
    femaleTreatments,
    statusLabels,
    type Gender,
    type Treatment,
    type PatientStatus,
} from "../PrototypeContext";

/**
 * Detect the base path for the patient panel.
 * If the current URL starts with "/patient", we're on localhost dev mode.
 * Otherwise we're on the production patient hostname with routes at "/".
 */
function usePatientBasePath() {
    const location = useLocation();
    return location.pathname.startsWith("/patient") ? "/patient" : "";
}

/* ═══════════════════════════════════════════
   PROTOTYPE SWITCHER BAR (Global)
   ═══════════════════════════════════════════ */

const selectStyle: React.CSSProperties = {
    backgroundColor: "#1e1b4b",
    color: "#e0e7ff",
    border: "1px solid #6366f1",
    borderRadius: 8,
    padding: "4px 10px",
    fontSize: "0.74rem",
    fontWeight: 600,
    outline: "none",
    cursor: "pointer",
};

function PrototypeSwitcher() {
    const { gender, setGender, treatment, setTreatment, status, setStatus } = usePrototype();
    const treatments = gender === "Male" ? maleTreatments : femaleTreatments;

    return (
        <div
            className="sticky top-0 z-50 flex items-center gap-3 px-5 py-2.5 flex-wrap"
            style={{
                background: "linear-gradient(90deg, #1e1b4b, #312e81)",
                borderBottom: "2px solid #6366f1",
            }}
        >
            <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#c7d2fe" }}>
                🔧 Prototype
            </span>

            {/* Gender */}
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                style={selectStyle}
            >
                <option value="Male">♂ Male</option>
                <option value="Female">♀ Female</option>
            </select>

            {/* Treatment */}
            <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value as Treatment)}
                style={selectStyle}
            >
                {treatments.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>

            {/* Status */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PatientStatus)}
                style={selectStyle}
            >
                {(Object.entries(statusLabels) as [PatientStatus, string][]).map(
                    ([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    )
                )}
            </select>
        </div>
    );
}

/* ═══════════════════════════════════════════
   PATIENT LAYOUT
   ═══════════════════════════════════════════ */

export function PatientLayout() {
    const base = usePatientBasePath();

    return (
        <PatientBaseProvider value={base}>
            <PrototypeProvider>
                <div className="flex min-h-screen" style={{ backgroundColor: "#f3f4f8", fontFamily: "var(--font-sans)" }}>
                    <PatientSidebar />

                    <main
                        className="flex-1 md:ml-[230px] pb-20 md:pb-10"
                        style={{ minHeight: "100vh" }}
                    >
                        <PrototypeSwitcher />
                        <div className="mx-auto" style={{ maxWidth: 1100 }}>
                            <Outlet />
                        </div>
                    </main>

                    <BottomTabBar />
                    <Toaster position="top-right" richColors />
                </div>
            </PrototypeProvider>
        </PatientBaseProvider>
    );
}
