import { ChevronDown, TrendingUp, Check } from "lucide-react";

/* ─── Shared ─── */

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

function FilterButton({ label, options = ["All"] }: { label: string, options?: string[] }) {
  return (
    <div className="relative">
      <select
        className="appearance-none flex items-center gap-1.5 pl-3.5 pr-8 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors cursor-pointer outline-none focus:border-[#2563eb]"
        style={{ fontSize: "0.82rem", fontWeight: 500 }}
      >
        <option value="" disabled selected hidden>{label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8892a8] pointer-events-none" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mb-4"
      style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a1d2e" }}
    >
      {children}
    </h3>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — Provider Performance
   ═══════════════════════════════════════════ */

function CasesPerMonth() {
  return (
    <div style={cardStyle} className="p-5 flex flex-col justify-between">
      <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Cases / month
      </span>
      <div className="flex items-end gap-2 mt-3">
        <span style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
          487
        </span>
        <span className="flex items-center gap-0.5 mb-1" style={{ fontSize: "0.72rem", fontWeight: 600, color: "#16a34a" }}>
          <TrendingUp className="w-3.5 h-3.5" /> +12%
        </span>
      </div>
    </div>
  );
}

function AvgReviewTime() {
  // Mini sparkline via SVG
  const points = [18, 22, 16, 20, 14, 12, 10, 13, 9, 8];
  const max = 24;
  const w = 120;
  const h = 36;
  const pathD = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - (p / max) * h;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <div style={cardStyle} className="p-5 flex flex-col justify-between">
      <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Avg review time
      </span>
      <div className="flex items-end justify-between mt-3">
        <span style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
          4.2<span style={{ fontSize: "0.9rem", fontWeight: 500 }}> min</span>
        </span>
        <svg width={w} height={h} className="mb-1">
          <path d={pathD} fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function ApprovalRate() {
  const segments = [
    { pct: 75, color: "#16a34a", label: "Approve" },
    { pct: 15, color: "#ea580c", label: "Modify" },
    { pct: 10, color: "#dc2626", label: "Decline" },
  ];

  return (
    <div style={cardStyle} className="p-5 flex flex-col justify-between">
      <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Approval vs decline rate
      </span>
      {/* Bar */}
      <div className="flex rounded-full overflow-hidden mt-3 mb-2" style={{ height: 10 }}>
        {segments.map((s) => (
          <div key={s.label} style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3">
        {segments.map((s) => (
          <span key={s.label} className="flex items-center gap-1" style={{ fontSize: "0.68rem", color: "#8892a8" }}>
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.pct}% {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function MostPrescribed() {
  const drugs = ["Generic Semaglutide", "Tadalafil", "Escitalopram"];
  return (
    <div style={cardStyle} className="p-5 flex flex-col">
      <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
        Most prescribed drugs
      </span>
      <div className="flex flex-col gap-2">
        {drugs.map((d, i) => (
          <div key={d} className="flex items-center gap-2.5">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: i === 0 ? "#16a34a" : "#f3f4f8",
                color: i === 0 ? "#fff" : "#8892a8",
                fontSize: "0.6rem",
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: "0.82rem", fontWeight: i === 0 ? 600 : 400, color: "#1a1d2e" }}>
              {d}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — Revenue Breakdown
   ═══════════════════════════════════════════ */

function RevenueByCategory() {
  const slices = [
    { label: "Weight Loss", pct: 55, color: "#16a34a", amount: "312K" },
    { label: "ED", pct: 30, color: "#2563eb", amount: "170K" },
    { label: "Hair Loss", pct: 15, color: "#ea580c", amount: "85K" },
  ];

  // Build conic-gradient
  let acc = 0;
  const stops = slices.map((s) => {
    const from = acc;
    acc += s.pct;
    return `${s.color} ${from}% ${acc}%`;
  });

  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 20 }}>
        Revenue by category
      </h4>
      <div className="flex items-center gap-8">
        {/* Doughnut */}
        <div className="relative shrink-0" style={{ width: 130, height: 130 }}>
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `conic-gradient(${stops.join(", ")})`,
            }}
          />
          <div
            className="absolute rounded-full bg-white flex items-center justify-center"
            style={{
              width: 70,
              height: 70,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)" }}>
              567K
            </span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-3 flex-1">
          {slices.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="flex items-center gap-2" style={{ fontSize: "0.82rem", color: "#1a1d2e" }}>
                <span className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-mono)", color: "#1a1d2e" }}>
                {s.amount} SAR
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RevenueByPlan() {
  const plans = [
    { label: "1-mo", value: 142, color: "#2563eb" },
    { label: "3-mo", value: 205, color: "#7c3aed" },
    { label: "6-mo", value: 98, color: "#ea580c" },
    { label: "12-mo", value: 122, color: "#16a34a" },
  ];
  const maxVal = Math.max(...plans.map((p) => p.value));

  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 20 }}>
        Revenue by plan length
      </h4>
      <div className="flex items-end gap-5" style={{ height: 140 }}>
        {plans.map((p) => {
          const pct = (p.value / maxVal) * 100;
          return (
            <div key={p.label} className="flex-1 flex flex-col items-center gap-1.5">
              <span style={{ fontSize: "0.68rem", fontWeight: 600, fontFamily: "var(--font-mono)", color: "#1a1d2e" }}>
                {p.value}K
              </span>
              <div
                className="w-full rounded-t-lg"
                style={{
                  height: `${pct}%`,
                  minHeight: 12,
                  backgroundColor: p.color,
                  opacity: 0.85,
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <span style={{ fontSize: "0.68rem", color: "#8892a8", fontWeight: 500 }}>
                {p.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AvgRevenuePerPatient() {
  return (
    <div style={cardStyle} className="p-5 flex items-center justify-between">
      <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e" }}>
        Avg revenue per patient
      </span>
      <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#16a34a", fontFamily: "var(--font-mono)" }}>
        627 <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#8892a8" }}>SAR</span>
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — Patient Metrics
   ═══════════════════════════════════════════ */

function MetricCard({
  label,
  value,
  color,
  suffix,
}: {
  label: string;
  value: string;
  color?: string;
  suffix?: string;
}) {
  return (
    <div style={cardStyle} className="p-5 flex flex-col items-center justify-center text-center">
      <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>
        {label}
      </span>
      <span style={{ fontSize: "1.8rem", fontWeight: 700, color: color ?? "#1a1d2e", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
        {value}
      </span>
      {suffix && (
        <span style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 4 }}>{suffix}</span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — AI & Fulfillment
   ═══════════════════════════════════════════ */

function AIAccuracy() {
  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 4 }}>
        AI accuracy
      </h4>
      <p style={{ fontSize: "0.76rem", color: "#8892a8", marginBottom: 18 }}>
        How often doctor agreed with AI suggestion
      </p>
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: "conic-gradient(#16a34a 0% 92%, #e2e6ef 92% 100%)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
          >
            <Check className="w-6 h-6 text-[#16a34a]" strokeWidth={3} />
          </div>
        </div>
        <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#16a34a", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
          92%
        </span>
      </div>
    </div>
  );
}

function FulfillmentOps() {
  return (
    <div style={cardStyle} className="p-5">
      <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e", marginBottom: 16 }}>
        Fulfillment
      </h4>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ backgroundColor: "#f3f4f8" }}>
          <div>
            <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Avg time: approval → delivery
            </span>
          </div>
          <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)" }}>
            24<span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#8892a8" }}> hrs</span>
          </span>
        </div>
        <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{ backgroundColor: "#f3f4f8" }}>
          <div>
            <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Pharmacy performance
            </span>
          </div>
          <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#16a34a", fontFamily: "var(--font-mono)" }}>
            99%<span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#8892a8" }}> on-time</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export function Analytics() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#e2e6ef]">
        <div className="flex items-center gap-2.5">
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>Analytics</h2>
          <span
            className="px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(136,146,168,0.12)",
              color: "#8892a8",
              fontSize: "0.65rem",
              fontWeight: 600,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.03em",
            }}
          >
            P2 Beta
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <FilterButton label="Last 30 Days" options={["Last 7 Days", "Last 30 Days", "Last 3 Months", "This Year"]} />
          <FilterButton label="Service Category" options={[
            "All Categories",
            "Weight Loss",
            "Hair Loss",
            "Hair Regrowth",
            "Testosterone",
            "Mental Health",
            "Sexual Health",
            "Grow Fuller Hair",
            "Relieve Menopause",
            "Ease Menopause",
            "Reduce Anxiety"
          ]} />
        </div>
      </div>

      <div className="px-8 pt-6 pb-10 flex flex-col gap-8">
        {/* ── Section 2: Provider Performance ── */}
        <div>
          <SectionTitle>Provider Performance</SectionTitle>
          <div className="grid grid-cols-4 gap-4">
            <CasesPerMonth />
            <AvgReviewTime />
            <ApprovalRate />
            <MostPrescribed />
          </div>
        </div>

        {/* ── Section 3: Revenue Breakdown ── */}
        <div>
          <SectionTitle>Revenue Breakdown</SectionTitle>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <RevenueByCategory />
            <RevenueByPlan />
          </div>
          <AvgRevenuePerPatient />
        </div>

        {/* ── Section 4: Patient Metrics ── */}
        <div>
          <SectionTitle>Patient Metrics</SectionTitle>
          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="Retention rate" value="88%" color="#16a34a" />
            <MetricCard label="Churn rate" value="12%" color="#dc2626" />
            <MetricCard label="Avg weight loss / mo" value="2.4" color="#2563eb" suffix="kg" />
            <MetricCard label="Satisfaction" value="4.9" color="#ea580c" suffix="/ 5" />
          </div>
        </div>

        {/* ── Section 5: AI & Fulfillment ── */}
        <div>
          <SectionTitle>Operations: AI &amp; Fulfillment</SectionTitle>
          <div className="grid grid-cols-2 gap-4">
            <AIAccuracy />
            <FulfillmentOps />
          </div>
        </div>
      </div>
    </div>
  );
}
