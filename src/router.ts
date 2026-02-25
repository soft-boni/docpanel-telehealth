import { createBrowserRouter } from "react-router";
import { Layout } from "./app/components/Layout";
import { DashboardHome } from "./app/pages/DashboardHome";
import { CasesQueue } from "./app/pages/CasesQueue";
import { CaseDetail } from "./app/pages/CaseDetail";
import { PatientDatabase } from "./app/pages/PatientDatabase";
import { PatientView } from "./app/pages/PatientView";
import { Messages } from "./app/pages/Messages";
import { Subscriptions } from "./app/pages/Subscriptions";
import { Analytics } from "./app/pages/Analytics";
import { ProviderSettings } from "./app/pages/ProviderSettings";
import { NotFound } from "./app/pages/NotFound";
import { patientRoutes, buildPatientRoutes } from "./patient/routes";

/**
 * Hostname-based routing:
 * - Production "patient-telehealth.vercel.app" → Patient Panel at /
 * - Production "telehealth-doctor-panel.vercel.app" → Doctor Panel at /
 * - Localhost → Both: Doctor at /, Patient at /patient
 */
const isPatientHost = window.location.hostname.includes("patient");
const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const doctorRoutes = [
    {
        path: "/",
        Component: Layout,
        children: [
            { index: true, Component: DashboardHome },
            { path: "cases", Component: CasesQueue },
            { path: "cases/:id", Component: CaseDetail },
            { path: "patients", Component: PatientDatabase },
            { path: "patients/:id", Component: PatientView },
            { path: "messages", Component: Messages },
            { path: "subscriptions", Component: Subscriptions },
            { path: "analytics", Component: Analytics },
            { path: "settings", Component: ProviderSettings },
            { path: "*", Component: NotFound },
        ],
    },
];

function buildRoutes() {
    if (isPatientHost) {
        // Production patient domain → patient routes only, at "/"
        return patientRoutes;
    }

    if (isLocalhost) {
        // Localhost → both panels: doctor at "/", patient at "/patient"
        return [...doctorRoutes, ...buildPatientRoutes("/patient")];
    }

    // Production doctor domain → doctor routes only
    return doctorRoutes;
}

export const router = createBrowserRouter(buildRoutes());
