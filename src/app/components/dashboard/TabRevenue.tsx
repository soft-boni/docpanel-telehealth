const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const stackedData = [
  { wl: 42, ed: 28, mh: 15, hair: 10 },
  { wl: 48, ed: 32, mh: 18, hair: 12 },
  { wl: 38, ed: 25, mh: 14, hair: 8 },
  { wl: 55, ed: 35, mh: 20, hair: 14 },
  { wl: 60, ed: 38, mh: 22, hair: 16 },
  { wl: 52, ed: 30, mh: 17, hair: 11 },
  { wl: 58, ed: 36, mh: 21, hair: 15 },
  { wl: 65, ed: 40, mh: 24, hair: 18 },
  { wl: 50, ed: 33, mh: 19, hair: 13 },
  { wl: 45, ed: 27, mh: 16, hair: 9 },
  { wl: 53, ed: 34, mh: 20, hair: 14 },
  { wl: 62, ed: 39, mh: 23, hair: 17 },
];

const categories = [
  { key: "wl" as const, label: "Weight Loss", color: "#16a34a" },
  { key: "ed" as const, label: "ED", color: "#2563eb" },
  { key: "mh" as const, label: "Mental Health", color: "#7c3aed" },
  { key: "hair" as const, label: "Hair Loss", color: "#ea580c" },
];

export function TabRevenue() {
  const maxTotal = Math.max(...stackedData.map((d) => d.wl + d.ed + d.mh + d.hair));

  return (
    <div className="px-8 mt-6 pb-8 flex flex-col gap-5">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Monthly Recurring Revenue
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            247,584
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>SAR / month</p>
        </div>
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Add-on Revenue
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#2563eb", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            18,420
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>Metformin & B12 sales</p>
        </div>
        <div style={{ ...cardStyle, backgroundColor: "#fef2f2" }} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Lost Revenue
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#dc2626", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            4,230
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#dc2626" }}>Failed payments</p>
        </div>
      </div>

      {/* Stacked Bar Chart */}
      <div style={cardStyle} className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            Revenue by Service Category
          </h4>
          <div className="flex items-center gap-4">
            {categories.map((c) => (
              <span key={c.key} className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "#8892a8" }}>
                <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: c.color }} />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-3" style={{ height: 220 }}>
          {stackedData.map((d, i) => {
            const total = d.wl + d.ed + d.mh + d.hair;
            const pct = (total / maxTotal) * 100;
            return (
              <div key={months[i]} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full flex flex-col-reverse rounded-t-lg overflow-hidden"
                  style={{ height: `${pct}%`, minHeight: 20 }}
                >
                  {categories.map((c) => (
                    <div
                      key={c.key}
                      style={{
                        height: `${(d[c.key] / total) * 100}%`,
                        backgroundColor: c.color,
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
                <span className="mt-2" style={{ fontSize: "0.65rem", color: "#8892a8", fontWeight: 500 }}>
                  {months[i]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
