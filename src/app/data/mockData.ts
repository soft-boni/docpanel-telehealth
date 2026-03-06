/* ═══════════════════════════════════════════
   SHARED MOCK DATA — Single source of truth
   ═══════════════════════════════════════════ */

export interface CaseData {
  id: string;
  patientName: string;
  initials: string;
  email: string;
  age: number;
  gender: string;
  bmi: number;
  location: string;
  type: string;
  flag: "red" | "yellow" | "green" | "purple";
  alert: string;
  isUrgent: boolean;
  meds: { name: string; reason: string; flagged: boolean }[];
  caseId: string;
  timer?: string;
  status?: string;
  aiSummary: string;
  aiSuggestion: string;
  questionnaire: { q: string; a: string }[];
  flags: { text: string; level: "red" | "yellow" | "green" }[];
}

export const casesData: CaseData[] = [
  {
    id: "case-wl",
    patientName: "Fatima Al-Dosari",
    initials: "FA",
    email: "fatima.a@email.com",
    age: 38,
    gender: "Female",
    bmi: 34.0,
    location: "Riyadh",
    type: "Weight Loss",
    flag: "purple",
    alert: "Titration Due",
    isUrgent: false,
    meds: [
      { name: "Mounjaro 2.5mg", reason: "Weight Loss", flagged: false },
    ],
    caseId: "CASE-0911",
    status: "Titration Due",
    aiSummary: "38yo female currently on Week 4 of GLP-1 medication. Start weight 102kg, current weight 96kg. BMI 34. Reporting good tolerance, ready for dose escalation.",
    aiSuggestion: "Tolerating 2.5mg well. Recommend approving titration to 5.0mg.",
    questionnaire: [
      { q: "Current Side effects?", a: "None" },
      { q: "Weight change?", a: "-6kg (from 102kg to 96kg)" }
    ],
    flags: [{ text: "Titration decision needed: 4 weeks completed.", level: "yellow" }]
  },
  {
    id: "case-ed",
    patientName: "Ahmed Al-Mansouri",
    initials: "AM",
    email: "ahmed.m@email.com",
    age: 34,
    gender: "Male",
    bmi: 27.2,
    location: "Jeddah",
    type: "ED",
    flag: "red",
    alert: "Takes nitrates",
    isUrgent: true,
    meds: [
      { name: "Isosorbide 30mg ⚠️", reason: "Angina", flagged: true },
    ],
    caseId: "CASE-0847",
    status: "Urgent",
    aiSummary: "34yo male presenting with ED. Requests PDE5 inhibitors but marked 'Yes' to currently taking Isosorbide (Nitrates) for angina. Hard contraindication.",
    aiSuggestion: "Cannot prescribe PDE5 inhibitors. Recommend decline and referral to structural urologist.",
    questionnaire: [
      { q: "Do you take any nitrates?", a: "Yes, Isosorbide." },
    ],
    flags: [{ text: "HARD STOP: Takes nitrates. PDE5 blocked.", level: "red" }]
  },
  {
    id: "case-mh",
    patientName: "Sara Al-Qahtani",
    initials: "SQ",
    email: "sara.q@email.com",
    age: 29,
    gender: "Female",
    bmi: 22.0,
    location: "Dammam",
    type: "Mental Health",
    flag: "green",
    alert: "Pending Review",
    isUrgent: false,
    meds: [],
    caseId: "CASE-0811",
    status: "Pending Review",
    aiSummary: "29yo female seeking treatment for Generalized Anxiety Disorder. GAD-7 score is 16 (Severe). Symptoms include trouble sleeping and restlessness.",
    aiSuggestion: "Evaluate for SSRI initiation. Escitalopram 10mg is a strong first-line candidate.",
    questionnaire: [
      { q: "Main symptoms?", a: "Trouble sleeping, constant restlessness." },
      { q: "How long have you felt this way?", a: "Over 6 months." }
    ],
    flags: [{ text: "GAD-7 Score: 16 (Severe)", level: "yellow" }]
  },
  {
    id: "case-hair",
    patientName: "Turki Al-Nasser",
    initials: "TN",
    email: "turki.n@email.com",
    age: 28,
    gender: "Male",
    bmi: 24.5,
    location: "Riyadh",
    type: "Hair Loss",
    flag: "yellow",
    alert: "Mild scalp irritation",
    isUrgent: false,
    meds: [
      { name: "Topical Minoxidil 5%", reason: "Hair Loss", flagged: true }
    ],
    caseId: "CASE-1022",
    status: "Pending Review",
    aiSummary: "28yo male reporting receding hairline (Norwood Scale 3). Currently using Minoxidil but reported mild scalp irritation last month.",
    aiSuggestion: "Consider switching to foam formulation or lower concentration to avoid irritation. Must confirm before authorizing.",
    questionnaire: [
      { q: "Any scalp side effects?", a: "Yes, mild irritation and redness last month." },
    ],
    flags: [{ text: "Patient reported mild scalp irritation last month.", level: "yellow" }]
  },
  {
    id: "case-skin",
    patientName: "Layla Al-Omari",
    initials: "LO",
    email: "layla.o@email.com",
    age: 24,
    gender: "Female",
    bmi: 21.0,
    location: "Jeddah",
    type: "Skin Care",
    flag: "green",
    alert: "Pending Review",
    isUrgent: false,
    meds: [],
    caseId: "CASE-0943",
    status: "Pending Review",
    aiSummary: "24yo female. Chief complaint: Cystic acne, oily skin. First-time retinoid user. Seeking custom formula.",
    aiSuggestion: "Ideal candidate for customized topical formulation. Suggest starting with mild Tretinoin (0.025%) + Niacinamide + Clindamycin.",
    questionnaire: [
      { q: "Describe your skin:", a: "Very oily, deep cystic breakouts." },
      { q: "Past retinoid use:", a: "Never used retinoids before." }
    ],
    flags: [{ text: "First-time retinoid exposure.", level: "green" }]
  },
  {
    id: "case-labs",
    patientName: "Khalid Al-Ameeri",
    initials: "KA",
    email: "khalid.a@email.com",
    age: 34,
    gender: "Male",
    bmi: 26.5,
    location: "Riyadh",
    type: "Labs",
    flag: "green",
    alert: "Results Ready",
    isUrgent: false,
    meds: [],
    caseId: "CASE-1100",
    status: "Results Ready",
    aiSummary: "34yo male, purchased Advanced Panel. Results are in. Notable finding is Vitamin D deficiency at 18 ng/mL.",
    aiSuggestion: "Recommend publishing results and immediately initiating action plan for Vitamin D3 supplementation.",
    questionnaire: [
      { q: "Reason for test:", a: "General fatigue and wellness check." }
    ],
    flags: [{ text: "One abnormal biomarker flagged.", level: "yellow" }]
  }
];

export function getCaseById(id: string): CaseData | undefined {
  return casesData.find((c) => c.id === id);
}

/* ─── Flag color config ─── */

export const flagConfig = {
  red: {
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    badge: "URGENT",
    badgeBg: "rgba(220,38,38,0.1)",
    emoji: "🔴",
    sectionTitle: "Urgent — Contraindication Detected",
  },
  yellow: {
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    badge: "WARNING",
    badgeBg: "rgba(234,88,12,0.1)",
    emoji: "🟡",
    sectionTitle: "Pending Review",
  },
  green: {
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    badge: "CLEAR",
    badgeBg: "rgba(22,163,74,0.1)",
    emoji: "🟢",
    sectionTitle: "Ready to Approve",
  },
  purple: {
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    badge: "TITRATION",
    badgeBg: "rgba(124,58,237,0.1)",
    emoji: "🟣",
    sectionTitle: "Titration Due — Dose Increase Review",
  },
};

/* ─── Patients ─── */

export interface PatientData {
  id: string;
  name: string;
  initials: string;
  age: number;
  service: string;
  status: "Active" | "Paused" | "Cancelled";
  medication: string;
  nextRefill: string;
  refillOverdue?: boolean;
}

export const patientsData: PatientData[] = [
  {
    id: "p-101",
    name: "Omar Al-Rashid",
    initials: "OR",
    age: 42,
    service: "Weight Loss",
    status: "Active",
    medication: "Semaglutide 1.0mg",
    nextRefill: "Mar 1",
  },
  {
    id: "p-102",
    name: "Turki Al-Nasser",
    initials: "TN",
    age: 28,
    service: "Hair Loss",
    status: "Paused",
    medication: "Finasteride",
    nextRefill: "Overdue",
    refillOverdue: true,
  },
  {
    id: "p-103",
    name: "Ahmed M.",
    initials: "AM",
    age: 34,
    service: "Sexual Health",
    status: "Cancelled",
    medication: "None",
    nextRefill: "N/A",
  },
  {
    id: "p-104",
    name: "Sarah A.",
    initials: "SA",
    age: 48,
    service: "Relieve Menopause",
    status: "Active",
    medication: "Estradiol Patch",
    nextRefill: "Apr 15",
  },
  {
    id: "p-105",
    name: "Noura A.",
    initials: "NA",
    age: 27,
    service: "Reduce Anxiety",
    status: "Active",
    medication: "Sertraline 50mg",
    nextRefill: "Mar 10",
  },
];

/* ─── Messages / Conversations ─── */

export interface ChatMessage {
  id: string;
  from: "patient" | "doctor";
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  service?: string;
  medication?: string;
  month?: string;
  messages: ChatMessage[];
}

export const conversationsData: Conversation[] = [
  {
    id: "c1",
    name: "Omar Al-Rashid",
    initials: "OR",
    avatarBg: "#16a34a",
    preview: "Thank you doctor, the nausea is...",
    timestamp: "Today 2:15 PM",
    unread: true,
    service: "Weight Loss",
    medication: "Semaglutide 1.0mg",
    month: "Month 4",
    messages: [
      {
        id: "m1",
        from: "patient",
        text: "Hi doctor, I've been experiencing some nausea after my injection yesterday. It lasted about 4 hours. Is this normal?",
        time: "2:10 PM",
      },
      {
        id: "m2",
        from: "doctor",
        text: "Mild nausea is common in the first 1-2 days after injection, especially during titration. It usually improves over time. Try taking the injection before bed and stay hydrated.",
        time: "2:12 PM",
      },
      {
        id: "m3",
        from: "patient",
        text: "Thank you doctor, the nausea is already much better today. I'll try the bedtime injection next week.",
        time: "2:15 PM",
      },
    ],
  },
  {
    id: "c2",
    name: "Faisal Al-Otaibi",
    initials: "FA",
    avatarBg: "#ea580c",
    preview: "When should I start the injection?",
    timestamp: "Today 11:30 AM",
    unread: true,
    service: "Weight Loss",
    medication: "Semaglutide 0.25mg",
    month: "Month 1",
    messages: [
      {
        id: "m4",
        from: "patient",
        text: "Hi doctor, I received my medication package today. When should I start the injection?",
        time: "11:20 AM",
      },
      {
        id: "m5",
        from: "doctor",
        text: "Great news! You can start your first injection any day this week. Choose a day that works best as a weekly schedule. Inject subcutaneously in your abdomen, thigh, or upper arm.",
        time: "11:25 AM",
      },
      {
        id: "m6",
        from: "patient",
        text: "When should I start the injection? Should I do it morning or evening?",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: "c3",
    name: "Ahmed Al-Mansouri",
    initials: "AM",
    avatarBg: "#2563eb",
    preview: "I understand about the nitrates...",
    timestamp: "Yesterday",
    unread: false,
    service: "ED",
    medication: "Consultation",
    month: "New",
    messages: [
      {
        id: "m7",
        from: "doctor",
        text: "Ahmed, after reviewing your case, I'm unable to prescribe PDE5 inhibitors due to your current nitrate medication (Isosorbide). This is a safety contraindication.",
        time: "Yesterday 3:00 PM",
      },
      {
        id: "m8",
        from: "patient",
        text: "I understand about the nitrates. Are there any other options available for me?",
        time: "Yesterday 3:15 PM",
      },
      {
        id: "m9",
        from: "doctor",
        text: "Yes, I'd recommend discussing mechanical options with a urologist. Additionally, your BMI of 31.2 could be contributing — a weight management program may help improve symptoms over time.",
        time: "Yesterday 3:20 PM",
      },
    ],
  },
];

export const quickTemplateTexts: Record<string, string> = {
  "GLP-1 nausea tips":
    "Mild nausea is common in the first 1-2 days after injection. Try taking it before bed and stay hydrated. Eating smaller meals can also help. This usually improves within 2-3 weeks.",
  "Injection reminder":
    "Reminder: Your next injection is due this week. Please take it on your scheduled day. Inject subcutaneously in your abdomen, thigh, or upper arm. Rotate injection sites.",
  "Weigh-in reminder":
    "Please log your weight this week so we can track your progress accurately. Weigh yourself at the same time each day, preferably in the morning before eating.",
};
