import { FileText, FlaskConical, Truck, PackageCheck, Clock, CheckCircle } from "lucide-react";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const funnelSteps = [
  { icon: FileText, label: "Prescribed", value: "482", color: "#2563eb" },
  { icon: FlaskConical, label: "Dispensing", value: "468", color: "#7c3aed" },
  { icon: Truck, label: "Shipped", value: "452", color: "#ea580c" },
  { icon: PackageCheck, label: "Delivered", value: "441", color: "#16a34a" },
];

const slaRows = [
  { stage: "Approved → Dispensing", avgTime: "2.1 hrs", onTimePct: 99 },
  { stage: "Dispensing → Shipped", avgTime: "8.4 hrs", onTimePct: 97 },
  { stage: "Shipped → Delivered", avgTime: "13.5 hrs", onTimePct: 94 },
  { stage: "Total: Approved → Delivered", avgTime: "24 hrs", onTimePct: 91, highlight: true },
];

export function TabFulfillment() {
  return (
    <div className="px-8 mt-6 pb-8 flex flex-col gap-5">
      {/* Top Metrics — Funnel */}
      <div className="grid grid-cols-4 gap-4">
        {funnelSteps.map((step, i) => (
          <div key={step.label} style={cardStyle} className="p-5 flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${step.color}14` }}
            >
              <step.icon className="w-5 h-5" style={{ color: step.color }} />
            </div>
            <div>
              <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {step.label}
              </span>
              <p className="mt-0.5" style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
                {step.value}
              </p>
              {i > 0 && (
                <p className="mt-0.5" style={{ fontSize: "0.68rem", color: "#8892a8" }}>
                  {((parseInt(step.value) / parseInt(funnelSteps[0].value)) * 100).toFixed(1)}% of prescribed
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SLA Performance */}
      <div style={cardStyle} className="overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e2e6ef] flex items-center justify-between">
          <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            Pharmacy SLA Performance
          </h4>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#16a34a]" />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#16a34a" }}>
              91% orders within 24h
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          {slaRows.map((row) => (
            <div
              key={row.stage}
              className={`flex items-center gap-4 px-5 py-4 ${
                row.highlight ? "bg-[#ecfdf5]" : "border-b border-[#e2e6ef] last:border-b-0"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p style={{
                  fontSize: "0.84rem",
                  fontWeight: row.highlight ? 600 : 500,
                  color: "#1a1d2e",
                }}>
                  {row.stage}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0" style={{ width: 100 }}>
                <Clock className="w-3.5 h-3.5 text-[#8892a8]" />
                <span style={{
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  fontFamily: "var(--font-mono)",
                  color: "#1a1d2e",
                }}>
                  {row.avgTime}
                </span>
              </div>

              <div className="flex items-center gap-2.5 shrink-0" style={{ width: 200 }}>
                <div className="flex-1 h-2.5 rounded-full bg-[#f3f4f8] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${row.onTimePct}%`,
                      backgroundColor: row.onTimePct >= 95 ? "#16a34a" : row.onTimePct >= 90 ? "#ea580c" : "#dc2626",
                    }}
                  />
                </div>
                <span style={{
                  fontSize: "0.76rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: row.onTimePct >= 95 ? "#16a34a" : row.onTimePct >= 90 ? "#ea580c" : "#dc2626",
                  minWidth: 36,
                  textAlign: "right",
                }}>
                  {row.onTimePct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
