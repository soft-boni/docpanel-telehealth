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
import { patientRoutes } from "./patient/routes";

/**
 * Hostname-based routing:
 * - If the hostname contains "patient", mount the Patient Panel at /
 * - Otherwise, mount the Doctor Panel at /
 */
const isPatientHost = window.location.hostname.includes("patient");

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

export const router = createBrowserRouter(
    isPatientHost ? patientRoutes : doctorRoutes
);
