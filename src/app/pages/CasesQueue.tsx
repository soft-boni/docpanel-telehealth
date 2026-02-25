import { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { casesData, flagConfig, type CaseData } from "../data/mockData";

/* ─── Types ─── */

interface QueueSection {
  flag: "red" | "purple" | "yellow" | "green";
  cases: CaseData[];
}

/* Build sections from mock data */
const sectionOrder: QueueSection["flag"][] = ["red", "purple", "yellow", "green"];

const sections: QueueSection[] = sectionOrder
  .map((flag) => ({
    flag,
    cases: casesData.filter((c) => c.flag === flag),
  }))
  .filter((s) => s.cases.length > 0);

/* ─── Helpers ─── */

function highlightDose(text: string) {
  const match = text.match(/(.*→\s*)(\S+)/);
  if (!match) return <span>{text}</span>;
  return (
    <span>
      {match[1]}
      <span style={{ color: "#7c3aed", fontWeight: 600 }}>{match[2]}</span>
    </span>
  );
}

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

/* ─── Row ─── */

function CaseRowItem({
  caseItem,
  isLast,
}: {
  caseItem: CaseData;
  isLast: boolean;
}) {
  const navigate = useNavigate();
  const cfg = flagConfig[caseItem.flag];

  return (
    <div
      onClick={() => navigate(`/cases/${caseItem.id}`)}
      className={`flex items-center gap-4 px-5 py-3.5 ${!isLast ? "border-b border-[#e2e6ef]" : ""
        } hover:bg-[#fafbfc] transition-colors cursor-pointer`}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
        style={{
          backgroundColor: cfg.color,
          fontSize: "0.72rem",
          fontWeight: 600,
        }}
      >
        {caseItem.initials}
      </div>

      {/* Info */}
      <div className="min-w-[140px]">
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1a1d2e" }}>
          {caseItem.patientName}
        </p>
        <p style={{ fontSize: "0.75rem", color: "#8892a8" }}>
          <span style={{ fontFamily: "var(--font-mono)" }}>{caseItem.caseId}</span>
          {" · "}
          {caseItem.type}
        </p>
      </div>

      {/* Alert */}
      <div className="flex-1 min-w-0">
        <p
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color:
              caseItem.flag === "green"
                ? "#16a34a"
                : caseItem.flag === "purple"
                  ? "#1a1d2e"
                  : cfg.color,
          }}
        >
          {caseItem.flag === "purple" ? highlightDose(caseItem.alert) : caseItem.alert}
          {caseItem.flag === "red" && <span className="ml-1">🔴</span>}
        </p>
      </div>

      {/* Badge */}
      <span
        className="px-2.5 py-1 rounded-full shrink-0"
        style={{
          backgroundColor: cfg.badgeBg,
          color: cfg.color,
          fontSize: "0.68rem",
          fontWeight: 700,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.03em",
        }}
      >
        {cfg.badge}
      </span>

      {/* Timer or Status */}
      {caseItem.timer && (
        <span
          className="shrink-0"
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            color: caseItem.isUrgent ? "#dc2626" : "#8892a8",
            minWidth: 80,
            textAlign: "right",
          }}
        >
          {caseItem.timer}
        </span>
      )}
      {caseItem.status && (
        <span
          className="shrink-0"
          style={{
            fontSize: "0.78rem",
            color: "#8892a8",
            minWidth: 90,
            textAlign: "right",
          }}
        >
          {caseItem.status}
        </span>
      )}
    </div>
  );
}

/* ─── Collapsible Section ─── */

function QueueCard({ section }: { section: QueueSection }) {
  const [collapsed, setCollapsed] = useState(false);
  const cfg = flagConfig[section.flag];

  return (
    <div
      className="bg-white overflow-hidden"
      style={{
        border: `1px solid ${cfg.border}`,
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      {/* Clickable Header */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors hover:opacity-90"
        style={{ backgroundColor: cfg.bg }}
      >
        <p className="flex items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 700, color: cfg.color }}>
          {collapsed ? (
            <ChevronRight className="w-4 h-4 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0" />
          )}
          {cfg.emoji} {cfg.sectionTitle}
        </p>
        <span style={{ fontSize: "0.78rem", color: "#8892a8", fontWeight: 500 }}>
          {section.cases.length} {section.cases.length === 1 ? "case" : "cases"}
        </span>
      </button>

      {/* Collapsible Rows */}
      {!collapsed &&
        section.cases.map((caseItem, idx) => (
          <CaseRowItem
            key={caseItem.id}
            caseItem={caseItem}
            isLast={idx === section.cases.length - 1}
          />
        ))}
    </div>
  );
}

/* ─── Page ─── */

export function CasesQueue() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#e2e6ef]">
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>
          Cases
        </h2>

        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#e2e6ef] bg-white"
            style={{ minWidth: 160 }}
          >
            <Search className="w-4 h-4 text-[#8892a8]" />
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="bg-transparent outline-none border-none text-[#8892a8] placeholder-[#8892a8] w-full"
              style={{ fontSize: "0.82rem" }}
            />
          </div>

          <FilterButton label="Priority" options={["All Priorities", "Urgent", "High", "Normal"]} />
          <FilterButton label="Service" options={["All Services", "Weight Loss", "Hair Loss", "ED", "Skincare"]} />
          <FilterButton label="Status" options={["All Statuses", "Pending Review", "Needs Follow-up"]} />
        </div>
      </div>

      {/* Queue Sections */}
      <div className="p-8">
        {sections.map((section) => (
          <QueueCard key={section.flag} section={section} />
        ))}
      </div>
    </div>
  );
}
