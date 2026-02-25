import { ChevronDown } from "lucide-react";

/* ─── Top Prescriptions ─── */

const prescriptions = [
  {
    initial: "S",
    gradient: "linear-gradient(135deg, #16a34a, #15803d)",
    name: "Generic Semaglutide",
    sub: "GLP-1 Injectable",
    cases: 156,
    badgeBg: "#16a34a",
  },
  {
    initial: "T",
    gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    name: "Tadalafil Daily 5mg",
    sub: "ED Medication",
    cases: 89,
    badgeBg: "#2563eb",
  },
  {
    initial: "E",
    gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    name: "Escitalopram 10mg",
    sub: "Mental Health",
    cases: 67,
    badgeBg: "#7c3aed",
  },
  {
    initial: "Si",
    gradient: "linear-gradient(135deg, #ea580c, #c2410c)",
    name: "Sildenafil 50mg",
    sub: "ED Medication",
    cases: 54,
    badgeBg: "#ea580c",
  },
];

function TopPrescriptions() {
  return (
    <div
      className="bg-white border border-[#e2e6ef] p-5 flex flex-col"
      style={{ borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
          💊 Top Prescriptions
        </h3>
        <button
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#e2e6ef] text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          February
          <ChevronDown className="w-3 h-3 text-[#8892a8]" />
        </button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {prescriptions.map((rx) => (
          <div key={rx.name} className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0"
              style={{
                background: rx.gradient,
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {rx.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="truncate"
                style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1a1d2e" }}
              >
                {rx.name}
              </p>
              <p
                className="truncate"
                style={{ fontSize: "0.7rem", color: "#8892a8" }}
              >
                {rx.sub}
              </p>
            </div>
            <span
              className="px-2.5 py-0.5 rounded-full text-white shrink-0"
              style={{
                backgroundColor: rx.badgeBg,
                fontSize: "0.68rem",
                fontWeight: 600,
                fontFamily: "var(--font-mono)",
              }}
            >
              {rx.cases} cases
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Revenue Chart ─── */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

const revenueData = [
  { subs: 60, newP: 35, addOns: 20 },
  { subs: 75, newP: 45, addOns: 25 },
  { subs: 55, newP: 40, addOns: 15 },
  { subs: 80, newP: 50, addOns: 30 },
  { subs: 90, newP: 55, addOns: 28 },
  { subs: 70, newP: 42, addOns: 22 },
  { subs: 85, newP: 48, addOns: 26 },
  { subs: 95, newP: 60, addOns: 32 },
  { subs: 78, newP: 44, addOns: 20 },
  { subs: 65, newP: 38, addOns: 18 },
];

function RevenueChart() {
  return (
    <div
      className="bg-white border border-[#e2e6ef] p-5 flex flex-col"
      style={{ borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-4">
          <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            💰 Revenue
          </h3>
          <div className="flex items-center gap-3">
            {[
              { color: "#16a34a", label: "Subscriptions" },
              { color: "#2563eb", label: "New Patients" },
              { color: "#c4c9d4", label: "Add-ons" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span style={{ fontSize: "0.7rem", color: "#8892a8" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-[#e2e6ef] text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          February
          <ChevronDown className="w-3 h-3 text-[#8892a8]" />
        </button>
      </div>

      {/* Total */}
      <p style={{ marginBottom: 16 }}>
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1a1d2e",
            fontFamily: "var(--font-mono)",
          }}
        >
          247,584
        </span>
        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#8892a8", marginLeft: 4 }}>
          SAR
        </span>
      </p>

      {/* Grouped bar chart */}
      <div className="flex items-end gap-2 flex-1" style={{ minHeight: 120 }}>
        {revenueData.map((d, i) => (
          <div key={months[i]} className="flex-1 flex flex-col items-center gap-0">
            <div className="flex items-end gap-[2px] w-full justify-center" style={{ height: 100 }}>
              <div
                className="rounded-t-sm"
                style={{
                  width: "28%",
                  height: `${d.subs}%`,
                  backgroundColor: "#16a34a",
                  borderRadius: "3px 3px 0 0",
                }}
              />
              <div
                className="rounded-t-sm"
                style={{
                  width: "28%",
                  height: `${d.newP}%`,
                  backgroundColor: "#2563eb",
                  borderRadius: "3px 3px 0 0",
                }}
              />
              <div
                className="rounded-t-sm"
                style={{
                  width: "28%",
                  height: `${d.addOns}%`,
                  backgroundColor: "#c4c9d4",
                  borderRadius: "3px 3px 0 0",
                }}
              />
            </div>
            <span
              className="mt-1.5"
              style={{ fontSize: "0.65rem", color: "#8892a8", fontWeight: 500 }}
            >
              {months[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BottomRow() {
  return (
    <div
      className="px-8 mt-5 pb-8"
      style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}
    >
      <TopPrescriptions />
      <RevenueChart />
    </div>
  );
}
