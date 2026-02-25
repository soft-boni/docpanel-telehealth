const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

/* ─── Area chart data (30 days) ─── */

function generatePoints(seed: number[], max: number) {
  return seed.map((v, i) => ({
    x: (i / (seed.length - 1)) * 100,
    y: 100 - (v / max) * 80 - 10,
  }));
}

const urgentRaw = [3, 5, 2, 6, 4, 7, 3, 5, 8, 4, 6, 3, 5, 7, 4, 6, 8, 5, 3, 7, 4, 6, 5, 8, 3, 5, 7, 4, 6, 5];
const titrationRaw = [8, 10, 7, 12, 9, 11, 8, 13, 10, 9, 11, 7, 10, 12, 9, 11, 14, 10, 8, 12, 9, 11, 10, 13, 8, 10, 12, 9, 11, 10];
const pendingRaw = [5, 7, 4, 8, 6, 9, 5, 7, 10, 6, 8, 5, 7, 9, 6, 8, 11, 7, 5, 9, 6, 8, 7, 10, 5, 7, 9, 6, 8, 7];

const maxVal = 16;

function toPath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
}

function toAreaPath(points: { x: number; y: number }[]) {
  const line = toPath(points);
  return `${line} L100,100 L0,100 Z`;
}

export function TabCases() {
  const urgentPts = generatePoints(urgentRaw, maxVal);
  const titrationPts = generatePoints(titrationRaw, maxVal);
  const pendingPts = generatePoints(pendingRaw, maxVal);

  return (
    <div className="px-8 mt-6 pb-8 flex flex-col gap-5">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-4">
        {/* Approved */}
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Approved
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#16a34a", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            75%
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>of cases</p>
        </div>
        {/* Modified */}
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Modified
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#ea580c", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            15%
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>of cases</p>
        </div>
        {/* Declined */}
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Declined
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#dc2626", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            10%
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>of cases</p>
        </div>
      </div>

      {/* Area Chart */}
      <div style={cardStyle} className="p-5">
        <div className="flex items-center justify-between mb-5">
          <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            Case Volume — Last 30 Days
          </h4>
          <div className="flex items-center gap-4">
            {[
              { color: "#dc2626", label: "Urgent" },
              { color: "#7c3aed", label: "Titration" },
              { color: "#ea580c", label: "Pending" },
            ].map((l) => (
              <span key={l.label} className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "#8892a8" }}>
                <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height: 200 }}>
          <defs>
            <linearGradient id="urgentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="titrationGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="pendingGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ea580c" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Areas */}
          <path d={toAreaPath(titrationPts)} fill="url(#titrationGrad)" />
          <path d={toAreaPath(pendingPts)} fill="url(#pendingGrad)" />
          <path d={toAreaPath(urgentPts)} fill="url(#urgentGrad)" />
          {/* Lines */}
          <path d={toPath(titrationPts)} fill="none" stroke="#7c3aed" strokeWidth="0.6" />
          <path d={toPath(pendingPts)} fill="none" stroke="#ea580c" strokeWidth="0.6" />
          <path d={toPath(urgentPts)} fill="none" stroke="#dc2626" strokeWidth="0.6" />
        </svg>

        <div className="flex justify-between mt-2 px-1">
          {["Day 1", "", "", "", "", "", "Day 10", "", "", "", "", "", "Day 20", "", "", "", "", "", "Day 30"].map((d, i) => (
            <span key={i} style={{ fontSize: "0.6rem", color: "#8892a8", fontFamily: "var(--font-mono)" }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
