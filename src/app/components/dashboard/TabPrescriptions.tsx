const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const prescriptionRows = [
  { name: "Generic Semaglutide", category: "GLP-1 Injectable", total: 156, pct: 32.4, color: "#16a34a", initial: "S" },
  { name: "Tadalafil Daily 5mg", category: "ED Medication", total: 89, pct: 18.5, color: "#2563eb", initial: "T" },
  { name: "Escitalopram 10mg", category: "Mental Health", total: 67, pct: 13.9, color: "#7c3aed", initial: "E" },
  { name: "Sildenafil 50mg", category: "ED Medication", total: 54, pct: 11.2, color: "#ea580c", initial: "Si" },
  { name: "Metformin 500mg", category: "Metabolic", total: 42, pct: 8.7, color: "#0891b2", initial: "M" },
  { name: "Finasteride 1mg", category: "Hair Loss", total: 38, pct: 7.9, color: "#ca8a04", initial: "F" },
  { name: "Minoxidil Topical", category: "Hair Loss", total: 21, pct: 4.4, color: "#ca8a04", initial: "Mi" },
  { name: "Vitamin B12 Inject.", category: "Supplement", total: 15, pct: 3.1, color: "#64748b", initial: "B" },
];

export function TabPrescriptions() {
  return (
    <div className="px-8 mt-6 pb-8 flex flex-col gap-5">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Total E-Prescriptions Sent
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#1a1d2e", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            482
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>this month</p>
        </div>
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Highest Volume Drug
          </span>
          <p className="mt-2" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#16a34a", lineHeight: 1.2 }}>
            Generic Semaglutide
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>156 prescriptions</p>
        </div>
        <div style={cardStyle} className="p-5">
          <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Add-on Attachment Rate
          </span>
          <p className="mt-2" style={{ fontSize: "2rem", fontWeight: 700, color: "#2563eb", fontFamily: "var(--font-mono)", lineHeight: 1 }}>
            34%
          </p>
          <p className="mt-1" style={{ fontSize: "0.76rem", color: "#8892a8" }}>cases with add-ons</p>
        </div>
      </div>

      {/* Data Table */}
      <div style={cardStyle} className="overflow-hidden">
        <div className="px-5 py-4 border-b border-[#e2e6ef]">
          <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1a1d2e" }}>
            Prescription Breakdown
          </h4>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-[#e2e6ef]">
              {["Drug Name", "Category", "Total Prescribed", "% of Total Volume"].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left"
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "#8892a8",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {prescriptionRows.map((rx) => (
              <tr key={rx.name} className="border-b border-[#e2e6ef] last:border-b-0 hover:bg-[#f8f9fb] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: rx.color, fontSize: "0.62rem", fontWeight: 600 }}
                    >
                      {rx.initial}
                    </div>
                    <span style={{ fontSize: "0.84rem", fontWeight: 500, color: "#1a1d2e" }}>
                      {rx.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full"
                    style={{ fontSize: "0.72rem", fontWeight: 500, color: "#8892a8", backgroundColor: "#f3f4f8" }}
                  >
                    {rx.category}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e", fontFamily: "var(--font-mono)" }}>
                    {rx.total}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-2 rounded-full bg-[#f3f4f8] overflow-hidden" style={{ maxWidth: 100 }}>
                      <div className="h-full rounded-full" style={{ width: `${rx.pct}%`, backgroundColor: rx.color, opacity: 0.75 }} />
                    </div>
                    <span style={{ fontSize: "0.76rem", fontFamily: "var(--font-mono)", color: "#8892a8", fontWeight: 500, minWidth: 38, textAlign: "right" }}>
                      {rx.pct}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
