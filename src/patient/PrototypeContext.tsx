import { createContext, useContext, useState, type ReactNode } from "react";

/* ─── Treatment keys ─── */
export type Treatment = "Weight Loss" | "ED" | "Mental Health" | "Hair Loss" | "Skin Care" | "Labs";

export const allTreatments: Treatment[] = [
    "Weight Loss",
    "ED",
    "Mental Health",
    "Hair Loss",
    "Skin Care",
    "Labs"
];

/* ─── Patient Status ─── */
export type PatientStatus =
    | "waiting"
    | "approved"
    | "shipped"
    | "delivered"
    | "dose_change"
    | "declined"
    | "payment_failed"
    | "paused";

export const statusLabels: Record<PatientStatus, string> = {
    waiting: "1. Waiting",
    approved: "2. Approved",
    shipped: "3. Shipped",
    delivered: "4. Delivered (Active)",
    dose_change: "5. Dose Change",
    declined: "6. Declined",
    payment_failed: "7. Payment Failed",
    paused: "8. Paused",
};

export interface MedicationData {
    emoji: string;
    name: string;
    dosage: string;
    instructions: string;
    price: string;
}

export interface DoseStep {
    dose: string;
    sub: string;
    status: "done" | "current" | "future";
}

export interface ProgressMetric {
    label: string;
    unit: string;
    direction: "down" | "up";
    startValue: number;
    currentValue: number;
    changeText: string;
    changeSubtext: string;
    barData: number[];
    monthLabels: string[];
}

export interface TreatmentProfile {
    key: Treatment;
    greeting: string;
    primaryMed: MedicationData;
    addOns: MedicationData[];
    monthlyTotal: string;
    doseSteps: DoseStep[];
    progress?: ProgressMetric;
    checkinQuestion: string;
    sideEffects: string[];
    conditions: string[];
    medications: string[];
    // Service-specific custom data based on prompt requirements
    nextRefill?: string;
    moodScore?: string;
    nextPhotoDue?: string;
    formula?: string[];
    plan?: string;
    trackerStatus?: string;
    optimalCount?: number;
    abnormalCount?: number;
}

const weightLossProfile: TreatmentProfile = {
    key: "Weight Loss",
    greeting: "You're on Week 4 of your weight-loss journey",
    primaryMed: { emoji: "💉", name: "Generic Semaglutide 0.5mg", dosage: "0.5mg", instructions: "Inject once weekly · Every Monday", price: "549 SAR" },
    addOns: [],
    monthlyTotal: "549 SAR/mo",
    doseSteps: [
        { dose: "0.25mg", sub: "Done", status: "done" },
        { dose: "0.5mg", sub: "Current", status: "current" },
        { dose: "1.0mg", sub: "Upcoming", status: "future" },
    ],
    progress: {
        label: "Weight", unit: "kg", direction: "down",
        startValue: 102, currentValue: 96,
        changeText: "-6 kg", changeSubtext: "Lost since starting",
        barData: [102, 100, 98, 96],
        monthLabels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    },
    checkinQuestion: "How have you been feeling on your current dose?",
    sideEffects: ["Nausea", "Fatigue", "Constipation"],
    conditions: [],
    medications: ["Generic Semaglutide 0.5mg"],
};

const edProfile: TreatmentProfile = {
    key: "ED",
    greeting: "Your treatment is active",
    primaryMed: { emoji: "💊", name: "Tadalafil Daily 5mg", dosage: "5mg", instructions: "Take once daily · Same time each day", price: "229 SAR" },
    addOns: [],
    monthlyTotal: "229 SAR/mo",
    doseSteps: [],
    nextRefill: "Mar 15",
    checkinQuestion: "How would you rate your overall satisfaction?",
    sideEffects: ["Headache", "Flushing", "Nasal congestion"],
    conditions: [],
    medications: ["Tadalafil Daily 5mg"],
};

const mentalHealthProfile: TreatmentProfile = {
    key: "Mental Health",
    greeting: "Your mental wellness plan is active",
    primaryMed: { emoji: "💊", name: "Escitalopram 10mg", dosage: "10mg", instructions: "Take once daily · Morning with food", price: "169 SAR" },
    addOns: [],
    monthlyTotal: "169 SAR/mo",
    doseSteps: [],
    moodScore: "Improving",
    checkinQuestion: "How would you rate your mood and anxiety levels this week?",
    sideEffects: ["Drowsiness", "Dry mouth", "Insomnia"],
    conditions: [],
    medications: ["Escitalopram 10mg"],
};

const hairLossProfile: TreatmentProfile = {
    key: "Hair Loss",
    greeting: "You're on Month 3 of your hair restoration plan",
    primaryMed: { emoji: "🧴", name: "Topical Minoxidil 5% + Finasteride", dosage: "5%", instructions: "Apply to scalp twice daily", price: "159 SAR" },
    addOns: [],
    monthlyTotal: "159 SAR/mo",
    doseSteps: [],
    nextPhotoDue: "Mar 10",
    checkinQuestion: "Have you noticed changes in hair fullness or shedding?",
    sideEffects: ["Scalp irritation", "Dizziness", "Dry scalp"],
    conditions: [],
    medications: ["Topical Minoxidil 5% + Finasteride"],
};

const skinCareProfile: TreatmentProfile = {
    key: "Skin Care",
    greeting: "Your personalized skincare routine",
    primaryMed: { emoji: "🧴", name: "Custom Rx Acne Cream", dosage: "Custom", instructions: "Apply nightly to clean, dry skin", price: "189 SAR" },
    addOns: [],
    monthlyTotal: "189 SAR/mo",
    doseSteps: [],
    formula: ["Tretinoin 0.05%", "Niacinamide 4%", "Clindamycin 1%"],
    nextPhotoDue: "Feb 5",
    checkinQuestion: "How is your skin adjusting to the new formula?",
    sideEffects: ["Mild redness", "Peeling", "Purging"],
    conditions: [],
    medications: ["Custom Rx Acne Cream"],
};

const labsProfile: TreatmentProfile = {
    key: "Labs",
    greeting: "Your lab results are ready to view",
    primaryMed: { emoji: "🔬", name: "Advanced Panel", dosage: "", instructions: "Comprehensive biomarker analysis", price: "899 SAR" },
    addOns: [],
    monthlyTotal: "899 SAR (One-time)",
    doseSteps: [],
    plan: "Advanced Panel",
    trackerStatus: "Results Ready",
    optimalCount: 37,
    abnormalCount: 1,
    checkinQuestion: "Do you have any questions about your lab results?",
    sideEffects: [],
    conditions: [],
    medications: [],
};

export const treatmentData: Record<Treatment, TreatmentProfile> = {
    "Weight Loss": weightLossProfile,
    "ED": edProfile,
    "Mental Health": mentalHealthProfile,
    "Hair Loss": hairLossProfile,
    "Skin Care": skinCareProfile,
    "Labs": labsProfile,
};

/* ════════════════════════════════════════════════════════
   CONTEXT
   ════════════════════════════════════════════════════════ */

interface PrototypeState {
    treatment: Treatment;
    setTreatment: (t: Treatment) => void;
    status: PatientStatus;
    setStatus: (s: PatientStatus) => void;
    data: TreatmentProfile;
}

const PrototypeContext = createContext<PrototypeState | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
    const [treatment, setTreatment] = useState<Treatment>("Weight Loss");
    const [status, setStatus] = useState<PatientStatus>("delivered");

    const data = treatmentData[treatment];

    return (
        <PrototypeContext.Provider value={{ treatment, setTreatment, status, setStatus, data }}>
            {children}
        </PrototypeContext.Provider>
    );
}

export function usePrototype(): PrototypeState {
    const ctx = useContext(PrototypeContext);
    if (!ctx) throw new Error("usePrototype must be used within PrototypeProvider");
    return ctx;
}
