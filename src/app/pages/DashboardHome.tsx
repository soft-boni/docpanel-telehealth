import { useState } from "react";
import { TopBar } from "../components/dashboard/TopBar";
import { HeroCard } from "../components/dashboard/HeroCard";
import { TabBar } from "../components/dashboard/TabBar";
import { PeriodicSummary } from "../components/dashboard/PeriodicSummary";
import { BottomRow } from "../components/dashboard/BottomRow";
import { TabCases } from "../components/dashboard/TabCases";
import { TabRevenue } from "../components/dashboard/TabRevenue";
import { TabPatients } from "../components/dashboard/TabPatients";
import { TabPrescriptions } from "../components/dashboard/TabPrescriptions";
import { TabFulfillment } from "../components/dashboard/TabFulfillment";

export function DashboardHome() {
  const [activeTab, setActiveTab] = useState("General");

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      <TopBar />
      <HeroCard />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "General" && (
        <>
          <PeriodicSummary />
          <BottomRow />
        </>
      )}
      {activeTab === "Cases" && <TabCases />}
      {activeTab === "Revenue" && <TabRevenue />}
      {activeTab === "Patients" && <TabPatients />}
      {activeTab === "Prescriptions" && <TabPrescriptions />}
      {activeTab === "Fulfillment" && <TabFulfillment />}
    </div>
  );
}
