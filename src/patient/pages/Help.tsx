import { useState } from "react";
import { useNavigate } from "react-router";
import {
    MessageSquare,
    Mail,
    Phone,
    ChevronDown,
    FileText,
    Video,
    Pill,
    ScrollText,
    Shield,
} from "lucide-react";
import { usePatientPath } from "../PatientBaseContext";

/* ─── Shared ─── */

const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid #e2e6ef",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const sectionTitle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.06em",
    color: "#8892a8",
    textTransform: "uppercase" as const,
};

/* ═══════════════════════════════════════════
   1. MEDICAL DISCLAIMER BANNER
   ═══════════════════════════════════════════ */

function DisclaimerBanner() {
    const navigate = useNavigate();
    const p = usePatientPath();

    return (
        <div
            className="flex items-start gap-3 px-5 py-4 rounded-xl flex-wrap"
            style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}
        >
            <span style={{ fontSize: "1.25rem", marginTop: 2 }}>ℹ️</span>
            <div className="flex-1 min-w-0">
                <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>
                    For medical questions, use Messages to chat with your doctor.
                </p>
                <p style={{ fontSize: "0.72rem", color: "#4a5068", marginTop: 2 }}>
                    This page is for account, billing, and technical support only.
                </p>
            </div>
            <button
                onClick={() => navigate(p("/messages"))}
                className="shrink-0 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                style={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    border: "none",
                }}
            >
                Go to Messages
            </button>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. CONTACT SUPPORT
   ═══════════════════════════════════════════ */

function ContactCard() {
    const contacts = [
        {
            icon: MessageSquare,
            color: "#16a34a",
            bg: "#ecfdf5",
            title: "WhatsApp Chat",
            sub: "Fastest response. 9 AM – 6 PM.",
            btn: "Chat Now",
        },
        {
            icon: Mail,
            color: "#2563eb",
            bg: "#eff6ff",
            title: "Email Support",
            sub: "support@evira.sa. Replies in 24h.",
            btn: "Send Email",
        },
        {
            icon: Phone,
            color: "#7c3aed",
            bg: "#f5f3ff",
            title: "Phone Support",
            sub: "800-123-4567. Sun–Thu.",
            btn: "Call Us",
        },
    ];

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>CONTACT US</p>

            <div
                className="grid gap-4 mt-4"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
            >
                {contacts.map((c) => (
                    <div
                        key={c.title}
                        className="flex flex-col items-center text-center gap-2.5 p-4 rounded-xl"
                        style={{ border: "1px solid #e2e6ef" }}
                    >
                        <div
                            className="flex items-center justify-center rounded-full"
                            style={{ width: 40, height: 40, backgroundColor: c.bg }}
                        >
                            <c.icon className="w-5 h-5" style={{ color: c.color }} />
                        </div>
                        <div>
                            <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>
                                {c.title}
                            </p>
                            <p style={{ fontSize: "0.68rem", color: "#8892a8", marginTop: 2, lineHeight: 1.4 }}>
                                {c.sub}
                            </p>
                        </div>
                        <button
                            className="w-full py-2 rounded-lg hover:opacity-90 transition-opacity mt-auto"
                            style={{
                                backgroundColor: c.bg,
                                border: "none",
                                color: c.color,
                                fontSize: "0.76rem",
                                fontWeight: 600,
                            }}
                        >
                            {c.btn}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. FAQ ACCORDION
   ═══════════════════════════════════════════ */

const faqItems = [
    {
        q: "How does Evira work?",
        a: "Evira connects you with licensed physicians who evaluate your health profile and, if appropriate, prescribe FDA-approved GLP-1 medications. Your medication is shipped directly to your door each month, and your doctor monitors your progress remotely.",
    },
    {
        q: "Shipping & Delivery times",
        a: "Orders are typically dispatched within 24 hours of prescription approval. Standard delivery via SMSA Express takes 1–3 business days within Saudi Arabia. You'll receive a tracking number via SMS and in your Orders page.",
    },
    {
        q: "Billing & Payments",
        a: "Your subscription is billed monthly on the same date you started. We accept Visa, Mastercard, and mada. Installment plans via Tamara and Tabby are available at checkout. All invoices are accessible from Settings → Billing History.",
    },
    {
        q: "How to manage or pause my subscription",
        a: "You can pause or cancel your subscription anytime from Settings → Account & Billing. When paused, your subscription will remain inactive until you choose to resume. No charges apply during the pause period.",
    },
    {
        q: "Privacy & Security of my medical data",
        a: "Your health data is encrypted at rest and in transit. We comply with Saudi PDPL and international HIPAA standards. Only your assigned physician has access to your medical records. You can request data deletion at any time.",
    },
];

function FaqAccordion() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>FREQUENTLY ASKED QUESTIONS</p>

            <div className="flex flex-col mt-3">
                {faqItems.map((item, i) => {
                    const isOpen = openIdx === i;
                    return (
                        <div
                            key={i}
                            style={{
                                borderBottom:
                                    i < faqItems.length - 1 ? "1px solid #e2e6ef" : "none",
                            }}
                        >
                            <button
                                onClick={() => setOpenIdx(isOpen ? null : i)}
                                className="flex items-center justify-between w-full text-left py-3.5 px-1 hover:bg-[#f8f9fb] transition-colors rounded"
                            >
                                <span
                                    style={{
                                        fontSize: "0.84rem",
                                        fontWeight: 600,
                                        color: "#1a1d2e",
                                    }}
                                >
                                    {item.q}
                                </span>
                                <ChevronDown
                                    className="w-4 h-4 shrink-0 text-[#8892a8] transition-transform"
                                    style={{
                                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                />
                            </button>
                            {isOpen && (
                                <div
                                    className="px-1 pb-3.5"
                                    style={{
                                        fontSize: "0.78rem",
                                        color: "#4a5068",
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {item.a}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. QUICK LINKS
   ═══════════════════════════════════════════ */

function QuickLinks() {
    const links = [
        { icon: FileText, label: "Return & Refund Policy" },
        { icon: Video, label: "How to use my injection (Video Guide)" },
        { icon: Pill, label: "How to store my medication" },
        { icon: ScrollText, label: "Terms of Service" },
        { icon: Shield, label: "Privacy Policy" },
    ];

    return (
        <div
            className="grid gap-2"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
            {links.map((link) => (
                <button
                    key={link.label}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left hover:bg-[#f8f9fb] transition-colors"
                    style={cardStyle}
                >
                    <link.icon className="w-4 h-4 shrink-0 text-[#2563eb]" />
                    <span
                        style={{
                            fontSize: "0.82rem",
                            fontWeight: 500,
                            color: "#1a1d2e",
                        }}
                    >
                        {link.label}
                    </span>
                </button>
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════
   HELP PAGE
   ═══════════════════════════════════════════ */

export function Help() {
    return (
        <div className="p-5 md:p-8 flex flex-col gap-4">
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1d2e" }}>
                ❓ Help & Support
            </h2>

            <DisclaimerBanner />
            <ContactCard />
            <FaqAccordion />
            <QuickLinks />
        </div>
    );
}
