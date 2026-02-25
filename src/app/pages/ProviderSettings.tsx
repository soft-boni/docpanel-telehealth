import { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Bell,
  Clock,
  Shield,
  Globe,
  FileText,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  X
} from "lucide-react";

/* ─── Types & Data ─── */

type TabId =
  | "profile"
  | "notifications"
  | "availability"
  | "security"
  | "language"
  | "templates";

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  beta?: boolean;
}

const tabs: Tab[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "availability", label: "Availability", icon: Clock },
  { id: "security", label: "Security", icon: Shield },
  { id: "language", label: "Language", icon: Globe, beta: true },
  { id: "templates", label: "Quick Templates", icon: FileText, beta: true },
];

/* ─── Shared UI ─── */

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e2e6ef",
  borderRadius: 14,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

function SectionHeader({
  title,
  beta,
}: {
  title: string;
  beta?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1a1d2e" }}>
        {title}
      </h3>
      {beta && (
        <span
          className="px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(136,146,168,0.12)",
            color: "#8892a8",
            fontSize: "0.62rem",
            fontWeight: 600,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.03em",
          }}
        >
          P2
        </span>
      )}
    </div>
  );
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label
      className="block mb-1.5"
      style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1a1d2e" }}
    >
      {children}
    </label>
  );
}

function TextInput({
  placeholder,
  defaultValue,
  type = "text",
}: {
  placeholder?: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] placeholder-[#8892a8] outline-none focus:border-[#2563eb] transition-colors"
      style={{ fontSize: "0.84rem" }}
    />
  );
}

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-[22px] rounded-full shrink-0 transition-colors"
      style={{ backgroundColor: enabled ? "#16a34a" : "#d1d5db" }}
    >
      <div
        className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all"
        style={{ left: enabled ? 20 : 2 }}
      />
    </button>
  );
}

function SaveButton() {
  return (
    <button
      onClick={() => toast.success("Settings saved successfully")}
      className="mt-6 px-6 py-2.5 rounded-xl text-white transition-opacity hover:opacity-90"
      style={{
        backgroundColor: "#16a34a",
        fontSize: "0.84rem",
        fontWeight: 600,
      }}
    >
      Save Changes
    </button>
  );
}

/* ═══════════════════════════════════════════
   TAB CONTENT PANELS
   ═══════════════════════════════════════════ */

function ProfilePanel() {
  return (
    <div>
      <SectionHeader title="Profile" />
      <div style={cardStyle} className="p-6">
        {/* Photo */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shrink-0"
            style={{
              background: "linear-gradient(135deg, #16a34a, #15803d)",
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            DA
          </div>
          <div>
            <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1a1d2e" }}>
              Dr. Alharbi
            </p>
            <button
              className="mt-1 text-[#2563eb] hover:underline"
              style={{ fontSize: "0.78rem", fontWeight: 500 }}
            >
              Upload photo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <FormLabel>Full Name</FormLabel>
            <TextInput defaultValue="Dr. Abdullah Alharbi" />
          </div>
          <div>
            <FormLabel>Email</FormLabel>
            <TextInput defaultValue="dr.alharbi@evira.sa" type="email" />
          </div>
          <div>
            <FormLabel>Phone</FormLabel>
            <TextInput defaultValue="+966 55 123 4567" type="tel" />
          </div>
          <div>
            <FormLabel>SCFHS License No.</FormLabel>
            <TextInput defaultValue="SCFHS-2024-08172" />
          </div>
        </div>

        <SaveButton />
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const [toggles, setToggles] = useState<Record<string, Record<string, boolean>>>({
    urgent: { sms: true, email: true },
    message: { sms: true, email: false },
    titration: { sms: false, email: true },
    payment: { sms: true, email: true },
  });

  const events = [
    { id: "urgent", label: "New urgent case" },
    { id: "message", label: "New message" },
    { id: "titration", label: "Titration due" },
    { id: "payment", label: "Payment failure" },
  ];

  const toggle = (eventId: string, channel: string) => {
    setToggles((prev) => ({
      ...prev,
      [eventId]: { ...prev[eventId], [channel]: !prev[eventId][channel] },
    }));
  };

  return (
    <div>
      <SectionHeader title="Notifications" />
      <div style={cardStyle} className="p-6">
        <h4
          className="mb-5"
          style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e" }}
        >
          Alert Preferences
        </h4>

        {/* Header row */}
        <div className="grid items-center mb-3" style={{ gridTemplateColumns: "1fr 80px 80px" }}>
          <span />
          <span
            className="text-center"
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#8892a8",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontFamily: "var(--font-mono)",
            }}
          >
            SMS
          </span>
          <span
            className="text-center"
            style={{
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#8892a8",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              fontFamily: "var(--font-mono)",
            }}
          >
            Email
          </span>
        </div>

        {events.map((ev, i) => (
          <div
            key={ev.id}
            className={`grid items-center py-3.5 ${i < events.length - 1 ? "border-b border-[#e2e6ef]" : ""
              }`}
            style={{ gridTemplateColumns: "1fr 80px 80px" }}
          >
            <span style={{ fontSize: "0.84rem", color: "#1a1d2e", fontWeight: 500 }}>
              {ev.label}
            </span>
            <div className="flex justify-center">
              <Toggle
                enabled={toggles[ev.id].sms}
                onToggle={() => toggle(ev.id, "sms")}
              />
            </div>
            <div className="flex justify-center">
              <Toggle
                enabled={toggles[ev.id].email}
                onToggle={() => toggle(ev.id, "email")}
              />
            </div>
          </div>
        ))}

        <SaveButton />
      </div>
    </div>
  );
}

function AvailabilityPanel() {
  const [away, setAway] = useState(false);

  const days = [
    { day: "Monday", from: "09:00", to: "17:00" },
    { day: "Tuesday", from: "09:00", to: "17:00" },
    { day: "Wednesday", from: "09:00", to: "17:00" },
    { day: "Thursday", from: "09:00", to: "17:00" },
    { day: "Friday", from: "09:00", to: "14:00" },
  ];

  return (
    <div>
      <SectionHeader title="Availability" />
      <div style={cardStyle} className="p-6">
        <h4
          className="mb-4"
          style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e" }}
        >
          Working Hours
        </h4>

        <div className="flex flex-col gap-2.5 mb-6">
          {days.map((d) => (
            <div key={d.day} className="flex items-center gap-3">
              <span
                className="w-28 shrink-0"
                style={{ fontSize: "0.84rem", fontWeight: 500, color: "#1a1d2e" }}
              >
                {d.day}
              </span>
              <input
                type="time"
                defaultValue={d.from}
                className="px-3 py-2 rounded-lg border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] outline-none focus:border-[#2563eb] transition-colors"
                style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}
              />
              <span style={{ fontSize: "0.78rem", color: "#8892a8" }}>to</span>
              <input
                type="time"
                defaultValue={d.to}
                className="px-3 py-2 rounded-lg border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] outline-none focus:border-[#2563eb] transition-colors"
                style={{ fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}
              />
            </div>
          ))}
        </div>

        {/* Away toggle */}
        <div
          className="flex items-center justify-between px-4 py-3.5 rounded-xl"
          style={{ backgroundColor: away ? "#fef2f2" : "#f3f4f8" }}
        >
          <div>
            <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
              Away Status
            </span>
            <p style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 2 }}>
              Cases route to other providers if smart routing enabled
            </p>
          </div>
          <Toggle enabled={away} onToggle={() => setAway((v) => !v)} />
        </div>

        <SaveButton />
      </div>
    </div>
  );
}

function SecurityPanel() {
  const [twoFa, setTwoFa] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div>
      <SectionHeader title="Security" />
      <div className="flex flex-col gap-5">
        <div style={cardStyle} className="p-6">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1d2e", marginBottom: 6 }}>
            Security settings
          </h3>
          <p style={{ fontSize: "0.84rem", color: "#8892a8", marginBottom: 24 }}>
            Manage your password and platform security preferences.
          </p>

          <div className="flex flex-col gap-6 max-w-xl">
            {/* Password */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#f3f4f8]">
              <div>
                <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
                  Password
                </span>
                <p style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 2 }}>
                  Last changed 45 days ago
                </p>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
                style={{ fontSize: "0.82rem", fontWeight: 500 }}
              >
                Change password
              </button>
            </div>

            {/* 2FA */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#f3f4f8]">
              <div>
                <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
                  Two-factor authentication
                </span>
                <p style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 2 }}>
                  Adds an extra layer of security to your account
                </p>
              </div>
              <button
                onClick={() => setTwoFa(!twoFa)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${twoFa ? "bg-[#16a34a]" : "bg-[#c4c9d4]"
                  }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${twoFa ? "translate-x-4.5" : "translate-x-1"
                    }`}
                />
              </button>
            </div>

            {/* Auto-logout */}
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#f3f4f8]">
              <div>
                <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
                  Auto-logout timer
                </span>
                <p style={{ fontSize: "0.72rem", color: "#8892a8", marginTop: 2 }}>
                  Log out automatically after inactivity
                </p>
              </div>
              <div className="relative">
                <select
                  defaultValue="15"
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] outline-none focus:border-[#2563eb] transition-colors cursor-pointer"
                  style={{ fontSize: "0.82rem", fontWeight: 500 }}
                >
                  <option value="5">5 min inactivity</option>
                  <option value="15">15 min inactivity</option>
                  <option value="30">30 min inactivity</option>
                  <option value="60">60 min inactivity</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8892a8] pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <SaveButton />
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-[#e2e6ef] flex items-center justify-between">
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#1a1d2e" }}>Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-[#8892a8] hover:text-[#1a1d2e] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1d2e" }}>Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] outline-none focus:border-[#2563eb] transition-colors" />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1d2e" }}>New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] outline-none focus:border-[#2563eb] transition-colors" />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1d2e" }}>Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] outline-none focus:border-[#2563eb] transition-colors" />
              </div>
            </div>
            <div className="px-6 py-4 bg-[#f8f9fb] border-t border-[#e2e6ef] flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
                style={{ fontSize: "0.84rem", fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success("Password changed successfully");
                  setShowPasswordModal(false);
                }}
                className="px-5 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#16a34a", fontSize: "0.84rem", fontWeight: 600 }}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LanguagePanel() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  return (
    <div>
      <SectionHeader title="Language" beta />
      <div style={cardStyle} className="p-6">
        <p className="mb-5" style={{ fontSize: "0.82rem", color: "#8892a8" }}>
          Select the display language for the application.
        </p>
        <div className="flex flex-col gap-2.5">
          {(
            [
              { id: "en" as const, label: "English", flag: "🇬🇧" },
              { id: "ar" as const, label: "Arabic (العربية)", flag: "🇸🇦" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setLang(opt.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left"
              style={{
                backgroundColor: lang === opt.id ? "#ecfdf5" : "#fff",
                borderColor: lang === opt.id ? "#86efac" : "#e2e6ef",
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                style={{ borderColor: lang === opt.id ? "#16a34a" : "#c4c9d4" }}
              >
                {lang === opt.id && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#16a34a" }}
                  />
                )}
              </div>
              <span style={{ fontSize: "1.1rem" }}>{opt.flag}</span>
              <span
                style={{
                  fontSize: "0.84rem",
                  fontWeight: lang === opt.id ? 600 : 400,
                  color: "#1a1d2e",
                }}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>

        <SaveButton />
      </div>
    </div>
  );
}

function TemplatesPanel() {
  const [templates, setTemplates] = useState([
    { id: "t1", name: "GLP-1 nausea tips", body: "Mild nausea is common in the first 1-2 days after injection. Try taking it before bed and stay hydrated." },
    { id: "t2", name: "Injection reminder", body: "Reminder: Your next injection is due this week. Please take it on your scheduled day." },
    { id: "t3", name: "Weigh-in reminder", body: "Please log your weight this week so we can track your progress accurately." },
  ]);

  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editBody, setEditBody] = useState("");

  const startEdit = (t: typeof templates[0]) => {
    setEditing(t.id);
    setEditName(t.name);
    setEditBody(t.body);
  };

  const saveEdit = () => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === editing ? { ...t, name: editName, body: editBody } : t
      )
    );
    setEditing(null);
  };

  const addNew = () => {
    const newId = `t${Date.now()}`;
    const newTemplate = { id: newId, name: "New Template", body: "" };
    setTemplates((prev) => [...prev, newTemplate]);
    startEdit(newTemplate);
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    if (editing === id) setEditing(null);
  };

  return (
    <div>
      <SectionHeader title="Quick Templates" beta />
      <div style={cardStyle} className="p-6">
        <p className="mb-5" style={{ fontSize: "0.82rem", color: "#8892a8" }}>
          Pre-written message templates used in the Messages chat interface.
        </p>

        <div className="flex flex-col gap-3">
          {templates.map((t) => (
            <div
              key={t.id}
              className="rounded-xl border border-[#e2e6ef] overflow-hidden"
            >
              {editing === t.id ? (
                <div className="p-4 flex flex-col gap-3 bg-[#f8f9fb]">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#e2e6ef] bg-white text-[#1a1d2e] outline-none focus:border-[#2563eb]"
                    style={{ fontSize: "0.84rem", fontWeight: 600 }}
                  />
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={3}
                    className="px-3 py-2 rounded-lg border border-[#e2e6ef] bg-white text-[#1a1d2e] outline-none focus:border-[#2563eb] resize-none"
                    style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
                  />
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button onClick={() => { setEditing(null); toast("Editing cancelled"); }} className="px-4 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e" }}>
                      {t.name}
                    </p>
                    <p
                      className="mt-1 truncate"
                      style={{ fontSize: "0.76rem", color: "#8892a8" }}
                    >
                      {t.body}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 ml-3 shrink-0">
                    <button
                      onClick={() => startEdit(t)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#f3f4f8] text-[#8892a8] hover:text-[#1a1d2e] transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTemplate(t.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#fef2f2] text-[#8892a8] hover:text-[#dc2626] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add new */}
        <button
          onClick={addNew}
          className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#c4c9d4] text-[#8892a8] hover:text-[#1a1d2e] hover:border-[#1a1d2e] transition-colors w-full justify-center"
          style={{ fontSize: "0.82rem", fontWeight: 500 }}
        >
          <Plus className="w-4 h-4" />
          Add Template
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN SETTINGS PAGE
   ═══════════════════════════════════════════ */

const panels: Record<TabId, React.FC> = {
  profile: ProfilePanel,
  notifications: NotificationsPanel,
  availability: AvailabilityPanel,
  security: SecurityPanel,
  language: LanguagePanel,
  templates: TemplatesPanel,
};

export function ProviderSettings() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const ActivePanel = panels[activeTab];

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#e2e6ef]">
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>
          Settings
        </h2>
      </div>

      {/* Two-column layout */}
      <div
        className="px-8 pt-6 pb-10"
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* Settings Nav (Left) */}
        <div style={cardStyle} className="p-3 sticky top-6">
          <nav className="flex flex-col gap-0.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-left"
                  style={{
                    backgroundColor: isActive ? "#ecfdf5" : "transparent",
                    color: isActive ? "#16a34a" : "#8892a8",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.84rem",
                  }}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{tab.label}</span>
                  {tab.beta && (
                    <span
                      className="px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "rgba(136,146,168,0.12)",
                        color: "#8892a8",
                        fontSize: "0.55rem",
                        fontWeight: 600,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      P2
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content (Right) */}
        <div>
          <ActivePanel />
        </div>
      </div>
    </div>
  );
}
