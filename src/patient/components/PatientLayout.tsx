import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { PatientSidebar } from "./PatientSidebar";
import { BottomTabBar } from "./BottomTabBar";
import { PatientBaseProvider } from "../PatientBaseContext";

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
   PATIENT LAYOUT
   ═══════════════════════════════════════════ */

export function PatientLayout() {
    const base = usePatientBasePath();

    return (
        <PatientBaseProvider value={base}>
            <div className="flex min-h-screen" style={{ backgroundColor: "#f3f4f8", fontFamily: "var(--font-sans)" }}>
                <PatientSidebar />

                <main
                    className="flex-1 md:ml-[230px] pb-20 md:pb-10 pt-12"
                    style={{ minHeight: "100vh" }}
                >
                    <Outlet />
                </main>

                <BottomTabBar />
                <Toaster position="top-right" richColors />
            </div>
        </PatientBaseProvider>
    );
}
