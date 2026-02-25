import { ChevronDown, Calendar } from "lucide-react";

function DonutPlaceholder() {
  return (
    <div className="relative w-14 h-14">
      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
        <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e6ef" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="#16a34a"
          strokeWidth="5"
          strokeDasharray={`${0.72 * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontSize: "0.65rem", fontWeight: 600, color: "#1a1d2e", fontFamily: "var(--font-mono)" }}
      >
        72%
      </span>
    </div>
  );
}

function ProgressRing() {
  return (
    <div className="relative w-14 h-14">
      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
        <circle cx="28" cy="28" r="22" fill="none" stroke="#e2e6ef" strokeWidth="5" />
        <circle
          cx="28"
          cy="28"
          r="22"
          fill="none"
          stroke="#16a34a"
          strokeWidth="5"
          strokeDasharray={`${0.84 * 2 * Math.PI * 22} ${2 * Math.PI * 22}`}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontSize: "0.85rem" }}
      >
        ⏱
      </span>
    </div>
  );
}

const barData = [
  { label: "WL", value: 156, color: "#16a34a", maxH: 52 },
  { label: "ED", value: 89, color: "#2563eb", maxH: 34 },
  { label: "MH", value: 67, color: "#7c3aed", maxH: 26 },
  { label: "Hair", value: 41, color: "#ea580c", maxH: 18 },
];

export function PeriodicSummary() {
  return (
    <div className="px-8 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#1a1d2e" }}>
          Periodic Summary
        </h3>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
            style={{ fontSize: "0.78rem", fontWeight: 500 }}
          >
            Monthly
            <ChevronDown className="w-3.5 h-3.5 text-[#8892a8]" />
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
            style={{ fontSize: "0.78rem", fontWeight: 500 }}
          >
            <Calendar className="w-3.5 h-3.5 text-[#8892a8]" />
            Select Date
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-3.5">
        {/* Card 1 - Total Cases */}
        <div
          className="flex items-center justify-between p-5 bg-white border border-[#e2e6ef]"
          style={{ borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div>
            <p style={{ fontSize: "0.78rem", color: "#8892a8", fontWeight: 500 }}>Total Cases</p>
            <p
              style={{
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "#1a1d2e",
                fontFamily: "var(--font-mono)",
                lineHeight: 1.3,
                marginTop: 2,
              }}
            >
              487
            </p>
            <p style={{ fontSize: "0.72rem", color: "#8892a8" }}>total</p>
          </div>
          <DonutPlaceholder />
        </div>

        {/* Card 2 - Patient Satisfaction */}
        <div
          className="flex items-center justify-between p-5 bg-white border border-[#e2e6ef]"
          style={{ borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div>
            <p style={{ fontSize: "0.78rem", color: "#8892a8", fontWeight: 500 }}>
              Patient Satisfaction
            </p>
            <p style={{ marginTop: 2, lineHeight: 1.3 }}>
              <span
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#1a1d2e",
                  fontFamily: "var(--font-mono)",
                }}
              >
                4.9
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#8892a8",
                  fontFamily: "var(--font-mono)",
                }}
              >
                /5
              </span>
            </p>
          </div>
          <span style={{ fontSize: "2.2rem" }}>😊</span>
        </div>

        {/* Card 3 - Case Type */}
        <div
          className="flex flex-col p-5 bg-white border border-[#e2e6ef]"
          style={{ borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <p style={{ fontSize: "0.78rem", color: "#8892a8", fontWeight: 500 }}>Case Type</p>
          <div className="flex items-end gap-3 mt-3 flex-1">
            {barData.map((bar) => (
              <div key={bar.label} className="flex flex-col items-center gap-1">
                <span
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: 600,
                    color: "#1a1d2e",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {bar.value}
                </span>
                <div
                  className="rounded-sm"
                  style={{
                    width: 18,
                    height: bar.maxH,
                    backgroundColor: bar.color,
                    opacity: 0.8,
                    borderRadius: 4,
                  }}
                />
                <span style={{ fontSize: "0.6rem", color: "#8892a8", fontWeight: 500 }}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4 - Avg Review Time */}
        <div
          className="flex items-center justify-between p-5 bg-white border border-[#e2e6ef]"
          style={{ borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <div>
            <p style={{ fontSize: "0.78rem", color: "#8892a8", fontWeight: 500 }}>
              Avg Review Time
            </p>
            <p style={{ marginTop: 2, lineHeight: 1.3 }}>
              <span
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "#1a1d2e",
                  fontFamily: "var(--font-mono)",
                }}
              >
                4.2
              </span>
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#8892a8",
                  marginLeft: 3,
                }}
              >
                min
              </span>
            </p>
          </div>
          <ProgressRing />
        </div>
      </div>
    </div>
  );
}
