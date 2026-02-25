import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Toaster } from "sonner";

export function Layout() {
  return (
    <div
      className="flex h-screen w-screen overflow-hidden bg-[var(--app-bg)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#f3f4f8]">
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: "var(--font-sans)",
            borderRadius: 12,
            border: "1px solid #e2e6ef",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          },
        }}
      />
    </div>
  );
}
