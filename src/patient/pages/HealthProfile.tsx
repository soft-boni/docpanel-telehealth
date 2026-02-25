import { toast } from "sonner";
import { useState } from "react";
import { PatientModal } from "../components/PatientModal";

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

const editBtn: React.CSSProperties = {
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "#8892a8",
    border: "1px solid #e2e6ef",
    borderRadius: 6,
    padding: "3px 10px",
    background: "#fff",
    cursor: "pointer",
};

const divider: React.CSSProperties = {
    borderTop: "1px solid #e2e6ef",
    margin: "14px 0",
};

/* ═══════════════════════════════════════════
   1. PERSONAL & VITAL STATS
   ═══════════════════════════════════════════ */

function PersonalVitals() {
    const personal = [
        { label: "Name", value: "Omar Al-Rashid" },
        { label: "Date of Birth", value: "Jan 15, 1990" },
        { label: "Age", value: "36" },
        { label: "Gender", value: "Male" },
    ];

    const vitals = [
        { label: "Height", value: "178 cm" },
        { label: "Current Weight", value: "94.8 kg" },
        { label: "BMI", value: "29.9 — Auto-calculated" },
    ];

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>PERSONAL & VITALS</p>

            <div
                className="grid gap-x-8 gap-y-3 mt-4"
                style={{ gridTemplateColumns: "1fr 1fr" }}
            >
                {[...personal, ...vitals].map((d) => (
                    <div key={d.label}>
                        <p style={{ fontSize: "0.66rem", fontWeight: 600, color: "#8892a8", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                            {d.label}
                        </p>
                        <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "#1a1d2e", marginTop: 2 }}>
                            {d.value}
                        </p>
                    </div>
                ))}
            </div>

            <p className="mt-4" style={{ fontSize: "0.62rem", color: "#8892a8", fontStyle: "italic" }}>
                (To edit personal details, go to Account)
            </p>
        </div>
    );
}

/* ═══════════════════════════════════════════
   2. MEDICAL HISTORY
   ═══════════════════════════════════════════ */

function MedicalHistory() {
    const [isConditionsOpen, setConditionsOpen] = useState(false);
    const [isMedsOpen, setMedsOpen] = useState(false);
    const [isAllergiesOpen, setAllergiesOpen] = useState(false);

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>MEDICAL HISTORY</p>

            {/* Conditions */}
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>Conditions</p>
                    <button style={editBtn} onClick={() => setConditionsOpen(true)}>Edit</button>
                </div>
                <p className="mt-1.5" style={{ fontSize: "0.78rem", color: "#8892a8" }}>None reported</p>
            </div>

            <div style={divider} />

            {/* Medications */}
            <div>
                <div className="flex items-center justify-between">
                    <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>Medications</p>
                    <button style={editBtn} onClick={() => setMedsOpen(true)}>Edit</button>
                </div>
                <ul className="mt-1.5 flex flex-col gap-1">
                    {["Generic Semaglutide 0.5mg", "Metformin 500mg", "Vitamin B12"].map((m) => (
                        <li key={m} style={{ fontSize: "0.78rem", color: "#1a1d2e" }}>• {m}</li>
                    ))}
                </ul>

                {/* Warning box */}
                <div
                    className="mt-3 px-3 py-2"
                    style={{
                        backgroundColor: "#fff7ed",
                        border: "1px solid #fed7aa",
                        borderRadius: 8,
                        fontSize: "0.72rem",
                        color: "#ea580c",
                        lineHeight: 1.5,
                    }}
                >
                    ⚠️ Warning: Updating your medications may trigger a safety review by your doctor.
                </div>
            </div>

            <div style={divider} />

            {/* Allergies */}
            <div>
                <div className="flex items-center justify-between">
                    <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>Allergies</p>
                    <button style={editBtn} onClick={() => setAllergiesOpen(true)}>Edit</button>
                </div>
                <p className="mt-1.5" style={{ fontSize: "0.78rem", color: "#1a1d2e" }}>Penicillin</p>
            </div>

            {/* CONDITIONS MODAL */}
            <PatientModal isOpen={isConditionsOpen} onClose={() => setConditionsOpen(false)} title="Edit Conditions">
                <div className="flex flex-col gap-3">
                    <p style={{ fontSize: "0.76rem", color: "#4a5068" }}>Update your reported medical conditions.</p>
                    <textarea
                        className="w-full p-3 outline-none"
                        style={{ backgroundColor: "#f3f4f8", border: "1px solid #e2e6ef", borderRadius: 8, fontSize: "0.82rem", minHeight: 100 }}
                        placeholder="e.g., Hypertension, PCOS..."
                    />
                    <button onClick={() => { toast.success("Conditions updated"); setConditionsOpen(false); }} className="w-full py-2.5 mt-2 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: "#2563eb", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>Save Changes</button>
                </div>
            </PatientModal>

            {/* MEDICATIONS MODAL */}
            <PatientModal isOpen={isMedsOpen} onClose={() => setMedsOpen(false)} title="Edit Medications">
                <div className="flex flex-col gap-3">
                    <p style={{ fontSize: "0.76rem", color: "#4a5068" }}>Add or remove other medications you are taking.</p>
                    <textarea
                        className="w-full p-3 outline-none"
                        style={{ backgroundColor: "#f3f4f8", border: "1px solid #e2e6ef", borderRadius: 8, fontSize: "0.82rem", minHeight: 100 }}
                        defaultValue="Generic Semaglutide 0.5mg&#10;Metformin 500mg&#10;Vitamin B12"
                    />
                    <button onClick={() => { toast.success("Medications updated"); setMedsOpen(false); }} className="w-full py-2.5 mt-2 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: "#2563eb", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>Save Changes</button>
                </div>
            </PatientModal>

            {/* ALLERGIES MODAL */}
            <PatientModal isOpen={isAllergiesOpen} onClose={() => setAllergiesOpen(false)} title="Edit Allergies">
                <div className="flex flex-col gap-3">
                    <p style={{ fontSize: "0.76rem", color: "#4a5068" }}>List any drug or food allergies.</p>
                    <input
                        type="text"
                        className="w-full p-3 outline-none"
                        style={{ backgroundColor: "#f3f4f8", border: "1px solid #e2e6ef", borderRadius: 8, fontSize: "0.82rem" }}
                        defaultValue="Penicillin"
                    />
                    <button onClick={() => { toast.success("Allergies updated"); setAllergiesOpen(false); }} className="w-full py-2.5 mt-2 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: "#2563eb", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>Save Changes</button>
                </div>
            </PatientModal>
        </div>
    );
}

/* ═══════════════════════════════════════════
   3. CHECK-INS & WEIGHT LOG
   ═══════════════════════════════════════════ */

function CheckinsWeightLog() {
    const [isCheckinOpen, setCheckinOpen] = useState(false);
    const [isWeightOpen, setWeightOpen] = useState(false);
    const [weightInput, setWeightInput] = useState("");

    const weightLog = [
        { date: "Feb 20, 2026", weight: "94.8 kg" },
        { date: "Feb 13, 2026", weight: "95.5 kg" },
        { date: "Nov 15, 2025", weight: "103.0 kg" },
    ];

    return (
        <div style={cardStyle} className="p-5">
            {/* Monthly check-in CTA */}
            <button
                onClick={() => setCheckinOpen(true)}
                className="w-full py-3 rounded-xl transition-colors hover:opacity-90"
                style={{
                    backgroundColor: "#ecfdf5",
                    border: "1px solid #bbf7d0",
                    color: "#16a34a",
                    fontSize: "0.84rem",
                    fontWeight: 700,
                }}
            >
                📋 Complete your monthly check-in
            </button>

            <div style={{ ...divider, margin: "16px 0" }} />

            {/* Weight Log Header */}
            <div className="flex items-center justify-between">
                <p style={{ fontSize: "0.84rem", fontWeight: 700, color: "#1a1d2e" }}>Weight Log</p>
                <button
                    onClick={() => setWeightOpen(true)}
                    className="px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                    style={{
                        backgroundColor: "#16a34a",
                        color: "#fff",
                        border: "none",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                    }}
                >
                    + Log new weight
                </button>
            </div>

            {/* Weight Log List */}
            <div className="flex flex-col mt-3">
                {weightLog.map((entry, i) => (
                    <div
                        key={entry.date}
                        className="flex items-center justify-between py-2.5 px-1"
                        style={{ borderBottom: i < weightLog.length - 1 ? "1px solid #e2e6ef" : "none" }}
                    >
                        <span style={{ fontSize: "0.78rem", color: "#8892a8" }}>{entry.date}</span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1a1d2e" }}>{entry.weight}</span>
                    </div>
                ))}
            </div>

            {/* CHECKIN MODAL */}
            <PatientModal isOpen={isCheckinOpen} onClose={() => setCheckinOpen(false)} title="Monthly Check-In">
                <div className="flex flex-col gap-4">
                    <p style={{ fontSize: "0.82rem", color: "#4a5068" }}>How have you been feeling on your current dose?</p>
                    <div className="flex gap-2">
                        {["Great", "Okay", "Poor"].map(opt => (
                            <button key={opt} className="flex-1 py-2 rounded-lg border border-[#e2e6ef] text-[#4a5068] text-[0.76rem] font-semibold hover:bg-[#f3f4f8] focus:bg-[#ecfdf5] focus:border-[#16a34a] focus:text-[#16a34a]">{opt}</button>
                        ))}
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#4a5068", marginTop: 8 }}>Any side effects to report?</p>
                    <textarea className="w-full p-3 outline-none" style={{ backgroundColor: "#f3f4f8", border: "1px solid #e2e6ef", borderRadius: 8, fontSize: "0.82rem", minHeight: 60 }} placeholder="None..." />
                    <button onClick={() => { toast.success("Check-in complete!"); setCheckinOpen(false); }} className="w-full py-2.5 mt-2 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: "#16a34a", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>Submit Check-In</button>
                </div>
            </PatientModal>

            {/* WEIGHT MODAL */}
            <PatientModal isOpen={isWeightOpen} onClose={() => setWeightOpen(false)} title="Log Weight">
                <div className="flex flex-col gap-3">
                    <input type="number" placeholder="Enter weight in kg" value={weightInput} onChange={e => setWeightInput(e.target.value)} className="w-full p-3 outline-none" style={{ backgroundColor: "#f3f4f8", border: "1px solid #e2e6ef", borderRadius: 8, fontSize: "0.88rem" }} />
                    <button onClick={() => { if (weightInput) { toast.success(`Logged ${weightInput} kg`); setWeightOpen(false); setWeightInput(""); } }} className="w-full py-2.5 mt-2 rounded-xl transition-opacity hover:opacity-90" style={{ backgroundColor: "#16a34a", color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>Save Weight</button>
                </div>
            </PatientModal>
        </div>
    );
}

/* ═══════════════════════════════════════════
   4. UPLOADED DOCUMENTS
   ═══════════════════════════════════════════ */

function UploadedDocuments() {
    const docs = ["Lab_Results_Nov2025.pdf", "Previous_Prescription.jpg"];

    return (
        <div style={cardStyle} className="p-5">
            <p style={sectionTitle}>UPLOADED DOCUMENTS</p>

            <div className="flex flex-col gap-2 mt-3">
                {docs.map((doc) => (
                    <div
                        key={doc}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-[#f8f9fb] transition-colors cursor-pointer"
                        style={{ border: "1px solid #e2e6ef" }}
                    >
                        <span style={{ fontSize: "1rem" }}>📄</span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "#1a1d2e" }}>{doc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════
   HEALTH PROFILE PAGE
   ═══════════════════════════════════════════ */

export function HealthProfile() {
    return (
        <div className="p-5 md:p-8 flex flex-col gap-4">
            {/* Page Header */}
            <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1d2e" }}>
                    📋 Health Profile
                </h2>
                <p className="mt-1" style={{ fontSize: "0.82rem", color: "#4a5068", lineHeight: 1.5 }}>
                    Your medical information on file. Most of this was collected during your
                    initial consultation.
                </p>
            </div>

            <PersonalVitals />
            <MedicalHistory />
            <CheckinsWeightLog />
            <UploadedDocuments />
        </div>
    );
}
