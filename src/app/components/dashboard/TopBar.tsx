import { useState } from "react";
import { Bell, Mail, Search, Settings } from "lucide-react";
import { useNavigate } from "react-router";

export function TopBar() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div className="flex items-center justify-between px-8 py-5">
      {/* Left */}
      <div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 600, color: "#1a1d2e" }}>
          Hello, Dr. Alharbi{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#8892a8", marginTop: 2 }}>
          Tuesday, February 24, 2026
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#e2e6ef] bg-white"
          style={{ minWidth: 200 }}
        >
          <Search className="w-4 h-4 text-[#8892a8]" />
          <input
            type="text"
            placeholder="Search Anything"
            className="bg-transparent outline-none border-none text-[#8892a8] placeholder-[#8892a8] w-full"
            style={{ fontSize: "0.82rem" }}
          />
        </div>

        {/* Icon Buttons */}
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#e2e6ef] bg-white text-[#8892a8] hover:text-[#1a1d2e] transition-colors relative"
          >
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#dc2626] rounded-full" />
          </button>

          {showNotifications && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-[#e2e6ef] shadow-lg z-50 overflow-hidden"
              style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="px-4 py-3 border-b border-[#e2e6ef] flex justify-between items-center bg-[#f8f9fb]">
                <h3 style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1a1d2e" }}>Notifications</h3>
                <span style={{ fontSize: "0.72rem", color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>Mark all read</span>
              </div>
              <div className="flex flex-col max-h-[300px] overflow-y-auto">
                {[
                  { title: "New Case Assigned", desc: "Patient Omar Al-Rashid requires review.", time: "5m ago", unread: true },
                  { title: "Subscription Failed", desc: "Payment for Turki Al-Nasser declined.", time: "1h ago", unread: true },
                  { title: "System Update", desc: "The platform will be undergoing maintenance at 2 AM AST.", time: "1d ago", unread: false }
                ].map((notif, idx) => (
                  <div key={idx} className={`px-4 py-3 border-b border-[#e2e6ef] hover:bg-[#fafbfc] cursor-pointer transition-colors ${notif.unread ? 'bg-[#f0fdf4]' : ''}`}>
                    <div className="flex justify-between items-start mb-1">
                      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1a1d2e" }}>{notif.title}</p>
                      <span style={{ fontSize: "0.68rem", color: "#8892a8" }}>{notif.time}</span>
                    </div>
                    <p style={{ fontSize: "0.76rem", color: "#64748b" }}>{notif.desc}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 bg-[#f8f9fb] text-center border-t border-[#e2e6ef] cursor-pointer hover:bg-[#f1f5f9] transition-colors">
                <span style={{ fontSize: "0.76rem", color: "#1a1d2e", fontWeight: 500 }}>View All Notifications</span>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/messages")}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#e2e6ef] bg-white text-[#8892a8] hover:text-[#1a1d2e] transition-colors"
        >
          <Mail className="w-[18px] h-[18px]" />
        </button>
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-[#e2e6ef] bg-white text-[#8892a8] hover:text-[#1a1d2e] transition-colors"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}