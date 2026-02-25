import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { PatientSidebar } from "./PatientSidebar";
import { BottomTabBar } from "./BottomTabBar";

export function PatientLayout() {
    return (
        <div className="flex min-h-screen" style={{ backgroundColor: "#f3f4f8", fontFamily: "var(--font-sans)" }}>
            <PatientSidebar />

            {/* Main content area */}
            <main
                className="flex-1 md:ml-[230px] pb-20 md:pb-10"
                style={{ minHeight: "100vh" }}
            >
                <div className="mx-auto" style={{ maxWidth: 1100 }}>
                    <Outlet />
                </div>
            </main>

            <BottomTabBar />
            <Toaster position="top-right" richColors />
        </div>
    );
}
