import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { DashboardHome } from "./pages/DashboardHome";
import { CasesQueue } from "./pages/CasesQueue";
import { CaseDetail } from "./pages/CaseDetail";
import { PatientDatabase } from "./pages/PatientDatabase";
import { PatientView } from "./pages/PatientView";
import { Messages } from "./pages/Messages";
import { Subscriptions } from "./pages/Subscriptions";
import { Analytics } from "./pages/Analytics";
import { ProviderSettings } from "./pages/ProviderSettings";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
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
]);
