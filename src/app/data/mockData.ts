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
    id: "case-red",
    patientName: "Ahmed M.",
    initials: "AM",
    email: "ahmed.m@email.com",
    age: 34,
    gender: "Male",
    bmi: 31.2,
    location: "Riyadh",
    type: "Sexual Health",
    flag: "red",
    alert: "Takes nitrates",
    isUrgent: true,
    meds: [
      { name: "Metformin 1000mg", reason: "Diabetes", flagged: false },
      { name: "Isosorbide 30mg ⚠️", reason: "Angina", flagged: true },
      { name: "Amlodipine 5mg", reason: "HTN", flagged: false },
    ],
    caseId: "CASE-0847",
    timer: "⏱ 2h 15m",
    aiSummary:
      "34yo male presenting with erectile dysfunction, onset approximately 6 months ago. Reports a 70% failure rate with attempted intercourse. No prior treatments attempted. Relevant comorbidities include type 2 diabetes (controlled with Metformin), stable angina (Isosorbide Mononitrate), and hypertension (Amlodipine). BMI 31.2 — overweight classification. Nitrate use is a hard contraindication for PDE5 inhibitors.",
    aiSuggestion:
      "Cannot prescribe PDE5 inhibitors due to nitrate use. Consider alternative ED management through weight management program — patient's BMI of 31.2 may be a contributing factor. Refer to urologist for mechanical options.",
    questionnaire: [
      { q: "Do you currently take nitrates?", a: "Yes — Isosorbide Mononitrate 30mg" },
      { q: "When did ED start?", a: "About 6 months ago" },
      { q: "Previous treatments?", a: "None" },
    ],
    flags: [
      { text: "HARD STOP: Takes nitrates. PDE5 blocked.", level: "red" },
      { text: "WARNING: BP 145/92 elevated.", level: "yellow" },
    ],
  },
  {
    id: "case-yellow",
    patientName: "Khalid S.",
    initials: "KS",
    email: "khalid.s@email.com",
    age: 29,
    gender: "Male",
    bmi: 26.0,
    location: "Jeddah",
    type: "Weight Loss",
    flag: "yellow",
    alert: "BMI is 26",
    isUrgent: false,
    meds: [],
    caseId: "CASE-0851",
    timer: "⏱ 3h 40m",
    aiSummary:
      "29yo male seeking weight loss treatment. BMI 26.0 — just above the overweight threshold. No significant comorbidities reported. Patient is motivated and has tried diet and exercise with limited success over 6 months.",
    aiSuggestion:
      "BMI of 26 is borderline for pharmacological intervention. Consider Generic Semaglutide 0.25mg with standard titration. Monitor closely given BMI is near threshold. Lifestyle modifications should be primary approach.",
    questionnaire: [
      { q: "Current BMI?", a: "26.0" },
      { q: "Previous weight loss attempts?", a: "Diet and exercise for 6 months" },
      { q: "Any chronic conditions?", a: "None reported" },
    ],
    flags: [
      { text: "BMI 26 — borderline for GLP-1 therapy.", level: "yellow" },
    ],
  },
  {
    id: "case-green",
    patientName: "Faisal O.",
    initials: "FA",
    email: "faisal.o@email.com",
    age: 38,
    gender: "Male",
    bmi: 33.8,
    location: "Riyadh",
    type: "Weight Loss",
    flag: "green",
    alert: "No flags ✓",
    isUrgent: false,
    meds: [],
    caseId: "CASE-0853",
    timer: "⏱ 5h 20m",
    aiSummary:
      "38yo male with BMI 33.8, qualifying for GLP-1 therapy. No contraindications identified. No current medications. Motivated patient with clear weight loss goals. Blood pressure normal at 120/78.",
    aiSuggestion:
      "Recommended: Generic Semaglutide 0.25mg with standard titration schedule. Patient is an ideal candidate with high BMI and no contraindications. Pair with Metformin 500mg for glycemic synergy.",
    questionnaire: [
      { q: "Current BMI?", a: "33.8" },
      { q: "Any medications?", a: "None" },
      { q: "Any chronic conditions?", a: "None" },
    ],
    flags: [
      { text: "All clear — no contraindications detected.", level: "green" },
    ],
  },
  {
    id: "case-purple",
    patientName: "Omar R.",
    initials: "OR",
    email: "omar.r@email.com",
    age: 42,
    gender: "Male",
    bmi: 31.0,
    location: "Dammam",
    type: "Weight Loss",
    flag: "purple",
    alert: "Semaglutide 0.25mg → 0.5mg",
    isUrgent: false,
    meds: [
      { name: "Semaglutide 0.25mg", reason: "Weight Loss", flagged: false },
      { name: "Metformin 500mg", reason: "Add-on", flagged: false },
    ],
    caseId: "CASE-0612",
    status: "Week 4 done",
    aiSummary:
      "42yo male currently on Semaglutide 0.25mg for 4 weeks. Tolerating well with mild nausea (resolved). Weight loss of 2.1 kg since start. Ready for dose escalation per standard titration protocol.",
    aiSuggestion:
      "Patient has completed 4 weeks on 0.25mg with good tolerance. Recommend dose increase to 0.5mg per standard titration schedule. Continue Metformin 500mg as add-on.",
    questionnaire: [
      { q: "Side effects on current dose?", a: "Mild nausea first 2 days, now resolved" },
      { q: "Weight change?", a: "-2.1 kg in 4 weeks" },
      { q: "Compliance?", a: "All 4 weekly injections completed" },
    ],
    flags: [
      { text: "Titration due: 0.25mg → 0.5mg escalation.", level: "yellow" },
    ],
  },
  {
    id: "case-yellow-meno",
    patientName: "Sarah A.",
    initials: "SA",
    email: "sarah.a@email.com",
    age: 48,
    gender: "Female",
    bmi: 24.5,
    location: "Riyadh",
    type: "Relieve Menopause",
    flag: "yellow",
    alert: "Family hx of breast cancer",
    isUrgent: false,
    meds: [],
    caseId: "CASE-0899",
    timer: "⏱ 4h 10m",
    aiSummary:
      "48yo female seeking relief for severe hot flashes and night sweats. Reports family history of breast cancer (maternal aunt). Otherwise healthy.",
    aiSuggestion:
      "Due to family history of breast cancer, systemic HRT requires careful consideration. Consider non-hormonal options like SSRIs/SNRIs first, or refer for mammogram before initiating estradiol.",
    questionnaire: [
      { q: "Main symptoms?", a: "Hot flashes 5-6 times a day, waking up drenched in sweat." },
      { q: "Family history of cancer?", a: "Yes, aunt had breast cancer at age 60." },
    ],
    flags: [
      { text: "Review required due to family cancer history.", level: "yellow" },
    ],
  },
  {
    id: "case-green-hair",
    patientName: "Layla M.",
    initials: "LM",
    email: "layla.m@email.com",
    age: 32,
    gender: "Female",
    bmi: 22.1,
    location: "Jeddah",
    type: "Grow Fuller Hair",
    flag: "green",
    alert: "No flags ✓",
    isUrgent: false,
    meds: [],
    caseId: "CASE-0902",
    timer: "⏱ 1h 20m",
    aiSummary:
      "32yo female experiencing diffuse hair thinning over the last 8 months. No recent stress events or dietary restrictions. Labs WNL.",
    aiSuggestion:
      "Clear candidate for Topical Minoxidil 5%. Safe to prescribe. No contraindications.",
    questionnaire: [
      { q: "Describe your hair loss", a: "General thinning everywhere, especially at the part." },
      { q: "Currently pregnant or nursing?", a: "No." },
    ],
    flags: [
      { text: "All clear — suitable for topical treatment.", level: "green" },
    ],
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
