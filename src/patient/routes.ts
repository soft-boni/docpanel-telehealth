import { PatientLayout } from "./components/PatientLayout";
import { Home } from "./pages/Home";
import { Treatment } from "./pages/Treatment";
import { Orders } from "./pages/Orders";
import { PatientMessages } from "./pages/PatientMessages";
import { HealthProfile } from "./pages/HealthProfile";
import { Account } from "./pages/Account";
import { Help } from "./pages/Help";
import { PatientSettings } from "./pages/PatientSettings";
import type { RouteObject } from "react-router";

/**
 * Build patient routes under a given base path.
 * - On production (patient hostname): base = "/"
 * - On localhost (dev): base = "/patient"
 */
export function buildPatientRoutes(basePath: string): RouteObject[] {
    return [
        {
            path: basePath,
            Component: PatientLayout,
            children: [
                { index: true, Component: Home },
                { path: "treatment", Component: Treatment },
                { path: "orders", Component: Orders },
                { path: "messages", Component: PatientMessages },
                { path: "profile", Component: HealthProfile },
                { path: "account", Component: Account },
                { path: "help", Component: Help },
                { path: "settings", Component: PatientSettings },
            ],
        },
    ];
}

// Default export for production (patient hostname → routes at "/")
export const patientRoutes = buildPatientRoutes("/");
