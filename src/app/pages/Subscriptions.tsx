import { Search, ChevronDown, MessageSquare, Pause, RefreshCw } from "lucide-react";

/* ─── Data ─── */

interface Subscription {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  medication: string;
  planLength: string;
  monthlyPrice: string;
  nextRefill: string;
  refillOverdue?: boolean;
  status: "Active" | "Failed" | "Paused" | "Cancelled";
  payment: string;
  paymentOk: boolean;
  rowBg?: string;
}

const subscriptions: Subscription[] = [
  {
    id: "s1",
    name: "Omar Al-Rashid",
    initials: "OR",
    avatarBg: "#16a34a",
    medication: "Semaglutide 1.0mg + Metformin + B12",
    planLength: "12-mo",
    monthlyPrice: "627 SAR/mo",
    nextRefill: "Mar 1",
    status: "Active",
    payment: "✓ Paid",
    paymentOk: true,
  },
  {
    id: "s2",
    name: "Turki Al-Nasser",
    initials: "TN",
    avatarBg: "#dc2626",
    medication: "Finasteride + Minoxidil",
    planLength: "3-mo",
    monthlyPrice: "149 SAR/mo",
    nextRefill: "⚠️ Overdue",
    refillOverdue: true,
    status: "Failed",
    payment: "⚠️ Declined",
    paymentOk: false,
    rowBg: "#fef2f2",
  },
];

const statusConfig: Record<
  Subscription["status"],
  { bg: string; text: string }
> = {
  Active: { bg: "#ecfdf5", text: "#16a34a" },
  Failed: { bg: "#fecaca", text: "#dc2626" },
  Paused: { bg: "rgba(234,88,12,0.1)", text: "#ea580c" },
  Cancelled: { bg: "rgba(136,146,168,0.1)", text: "#8892a8" },
};

/* ─── Helpers ─── */

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

function IconBtn({
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
      title={tooltip}
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e2e6ef] bg-white text-[#8892a8] hover:text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

/* ─── Page ─── */

const headers = [
  "Patient / Medication",
  "Plan",
  "Next Refill",
  "Status",
  "Payment",
  "Actions",
];

export function Subscriptions() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#e2e6ef]">
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>
          Subscriptions
        </h2>

        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#e2e6ef] bg-white"
            style={{ minWidth: 160 }}
          >
            <Search className="w-4 h-4 text-[#8892a8]" />
            <input
              type="text"
              placeholder="Search patient..."
              className="bg-transparent outline-none border-none text-[#8892a8] placeholder-[#8892a8] w-full"
              style={{ fontSize: "0.82rem" }}
            />
          </div>
          <FilterButton label="Status" options={["All Statuses", "Active", "Failed", "Paused", "Cancelled"]} />
          <FilterButton label="Service" options={["All Services", "Weight Loss", "Hair Loss", "ED", "Skincare"]} />
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
          {/* Header Row */}
          <div
            className="grid items-center px-5 py-3"
            style={{
              gridTemplateColumns: "1.5fr 0.8fr 0.7fr 0.6fr 0.6fr 0.5fr",
              backgroundColor: "#f8f9fb",
              borderBottom: "1px solid #e2e6ef",
            }}
          >
            {headers.map((h) => (
              <span
                key={h}
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "#8892a8",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Data Rows */}
          {subscriptions.map((sub, idx) => {
            const sc = statusConfig[sub.status];
            return (
              <div
                key={sub.id}
                className="grid items-center px-5 py-4"
                style={{
                  gridTemplateColumns: "1.5fr 0.8fr 0.7fr 0.6fr 0.6fr 0.5fr",
                  backgroundColor: sub.rowBg ?? "#fff",
                  borderBottom:
                    idx < subscriptions.length - 1
                      ? "1px solid #e2e6ef"
                      : "none",
                }}
              >
                {/* Patient / Medication */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{
                      backgroundColor: sub.avatarBg,
                      fontSize: "0.68rem",
                      fontWeight: 600,
                    }}
                  >
                    {sub.initials}
                  </div>
                  <div className="min-w-0">
                    <p
                      className="truncate"
                      style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}
                    >
                      {sub.name}
                    </p>
                    <p
                      className="truncate"
                      style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 1 }}
                    >
                      {sub.medication}
                    </p>
                  </div>
                </div>

                {/* Plan */}
                <div>
                  <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
                    {sub.planLength}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 1 }}>
                    {sub.monthlyPrice}
                  </p>
                </div>

                {/* Next Refill */}
                <span
                  style={{
                    fontSize: "0.84rem",
                    fontWeight: sub.refillOverdue ? 700 : 400,
                    color: sub.refillOverdue ? "#dc2626" : "#1a1d2e",
                  }}
                >
                  {sub.nextRefill}
                </span>

                {/* Status */}
                <div>
                  <span
                    className="inline-block px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: sc.bg,
                      color: sc.text,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                    }}
                  >
                    {sub.status}
                  </span>
                </div>

                {/* Payment */}
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: sub.paymentOk ? "#16a34a" : "#dc2626",
                  }}
                >
                  {sub.payment}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  {sub.status === "Failed" ? (
                    <IconBtn icon={RefreshCw} tooltip="Retry" />
                  ) : (
                    <IconBtn icon={Pause} tooltip="Pause" />
                  )}
                  <IconBtn
                    icon={MessageSquare}
                    tooltip="Message"
                    onClick={() => window.location.href = '/messages'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
