import { createContext, useContext, useState, type ReactNode } from "react";

/* ─── Gender ─── */
export type Gender = "Male" | "Female";

/* ─── Treatment keys ─── */
export type MaleTreatment = "Weight Loss" | "Hair Regrowth" | "Testosterone" | "Mental Health" | "Sexual Health";
export type FemaleTreatment = "Lose Weight" | "Grow Fuller Hair" | "Relieve Menopause" | "Ease Menopause" | "Reduce Anxiety";
export type Treatment = MaleTreatment | FemaleTreatment;

export const maleTreatments: MaleTreatment[] = ["Weight Loss", "Hair Regrowth", "Testosterone", "Mental Health", "Sexual Health"];
export const femaleTreatments: FemaleTreatment[] = ["Lose Weight", "Grow Fuller Hair", "Relieve Menopause", "Ease Menopause", "Reduce Anxiety"];

/* ─── Patient Status (unchanged) ─── */
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

/* ════════════════════════════════════════════════════════
   TREATMENT DATA — comprehensive prototype data per treatment
   ════════════════════════════════════════════════════════ */

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
    label: string;             // e.g. "Weight", "Hair Density"
    unit: string;              // e.g. "kg", "%", "score"
    direction: "down" | "up";  // whether good progress is down or up
    startValue: number;
    currentValue: number;
    changeText: string;        // e.g. "-8.2 kg"
    changeSubtext: string;
    barData: number[];         // 8 bars of relative height (0–100)
    monthLabels: string[];
}

export interface TreatmentProfile {
    key: Treatment;
    greeting: string;        // e.g. "You're on Week 8 of your weight-loss journey"
    primaryMed: MedicationData;
    addOns: MedicationData[];
    monthlyTotal: string;
    doseSteps: DoseStep[];
    progress: ProgressMetric;
    checkinQuestion: string;
    sideEffects: string[];
    conditions: string[];
    medications: string[];   // current meds list
}

/* ─── Male Treatments ─── */

const maleWeightLoss: TreatmentProfile = {
    key: "Weight Loss",
    greeting: "You're on Week 8 of your weight-loss journey",
    primaryMed: { emoji: "💉", name: "Generic Semaglutide 0.5mg", dosage: "0.5mg", instructions: "Inject once weekly · Every Monday · Abdomen or thigh", price: "549 SAR" },
    addOns: [
        { emoji: "💊", name: "Metformin 500mg", dosage: "500mg", instructions: "Take daily with dinner", price: "+49 SAR" },
        { emoji: "💊", name: "Vitamin B12", dosage: "", instructions: "Take daily", price: "+29 SAR" },
    ],
    monthlyTotal: "627 SAR/mo",
    doseSteps: [
        { dose: "0.25mg", sub: "Wk 1-4", status: "done" },
        { dose: "0.5mg", sub: "Current", status: "current" },
        { dose: "1.0mg", sub: "Wk 9-12", status: "future" },
        { dose: "Maintain", sub: "Wk 13+", status: "future" },
    ],
    progress: {
        label: "Weight", unit: "kg", direction: "down",
        startValue: 103, currentValue: 94.8,
        changeText: "-8.2 kg", changeSubtext: "Lost since starting · 9.1% of body weight",
        barData: [95, 88, 78, 72, 64, 58, 52, 48],
        monthLabels: ["Nov", "Dec", "Jan", "Feb"],
    },
    checkinQuestion: "How have you been feeling on your current dose?",
    sideEffects: ["Nausea", "Headache", "Fatigue", "Constipation", "Injection site pain"],
    conditions: [],
    medications: ["Generic Semaglutide 0.5mg", "Metformin 500mg", "Vitamin B12"],
};

const maleHair: TreatmentProfile = {
    key: "Hair Regrowth",
    greeting: "You're on Month 3 of your hair regrowth plan",
    primaryMed: { emoji: "💊", name: "Finasteride 1mg", dosage: "1mg", instructions: "Take once daily · Morning", price: "189 SAR" },
    addOns: [
        { emoji: "🧴", name: "Minoxidil 5% Topical", dosage: "5%", instructions: "Apply to scalp twice daily", price: "+99 SAR" },
        { emoji: "💊", name: "Biotin 5000mcg", dosage: "", instructions: "Take daily", price: "+29 SAR" },
    ],
    monthlyTotal: "317 SAR/mo",
    doseSteps: [
        { dose: "Month 1", sub: "Initial", status: "done" },
        { dose: "Month 3", sub: "Current", status: "current" },
        { dose: "Month 6", sub: "Evaluate", status: "future" },
        { dose: "Month 12", sub: "Full results", status: "future" },
    ],
    progress: {
        label: "Hair Density", unit: "%", direction: "up",
        startValue: 62, currentValue: 71,
        changeText: "+14.5%", changeSubtext: "Density improvement since starting",
        barData: [30, 35, 42, 50, 58, 65, 72, 78],
        monthLabels: ["Nov", "Dec", "Jan", "Feb"],
    },
    checkinQuestion: "Have you noticed any changes in hair density or shedding?",
    sideEffects: ["Scalp irritation", "Dizziness", "Decreased libido", "Dry scalp"],
    conditions: [],
    medications: ["Finasteride 1mg", "Minoxidil 5% Topical", "Biotin 5000mcg"],
};

const maleTestosterone: TreatmentProfile = {
    key: "Testosterone",
    greeting: "You're on Week 6 of your testosterone therapy",
    primaryMed: { emoji: "💉", name: "Testosterone Cypionate 200mg/mL", dosage: "200mg/mL", instructions: "Inject 0.5mL weekly · Glute or thigh", price: "399 SAR" },
    addOns: [
        { emoji: "💊", name: "Anastrozole 0.5mg", dosage: "0.5mg", instructions: "Take twice weekly", price: "+59 SAR" },
        { emoji: "💊", name: "Vitamin D3 5000 IU", dosage: "", instructions: "Take daily", price: "+19 SAR" },
    ],
    monthlyTotal: "477 SAR/mo",
    doseSteps: [
        { dose: "100mg", sub: "Wk 1-4", status: "done" },
        { dose: "150mg", sub: "Current", status: "current" },
        { dose: "200mg", sub: "Wk 9-12", status: "future" },
        { dose: "Maintain", sub: "Wk 13+", status: "future" },
    ],
    progress: {
        label: "Total T Level", unit: "ng/dL", direction: "up",
        startValue: 280, currentValue: 520,
        changeText: "+240 ng/dL", changeSubtext: "Total testosterone from 280 → 520 ng/dL",
        barData: [20, 30, 42, 55, 62, 70, 78, 85],
        monthLabels: ["Wk 1", "Wk 2", "Wk 4", "Wk 6"],
    },
    checkinQuestion: "How is your energy level and overall mood this week?",
    sideEffects: ["Acne", "Mood swings", "Sleep issues", "Injection site pain", "Increased aggression"],
    conditions: [],
    medications: ["Testosterone Cypionate 200mg/mL", "Anastrozole 0.5mg", "Vitamin D3 5000 IU"],
};

const maleMentalHealth: TreatmentProfile = {
    key: "Mental Health",
    greeting: "You're on Week 6 of your mental wellness plan",
    primaryMed: { emoji: "💊", name: "Sertraline (Zoloft) 50mg", dosage: "50mg", instructions: "Take once daily · Morning with food", price: "149 SAR" },
    addOns: [
        { emoji: "💊", name: "L-Theanine 200mg", dosage: "200mg", instructions: "Take as needed for anxiety", price: "+39 SAR" },
        { emoji: "📘", name: "CBT Workbook Access", dosage: "", instructions: "Weekly exercises", price: "+0 SAR" },
    ],
    monthlyTotal: "188 SAR/mo",
    doseSteps: [
        { dose: "25mg", sub: "Wk 1-2", status: "done" },
        { dose: "50mg", sub: "Current", status: "current" },
        { dose: "100mg", sub: "If needed", status: "future" },
        { dose: "Maintain", sub: "Ongoing", status: "future" },
    ],
    progress: {
        label: "Mood Score", unit: "/10", direction: "up",
        startValue: 3.5, currentValue: 6.8,
        changeText: "6.8 / 10", changeSubtext: "Average mood improved from 3.5 → 6.8",
        barData: [25, 30, 38, 45, 52, 60, 68, 72],
        monthLabels: ["Wk 1", "Wk 2", "Wk 4", "Wk 6"],
    },
    checkinQuestion: "How would you rate your mood and anxiety levels this week?",
    sideEffects: ["Drowsiness", "Dry mouth", "Nausea", "Insomnia", "Appetite change"],
    conditions: [],
    medications: ["Sertraline (Zoloft) 50mg", "L-Theanine 200mg"],
};

const maleSexualHealth: TreatmentProfile = {
    key: "Sexual Health",
    greeting: "You're on Month 2 of your sexual health plan",
    primaryMed: { emoji: "💊", name: "Tadalafil (Cialis) 5mg", dosage: "5mg", instructions: "Take once daily · Same time each day", price: "229 SAR" },
    addOns: [
        { emoji: "💊", name: "Zinc 50mg", dosage: "50mg", instructions: "Take daily", price: "+19 SAR" },
        { emoji: "💊", name: "Maca Root 500mg", dosage: "500mg", instructions: "Take daily", price: "+29 SAR" },
    ],
    monthlyTotal: "277 SAR/mo",
    doseSteps: [
        { dose: "2.5mg", sub: "Wk 1-2", status: "done" },
        { dose: "5mg", sub: "Current", status: "current" },
        { dose: "10mg", sub: "If needed", status: "future" },
        { dose: "Maintain", sub: "Ongoing", status: "future" },
    ],
    progress: {
        label: "Wellness Score", unit: "/10", direction: "up",
        startValue: 4, currentValue: 7.5,
        changeText: "7.5 / 10", changeSubtext: "Self-reported wellness from 4 → 7.5",
        barData: [28, 35, 45, 55, 62, 68, 74, 80],
        monthLabels: ["Wk 1", "Wk 2", "Wk 4", "Wk 6"],
    },
    checkinQuestion: "How would you rate your overall satisfaction and energy levels?",
    sideEffects: ["Headache", "Flushing", "Nasal congestion", "Back pain", "Dizziness"],
    conditions: [],
    medications: ["Tadalafil (Cialis) 5mg", "Zinc 50mg", "Maca Root 500mg"],
};

/* ─── Female Treatments ─── */

const femaleLoseWeight: TreatmentProfile = {
    key: "Lose Weight",
    greeting: "You're on Week 8 of your weight-loss journey",
    primaryMed: { emoji: "💉", name: "Generic Semaglutide 0.5mg", dosage: "0.5mg", instructions: "Inject once weekly · Every Monday · Abdomen or thigh", price: "549 SAR" },
    addOns: [
        { emoji: "💊", name: "Metformin 500mg", dosage: "500mg", instructions: "Take daily with dinner", price: "+49 SAR" },
        { emoji: "💊", name: "Vitamin B12", dosage: "", instructions: "Take daily", price: "+29 SAR" },
    ],
    monthlyTotal: "627 SAR/mo",
    doseSteps: [
        { dose: "0.25mg", sub: "Wk 1-4", status: "done" },
        { dose: "0.5mg", sub: "Current", status: "current" },
        { dose: "1.0mg", sub: "Wk 9-12", status: "future" },
        { dose: "Maintain", sub: "Wk 13+", status: "future" },
    ],
    progress: {
        label: "Weight", unit: "kg", direction: "down",
        startValue: 82, currentValue: 75.4,
        changeText: "-6.6 kg", changeSubtext: "Lost since starting · 8.0% of body weight",
        barData: [92, 84, 76, 68, 60, 55, 50, 46],
        monthLabels: ["Nov", "Dec", "Jan", "Feb"],
    },
    checkinQuestion: "How have you been feeling on your current dose?",
    sideEffects: ["Nausea", "Headache", "Fatigue", "Constipation", "Injection site pain"],
    conditions: [],
    medications: ["Generic Semaglutide 0.5mg", "Metformin 500mg", "Vitamin B12"],
};

const femaleHair: TreatmentProfile = {
    key: "Grow Fuller Hair",
    greeting: "You're on Month 3 of your hair restoration plan",
    primaryMed: { emoji: "🧴", name: "Minoxidil 2% Topical", dosage: "2%", instructions: "Apply to scalp twice daily · Morning & night", price: "159 SAR" },
    addOns: [
        { emoji: "💊", name: "Biotin 5000mcg", dosage: "5000mcg", instructions: "Take daily", price: "+29 SAR" },
        { emoji: "💊", name: "Iron Supplement 65mg", dosage: "65mg", instructions: "Take daily with Vitamin C", price: "+25 SAR" },
    ],
    monthlyTotal: "213 SAR/mo",
    doseSteps: [
        { dose: "Month 1", sub: "Initial", status: "done" },
        { dose: "Month 3", sub: "Current", status: "current" },
        { dose: "Month 6", sub: "Evaluate", status: "future" },
        { dose: "Month 12", sub: "Full results", status: "future" },
    ],
    progress: {
        label: "Hair Density", unit: "%", direction: "up",
        startValue: 58, currentValue: 66,
        changeText: "+13.8%", changeSubtext: "Density improvement since starting",
        barData: [28, 32, 38, 45, 52, 58, 64, 70],
        monthLabels: ["Nov", "Dec", "Jan", "Feb"],
    },
    checkinQuestion: "Have you noticed changes in hair fullness or shedding?",
    sideEffects: ["Scalp irritation", "Facial hair growth", "Dizziness", "Dry scalp"],
    conditions: [],
    medications: ["Minoxidil 2% Topical", "Biotin 5000mcg", "Iron Supplement 65mg"],
};

const femaleRelieveMenopause: TreatmentProfile = {
    key: "Relieve Menopause",
    greeting: "You're on Week 6 of your menopause relief plan",
    primaryMed: { emoji: "💊", name: "Estradiol 1mg", dosage: "1mg", instructions: "Take once daily · Same time each day", price: "199 SAR" },
    addOns: [
        { emoji: "💊", name: "Progesterone 100mg", dosage: "100mg", instructions: "Take nightly · 12 days/month", price: "+79 SAR" },
        { emoji: "💊", name: "Vitamin D3 2000 IU", dosage: "", instructions: "Take daily", price: "+19 SAR" },
    ],
    monthlyTotal: "297 SAR/mo",
    doseSteps: [
        { dose: "0.5mg", sub: "Wk 1-4", status: "done" },
        { dose: "1mg", sub: "Current", status: "current" },
        { dose: "1.5mg", sub: "If needed", status: "future" },
        { dose: "Maintain", sub: "Ongoing", status: "future" },
    ],
    progress: {
        label: "Symptom Score", unit: "/10", direction: "down",
        startValue: 8.2, currentValue: 4.5,
        changeText: "4.5 / 10", changeSubtext: "Symptom severity reduced from 8.2 → 4.5",
        barData: [88, 80, 70, 62, 55, 48, 42, 38],
        monthLabels: ["Wk 1", "Wk 2", "Wk 4", "Wk 6"],
    },
    checkinQuestion: "How severe have your hot flashes and night sweats been this week?",
    sideEffects: ["Breast tenderness", "Bloating", "Headache", "Mood changes", "Nausea"],
    conditions: [],
    medications: ["Estradiol 1mg", "Progesterone 100mg", "Vitamin D3 2000 IU"],
};

const femaleEaseMenopause: TreatmentProfile = {
    key: "Ease Menopause",
    greeting: "You're on Week 4 of your menopause comfort plan",
    primaryMed: { emoji: "💊", name: "Paroxetine 7.5mg", dosage: "7.5mg", instructions: "Take once daily at bedtime", price: "139 SAR" },
    addOns: [
        { emoji: "💊", name: "Black Cohosh 40mg", dosage: "40mg", instructions: "Take twice daily", price: "+35 SAR" },
        { emoji: "💊", name: "Magnesium 400mg", dosage: "400mg", instructions: "Take daily before bed", price: "+25 SAR" },
    ],
    monthlyTotal: "199 SAR/mo",
    doseSteps: [
        { dose: "7.5mg", sub: "Wk 1-4", status: "done" },
        { dose: "7.5mg", sub: "Current", status: "current" },
        { dose: "Adjust", sub: "If needed", status: "future" },
        { dose: "Maintain", sub: "Ongoing", status: "future" },
    ],
    progress: {
        label: "Comfort Score", unit: "/10", direction: "up",
        startValue: 3.0, currentValue: 6.2,
        changeText: "6.2 / 10", changeSubtext: "Comfort improved from 3.0 → 6.2",
        barData: [22, 28, 36, 44, 50, 56, 62, 68],
        monthLabels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"],
    },
    checkinQuestion: "How are your sleep quality and mood stability this week?",
    sideEffects: ["Drowsiness", "Dry mouth", "Nausea", "Dizziness", "Appetite change"],
    conditions: [],
    medications: ["Paroxetine 7.5mg", "Black Cohosh 40mg", "Magnesium 400mg"],
};

const femaleAnxiety: TreatmentProfile = {
    key: "Reduce Anxiety",
    greeting: "You're on Week 5 of your anxiety management plan",
    primaryMed: { emoji: "💊", name: "Escitalopram (Lexapro) 10mg", dosage: "10mg", instructions: "Take once daily · Morning with food", price: "169 SAR" },
    addOns: [
        { emoji: "💊", name: "L-Theanine 200mg", dosage: "200mg", instructions: "Take as needed", price: "+39 SAR" },
        { emoji: "📘", name: "Guided Meditation Access", dosage: "", instructions: "Daily 10-min sessions", price: "+0 SAR" },
    ],
    monthlyTotal: "208 SAR/mo",
    doseSteps: [
        { dose: "5mg", sub: "Wk 1-2", status: "done" },
        { dose: "10mg", sub: "Current", status: "current" },
        { dose: "15mg", sub: "If needed", status: "future" },
        { dose: "Maintain", sub: "Ongoing", status: "future" },
    ],
    progress: {
        label: "Anxiety Score", unit: "/10", direction: "down",
        startValue: 8.5, currentValue: 5.1,
        changeText: "5.1 / 10", changeSubtext: "Anxiety level reduced from 8.5 → 5.1",
        barData: [90, 82, 72, 64, 58, 52, 48, 44],
        monthLabels: ["Wk 1", "Wk 2", "Wk 3", "Wk 5"],
    },
    checkinQuestion: "How would you rate your anxiety and stress levels this week?",
    sideEffects: ["Drowsiness", "Dry mouth", "Insomnia", "Nausea", "Restlessness"],
    conditions: [],
    medications: ["Escitalopram (Lexapro) 10mg", "L-Theanine 200mg"],
};

/* ─── Lookup maps ─── */

export const maleTreatmentData: Record<MaleTreatment, TreatmentProfile> = {
    "Weight Loss": maleWeightLoss,
    "Hair Regrowth": maleHair,
    "Testosterone": maleTestosterone,
    "Mental Health": maleMentalHealth,
    "Sexual Health": maleSexualHealth,
};

export const femaleTreatmentData: Record<FemaleTreatment, TreatmentProfile> = {
    "Lose Weight": femaleLoseWeight,
    "Grow Fuller Hair": femaleHair,
    "Relieve Menopause": femaleRelieveMenopause,
    "Ease Menopause": femaleEaseMenopause,
    "Reduce Anxiety": femaleAnxiety,
};

export function getTreatmentData(gender: Gender, treatment: Treatment): TreatmentProfile {
    if (gender === "Male") return maleTreatmentData[treatment as MaleTreatment];
    return femaleTreatmentData[treatment as FemaleTreatment];
}

/* ════════════════════════════════════════════════════════
   CONTEXT
   ════════════════════════════════════════════════════════ */

interface PrototypeState {
    gender: Gender;
    setGender: (g: Gender) => void;
    treatment: Treatment;
    setTreatment: (t: Treatment) => void;
    status: PatientStatus;
    setStatus: (s: PatientStatus) => void;
    data: TreatmentProfile;
}

const PrototypeContext = createContext<PrototypeState | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
    const [gender, setGenderRaw] = useState<Gender>("Male");
    const [treatment, setTreatment] = useState<Treatment>("Weight Loss");
    const [status, setStatus] = useState<PatientStatus>("shipped");

    const setGender = (g: Gender) => {
        setGenderRaw(g);
        // Reset treatment to first option for the new gender
        if (g === "Male") setTreatment(maleTreatments[0]);
        else setTreatment(femaleTreatments[0]);
    };

    const data = getTreatmentData(gender, treatment);

    return (
        <PrototypeContext.Provider value={{ gender, setGender, treatment, setTreatment, status, setStatus, data }}>
            {children}
        </PrototypeContext.Provider>
    );
}

export function usePrototype(): PrototypeState {
    const ctx = useContext(PrototypeContext);
    if (!ctx) throw new Error("usePrototype must be used within PrototypeProvider");
    return ctx;
}
