import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";

function MiniStatCard({
  value,
  change,
  label,
  onClick,
}: {
  value: string;
  change: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center px-5 py-4 rounded-2xl transition-all hover:scale-[1.02]"
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div className="flex items-baseline gap-2">
        <span
          style={{
            fontSize: "1.6rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            color: "#fff",
          }}
        >
          {value}
        </span>
        <span
          className="flex items-center gap-0.5"
          style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4ade80" }}
        >
          <TrendingUp className="w-3 h-3" />
          {change}
        </span>
      </div>
      <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
        {label}
      </span>
    </div>
  );
}

export function HeroCard() {
  const navigate = useNavigate();

  return (
    <div
      className="mx-8 rounded-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #164e63 100%)",
        padding: "28px 32px",
      }}
    >
      {/* Decorative chart graphic */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ width: 280, height: 120, opacity: 0.25 }}
      >
        <svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 100 Q30 80 60 85 T120 60 T180 45 T240 30 T280 20 V120 H0 Z"
            fill="url(#chartGrad)"
          />
          <path
            d="M0 100 Q30 80 60 85 T120 60 T180 45 T240 30 T280 20"
            stroke="#4ade80"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="grid grid-cols-4 gap-5 relative z-10">
        {/* Col 1 - Main stat */}
        <div className="flex flex-col justify-center">
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
            Your Total Cases
          </span>
          <span
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "var(--font-mono)",
              lineHeight: 1.2,
              marginTop: 4,
            }}
          >
            2,847
          </span>
          <div
            className="flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full self-start"
            style={{ background: "rgba(74, 222, 128, 0.15)" }}
          >
            <TrendingUp className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#4ade80" }}>
              ↑ 15% Average growth
            </span>
          </div>
        </div>

        {/* Col 2-4 — Clickable stat cards */}
        <MiniStatCard
          value="487"
          change="+4.2%"
          label="This Month Cases"
          onClick={() => navigate("/cases")}
        />
        <MiniStatCard
          value="127"
          change="+4.2%"
          label="This Week Cases"
          onClick={() => navigate("/cases")}
        />
        <MiniStatCard
          value="18"
          change="+1.2%"
          label="Today's Cases"
          onClick={() => navigate("/cases")}
        />
      </div>
    </div>
  );
}
