import { MapPin } from "lucide-react";

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

/* ─── Demographic pyramid data ─── */

const ageGroups = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const maleData = [12, 28, 35, 22, 14, 6];
const femaleData = [10, 24, 30, 18, 11, 4];
const maxDemo = Math.max(...maleData, ...femaleData);

/* ─── Location data ─── */

const cities = [
  { name: "Riyadh", patients: 312, pct: 42 },
  { name: "Jeddah", patients: 186, pct: 25 },
  { name: "Dammam", patients: 97, pct: 13 },
  { name: "Makkah", patients: 56, pct: 8 },
  { name: "Madinah", patients: 48, pct: 6 },
  { name: "Other", patients: 45, pct: 6 },
];

export function TabPatients() {
  return (
    <div className="px-8 mt-6 pb-8 flex flex-col gap-5">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Active Subscriptions
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#16a34a", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            648
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>currently active</p>
        </div>
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Paused Subscriptions
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#ea580c", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            34
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>temporarily paused</p>
        </div>
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Cancelled / Churned
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#dc2626", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            62
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>last 30 days</p>
        </div>
      </div>

      {/* Demographics 2-column */}
      <div className="grid grid-cols-2 gap-4">
        {/* Age & Gender Pyramid */}
        <div style={cardStyle} className="p-5">
          <h4 className="mb-5" style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            Patients by Age &amp; Gender
          </h4>
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "#8892a8" }}>
              <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "#2563eb" }} />Male
            </span>
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "#8892a8" }}>
              <span className="w-2.5 h-2.5 rounded" style={{ backgroundColor: "#e879f9" }} />Female
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {ageGroups.map((age, i) => (
              <div key={age} className="flex items-center gap-3">
                <span className="w-10 text-right shrink-0" style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "#8892a8", fontWeight: 500 }}>
                  {age}
                </span>
                {/* Male bar (right-aligned going left) */}
                <div className="flex-1 flex justify-end">
                  <div
                    className="rounded-l-full"
                    style={{
                      width: `${(maleData[i] / maxDemo) * 100}%`,
                      height: 14,
                      backgroundColor: "#2563eb",
                      opacity: 0.7,
                      minWidth: 8,
                    }}
                  />
                </div>
                {/* Female bar (left-aligned going right) */}
                <div className="flex-1 flex justify-start">
                  <div
                    className="rounded-r-full"
                    style={{
                      width: `${(femaleData[i] / maxDemo) * 100}%`,
                      height: 14,
                      backgroundColor: "#e879f9",
                      opacity: 0.7,
                      minWidth: 8,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div style={cardStyle} className="p-5">
          <h4 className="mb-5" style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            Patients by Location
          </h4>
          <div className="flex flex-col gap-3">
            {cities.map((city) => (
              <div key={city.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-1.5" style={{ fontSize: "0.82rem", fontWeight: 500, color: "#1a1d2e" }}>
                    <MapPin className="w-3.5 h-3.5 text-[#8892a8]" />
                    {city.name}
                  </span>
                  <span style={{ fontSize: "0.72rem", fontFamily: "var(--font-mono)", color: "#8892a8", fontWeight: 500 }}>
                    {city.patients} <span style={{ color: "#c4c9d4" }}>({city.pct}%)</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f3f4f8] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${city.pct}%`, backgroundColor: "#16a34a", opacity: 0.75 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
