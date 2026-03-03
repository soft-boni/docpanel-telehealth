import { Search, ChevronDown, MessageSquare, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router";

/* ─── Data ─── */

interface Patient {
  id: string;
  name: string;
  age: number;
  service: string;
  status: "Active" | "Paused" | "Cancelled";
  medication: string;
  nextRefill: string;
  refillOverdue?: boolean;
}

const patients: Patient[] = [
  {
    id: "p-101",
    name: "Omar Al-Rashid",
    age: 42,
    service: "Weight Loss",
    status: "Active",
    medication: "Semaglutide 1.0mg",
    nextRefill: "Mar 1",
  },
  {
    id: "p-102",
    name: "Turki Al-Nasser",
    age: 28,
    service: "Hair Loss",
    status: "Paused",
    medication: "Finasteride",
    nextRefill: "Overdue",
    refillOverdue: true,
  },
  {
    id: "p-103",
    name: "Ahmed M.",
    age: 34,
    service: "ED",
    status: "Cancelled",
    medication: "None",
    nextRefill: "N/A",
  },
];

const statusConfig: Record<
  Patient["status"],
  { emoji: string; bg: string; text: string }
> = {
  Active: { emoji: "🟢", bg: "rgba(22,163,74,0.1)", text: "#16a34a" },
  Paused: { emoji: "🟡", bg: "rgba(234,88,12,0.1)", text: "#ea580c" },
  Cancelled: { emoji: "⚪", bg: "rgba(136,146,168,0.1)", text: "#8892a8" },
};

/* ─── Sub-components ─── */

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

function ActionBtn({
  icon: Icon,
  tooltip,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e2e6ef] bg-white text-[#8892a8] hover:text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

/* ─── Page ─── */

export function PatientDatabase() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#e2e6ef]">
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>
          Patients
        </h2>

        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#e2e6ef] bg-white"
            style={{ minWidth: 160 }}
          >
            <Search className="w-4 h-4 text-[#8892a8]" />
            <input
              type="text"
              placeholder="Search by name..."
              className="bg-transparent outline-none border-none text-[#8892a8] placeholder-[#8892a8] w-full"
              style={{ fontSize: "0.82rem" }}
            />
          </div>

          <FilterButton label="Service" options={[
            "All Services",
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
          <FilterButton label="Status" options={["All Statuses", "Active", "Paused", "Cancelled"]} />
        </div>
      </div>

      {/* Table */}
      <div className="p-8">
        <div
          className="bg-white overflow-hidden"
          style={{
            border: "1px solid #e2e6ef",
            borderRadius: 14,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <table className="w-full" style={{ fontSize: "0.84rem" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fb" }}>
                {[
                  "Patient Name",
                  "Age",
                  "Service",
                  "Status",
                  "Current Medication",
                  "Next Refill",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3"
                    style={{
                      fontWeight: 600,
                      color: "#8892a8",
                      fontSize: "0.68rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => {
                const sc = statusConfig[p.status];
                return (
                  <tr
                    key={p.id}
                    className="border-t border-[#e2e6ef] hover:bg-[#fafbfc] transition-colors cursor-pointer"
                    onClick={() => navigate(`/patients/${p.id}`)}
                  >
                    {/* Name */}
                    <td className="px-5 py-4">
                      <span style={{ fontWeight: 600, color: "#1a1d2e" }}>
                        {p.name}
                      </span>
                    </td>

                    {/* Age */}
                    <td
                      className="px-5 py-4"
                      style={{ fontFamily: "var(--font-mono)", color: "#1a1d2e" }}
                    >
                      {p.age}
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4" style={{ color: "#1a1d2e" }}>
                      {p.service}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: sc.bg,
                          color: sc.text,
                          fontSize: "0.72rem",
                          fontWeight: 600,
                        }}
                      >
                        {sc.emoji} {p.status}
                      </span>
                    </td>

                    {/* Medication */}
                    <td className="px-5 py-4" style={{ color: "#1a1d2e" }}>
                      {p.medication}
                    </td>

                    {/* Next Refill */}
                    <td
                      className="px-5 py-4"
                      style={{
                        color: p.refillOverdue ? "#dc2626" : "#1a1d2e",
                        fontWeight: p.refillOverdue ? 600 : 400,
                      }}
                    >
                      {p.nextRefill}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div
                        className="flex items-center gap-1.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ActionBtn
                          icon={MessageSquare}
                          tooltip="Message"
                          onClick={() => navigate("/messages")}
                        />
                        <ActionBtn
                          icon={Eye}
                          tooltip="View Case"
                          onClick={() => navigate(`/patients/${p.id}`)}
                        />
                        <ActionBtn icon={FileText} tooltip="Export Summary" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
