import { useState, useRef, useEffect } from "react";
import { Search, Paperclip, SendHorizontal } from "lucide-react";
import {
  conversationsData,
  quickTemplateTexts,
  type ChatMessage,
  type Conversation,
} from "../data/mockData";

/* ─── Components ─── */

function ConversationItem({
  convo,
  selected,
  onSelect,
}: {
  convo: Conversation;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full text-left flex items-start gap-3 px-4 py-3.5 transition-colors"
      style={{
        backgroundColor: selected ? "#ecfdf5" : "transparent",
        borderLeft: selected ? "3px solid #16a34a" : "3px solid transparent",
        borderBottom: "1px solid #e2e6ef",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
        style={{
          backgroundColor: convo.avatarBg,
          fontSize: "0.68rem",
          fontWeight: 600,
        }}
      >
        {convo.initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="truncate"
              style={{
                fontSize: "0.84rem",
                fontWeight: 600,
                color: "#1a1d2e",
              }}
            >
              {convo.name}
            </span>
            {convo.unread && !selected && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: "#16a34a" }}
              />
            )}
          </div>
          <span
            className="shrink-0"
            style={{ fontSize: "0.65rem", color: "#8892a8", fontWeight: 500 }}
          >
            {convo.timestamp}
          </span>
        </div>
        <p
          className="truncate mt-0.5"
          style={{ fontSize: "0.76rem", color: "#8892a8" }}
        >
          {convo.preview}
        </p>
      </div>
    </button>
  );
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  const isDoctor = msg.from === "doctor";
  return (
    <div className={`flex ${isDoctor ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className="px-4 py-3 rounded-2xl"
        style={{
          maxWidth: "65%",
          backgroundColor: isDoctor ? "#ecfdf5" : "#f3f4f8",
          borderBottomRightRadius: isDoctor ? 6 : 16,
          borderBottomLeftRadius: isDoctor ? 16 : 6,
        }}
      >
        <p
          style={{
            fontSize: "0.84rem",
            color: isDoctor ? "#15803d" : "#1a1d2e",
            lineHeight: 1.55,
          }}
        >
          {msg.text}
        </p>
        <p
          className="mt-1"
          style={{
            fontSize: "0.62rem",
            color: isDoctor ? "#86efac" : "#8892a8",
            textAlign: isDoctor ? "right" : "left",
            fontFamily: "var(--font-mono)",
          }}
        >
          {msg.time}
        </p>
      </div>
    </div>
  );
}

/* ─── Page ─── */

const quickTemplateKeys = Object.keys(quickTemplateTexts);

export function Messages() {
  const [selectedId, setSelectedId] = useState("c1");
  // Deep clone the conversations so we can add messages
  const [conversations, setConversations] = useState(() =>
    conversationsData.map((c) => ({
      ...c,
      messages: [...c.messages],
    }))
  );
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId) ?? conversations[0];

  // Scroll to bottom on new message or conversation change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected.messages.length, selectedId]);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;

    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const timeStr = `${hours % 12 || 12}:${mins.toString().padStart(2, "0")} ${ampm}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      from: "doctor",
      text,
      time: timeStr,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
            ...c,
            messages: [...c.messages, newMsg],
            preview: text.slice(0, 40) + (text.length > 40 ? "..." : ""),
            timestamp: `Today ${timeStr}`,
          }
          : c
      )
    );
    setInputText("");
  };

  const handleTemplateClick = (key: string) => {
    setInputText(quickTemplateTexts[key]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-8 py-5 bg-white border-b border-[#e2e6ef]">
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1d2e" }}>
          Messages
        </h2>
      </div>

      {/* Main split container */}
      <div className="p-8">
        <div
          className="flex overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid #e2e6ef",
            borderRadius: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            height: "calc(100vh - 160px)",
            minHeight: 520,
          }}
        >
          {/* ── Left Panel: Conversation List ── */}
          <div
            className="shrink-0 flex flex-col"
            style={{
              width: 300,
              borderRight: "1px solid #e2e6ef",
            }}
          >
            {/* Search */}
            <div className="p-3" style={{ borderBottom: "1px solid #e2e6ef" }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f3f4f8]">
                <Search className="w-4 h-4 text-[#8892a8]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none border-none text-[#1a1d2e] placeholder-[#8892a8] w-full"
                  style={{ fontSize: "0.82rem" }}
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <ConversationItem
                  key={convo.id}
                  convo={convo}
                  selected={convo.id === selectedId}
                  onSelect={() => setSelectedId(convo.id)}
                />
              ))}
            </div>
          </div>

          {/* ── Right Panel: Active Chat ── */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid #e2e6ef" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{
                    backgroundColor: selected.avatarBg,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                  }}
                >
                  {selected.initials}
                </div>
                <div>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1a1d2e" }}>
                    {selected.name}
                  </span>
                  {selected.medication && (
                    <span style={{ fontSize: "0.78rem", color: "#8892a8" }}>
                      {" "}· {selected.medication} · {selected.month}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => window.location.href = `/cases/c123`}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors"
                style={{ fontSize: "0.78rem", fontWeight: 500 }}
              >
                📋 View Case
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {selected.messages.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ borderTop: "1px solid #e2e6ef" }}>
              {/* Quick Templates */}
              <div className="flex items-center gap-2 px-6 pt-3 pb-1 flex-wrap">
                <span style={{ fontSize: "0.72rem", color: "#8892a8", fontWeight: 500 }}>
                  📝 Quick templates:
                </span>
                {quickTemplateKeys.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTemplateClick(t)}
                    className="px-2.5 py-1 rounded-full border border-[#e2e6ef] bg-white text-[#1a1d2e] hover:bg-[#ecfdf5] hover:border-[#86efac] transition-colors"
                    style={{ fontSize: "0.7rem", fontWeight: 500 }}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Input Row */}
              <div className="flex items-center gap-2.5 px-6 py-3">
                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-[#e2e6ef] bg-white text-[#8892a8] hover:text-[#1a1d2e] hover:bg-[#f3f4f8] transition-colors shrink-0">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#e2e6ef] bg-[#f8f9fb] text-[#1a1d2e] placeholder-[#8892a8] outline-none focus:border-[#2563eb] transition-colors"
                  style={{ fontSize: "0.84rem" }}
                />
                <button
                  onClick={handleSend}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90 shrink-0"
                  style={{ backgroundColor: "#16a34a" }}
                >
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
