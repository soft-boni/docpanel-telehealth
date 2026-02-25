import { useState } from "react";

/* ═══════════════════════════════════════════
   PATIENT MESSAGES PAGE
   ═══════════════════════════════════════════ */

export function PatientMessages() {
    const [message, setMessage] = useState("");

    return (
        <div className="p-5 md:p-8 flex flex-col gap-4">
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1a1d2e" }}>
                Messages
            </h2>

            {/* Main Chat Container */}
            <div
                className="flex flex-col"
                style={{
                    background: "#fff",
                    border: "1px solid #e2e6ef",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    minHeight: 520,
                }}
            >
                {/* ── Doctor Header ── */}
                <div
                    className="flex items-center gap-2.5 px-4 py-3"
                    style={{ borderBottom: "1px solid #e2e6ef" }}
                >
                    <div
                        className="flex items-center justify-center rounded-full shrink-0"
                        style={{
                            width: 36,
                            height: 36,
                            backgroundColor: "#2563eb",
                            color: "#fff",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                        }}
                    >
                        DA
                    </div>
                    <div>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1a1d2e" }}>
                            Dr. Alharbi
                        </p>
                        <p style={{ fontSize: "0.62rem", color: "#8892a8" }}>
                            Typically responds within 24 hours
                        </p>
                    </div>
                </div>

                {/* ── Chat Feed ── */}
                <div
                    className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto"
                    style={{ minHeight: 400 }}
                >
                    {/* System message */}
                    <div className="flex justify-center mb-3">
                        <span
                            className="px-3 py-1 rounded-xl"
                            style={{
                                backgroundColor: "#f3f4f8",
                                fontSize: "0.62rem",
                                color: "#8892a8",
                            }}
                        >
                            Your prescription was approved — Feb 20
                        </span>
                    </div>

                    {/* Doctor message (left) */}
                    <div style={{ maxWidth: "70%" }} className="mb-2">
                        <div
                            className="px-3.5 py-2.5"
                            style={{
                                backgroundColor: "#f3f4f8",
                                borderRadius: "12px 12px 12px 4px",
                                fontSize: "0.76rem",
                                color: "#4a5068",
                                lineHeight: 1.55,
                            }}
                        >
                            Hi Omar, your nausea should improve after the first 2-3 days. Make
                            sure to eat a light meal before your injection. Let me know if it
                            persists.
                        </div>
                        <span
                            className="block mt-1 ml-1"
                            style={{ fontSize: "0.56rem", color: "#8892a8" }}
                        >
                            Dr. Alharbi · 2:14 PM
                        </span>
                    </div>

                    {/* Patient message (right) */}
                    <div style={{ maxWidth: "70%", marginLeft: "auto" }} className="mb-2">
                        <div
                            className="px-3.5 py-2.5"
                            style={{
                                backgroundColor: "#ecfdf5",
                                border: "1px solid #bbf7d0",
                                borderRadius: "12px 12px 4px 12px",
                                fontSize: "0.76rem",
                                color: "#4a5068",
                                lineHeight: 1.55,
                            }}
                        >
                            Thank you doctor, the nausea is much better this week. Down another
                            0.8kg!
                        </div>
                        <span
                            className="block mt-1 mr-1 text-right"
                            style={{ fontSize: "0.56rem", color: "#8892a8" }}
                        >
                            You · 3:02 PM
                        </span>
                    </div>

                    {/* Doctor reply */}
                    <div style={{ maxWidth: "70%" }} className="mb-2">
                        <div
                            className="px-3.5 py-2.5"
                            style={{
                                backgroundColor: "#f3f4f8",
                                borderRadius: "12px 12px 12px 4px",
                                fontSize: "0.76rem",
                                color: "#4a5068",
                                lineHeight: 1.55,
                            }}
                        >
                            That's great progress, Omar! Keep up the healthy eating and stay
                            hydrated. I'll check in again after your next weigh-in.
                        </div>
                        <span
                            className="block mt-1 ml-1"
                            style={{ fontSize: "0.56rem", color: "#8892a8" }}
                        >
                            Dr. Alharbi · 4:30 PM
                        </span>
                    </div>
                </div>

                {/* ── Input Area ── */}
                <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{ borderTop: "1px solid #e2e6ef" }}
                >
                    {/* Attachment */}
                    <button
                        className="flex items-center justify-center shrink-0 hover:bg-[#f3f4f8] transition-colors"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1px solid #e2e6ef",
                            background: "transparent",
                            fontSize: "0.82rem",
                        }}
                    >
                        📎
                    </button>

                    {/* Text Input */}
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 outline-none"
                        style={{
                            backgroundColor: "#f3f4f8",
                            border: "1px solid #e2e6ef",
                            borderRadius: 20,
                            padding: "8px 14px",
                            fontSize: "0.76rem",
                            color: "#1a1d2e",
                        }}
                    />

                    {/* Send */}
                    <button
                        onClick={() => {
                            if (message.trim()) setMessage("");
                        }}
                        className="flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            backgroundColor: "#16a34a",
                            border: "none",
                            color: "#fff",
                            fontSize: "0.82rem",
                        }}
                    >
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
}
