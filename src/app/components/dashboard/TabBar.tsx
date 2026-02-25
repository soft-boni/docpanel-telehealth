const tabs = [
  "General",
  "Cases",
  "Revenue",
  "Patients",
  "Prescriptions",
  "Fulfillment",
];

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center gap-1 px-8 mt-6">
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all ${
              isActive
                ? "bg-[#16a34a]/10 text-[#16a34a]"
                : "text-[#8892a8] hover:text-[#1a1d2e] hover:bg-[#f3f4f8]"
            }`}
            style={{ fontSize: "0.82rem", fontWeight: isActive ? 600 : 500 }}
          >
            {isActive && (
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#16a34a" }}
              />
            )}
            {tab}
          </button>
        );
      })}
    </div>
  );
}
