
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { PersonaProvider } from "./PersonaContext";
import { PersonaSwitcher } from "./PersonaSwitcher";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
    <PersonaProvider>
        <PersonaSwitcher />
        <RouterProvider router={router} />
    </PersonaProvider>
);