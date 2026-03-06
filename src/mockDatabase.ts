export const mockPatients = [
    // ----------------------------------------------------
    // MALE PERSONAS (7)
    // ----------------------------------------------------
    {
        id: "p-001",
        name: "Omar Al-Rashid",
        age: 42,
        gender: "Male",
        service: "Weight Loss",
        planName: "GLP-1 Weight Management",
        status: "Titration Due",
        flag: "purple",
        medicalHistory: ["Hypertension", "Prediabetes"],
        questionnaire: {
            "Are you currently taking any other weight loss medications?": "No",
            "Do you have a personal or family history of medullary thyroid carcinoma (MTC)?": "No",
            "What is your target weight?": "85 kg"
        },
        currentMedication: "Semaglutide 0.5mg",
        trackingData: {
            weightLog: [
                { date: "2023-11-01", weight: 105 },
                { date: "2023-12-01", weight: 101 },
                { date: "2024-01-01", weight: 98 },
                { date: "2024-02-01", weight: 96 }
            ],
            titrationTimeline: {
                "0.25mg": "Completed",
                "0.5mg": "Current",
                "1.0mg": "Upcoming"
            }
        }
    },
    {
        id: "p-002",
        name: "Ahmed Al-Mansouri",
        age: 34,
        gender: "Male",
        service: "Sexual Health",
        planName: "ED Daily Plan",
        status: "Urgent Review",
        flag: "red",
        medicalHistory: ["None"],
        questionnaire: {
            "How often do you experience difficulty maintaining an erection?": "Most of the time",
            "Are you taking any medications called nitrates, often prescribed for chest pain?": "Yes", // takesNitrates: true
            "takesNitrates": true,
            "Do you experience shortness of breath after light exercise?": "No"
        },
        currentMedication: "Tadalafil 5mg Daily",
        trackingData: {
            refillSchedule: {
                lastRefill: "2024-01-15",
                nextRefill: "2024-02-14",
                status: "Pending Doctor Approval (Nitrate interaction)"
            }
        }
    },
    {
        id: "p-003",
        name: "Turki Al-Nasser",
        age: 28,
        gender: "Male",
        service: "Hair Regrowth",
        planName: "Topical Minoxidil & Finasteride",
        status: "Pending Review",
        flag: "yellow",
        medicalHistory: ["Asthma"],
        questionnaire: {
            "When did you first notice hair thinning?": "About 2 years ago",
            "Are you experiencing any scalp itching or burning?": "Mild itching recently",
            "Is anyone in your family experiencing hair loss?": "Yes, my father"
        },
        currentMedication: "Minoxidil 5% + Finasteride 0.1% Solution",
        trackingData: {
            photoLog: [
                { date: "2023-10-15", type: "Crown", url: "https://mock.url/crown-baseline.jpg" },
                { date: "2023-10-15", type: "Hairline", url: "https://mock.url/hairline-baseline.jpg" },
                { date: "2024-01-15", type: "Crown", url: "https://mock.url/crown-month3.jpg" },
                { date: "2024-01-15", type: "Hairline", url: "https://mock.url/hairline-month3.jpg" }
            ]
        }
    },
    {
        id: "p-004",
        name: "Faisal Otaibi",
        age: 45,
        gender: "Male",
        service: "Testosterone",
        planName: "TRT Optimization Protocol",
        status: "Active",
        flag: "green",
        medicalHistory: ["Hyperlipidemia"],
        questionnaire: {
            "Are you experiencing fatigue or low energy levels?": "Improved significantly",
            "How is your sleep quality?": "Good, 7-8 hours",
            "Are you planning to have children in the future?": "No"
        },
        currentMedication: "Testosterone Cypionate 100mg/week",
        trackingData: {
            trtLog: [
                { date: "2023-11-20", totalT: 310, freeT: 6.2, libidoScore: 3 },
                { date: "2023-12-20", totalT: 550, freeT: 12.5, libidoScore: 6 },
                { date: "2024-01-20", totalT: 720, freeT: 16.8, libidoScore: 8 }
            ]
        }
    },
    {
        id: "p-005",
        name: "Khalid S.",
        age: 31,
        gender: "Male",
        service: "Mental Health",
        planName: "Anxiety Management",
        status: "Active",
        flag: "green",
        medicalHistory: ["None"],
        questionnaire: {
            "Have you experienced any thoughts of self-harm?": "No",
            "How often do you feel overwhelmed by your daily tasks?": "Sometimes",
            "Are you sleeping through the night?": "Most nights"
        },
        currentMedication: "Escitalopram 10mg",
        trackingData: {
            moodLog: [
                { date: "2024-01-01", gad7Score: 16, note: "Starting medication" },
                { date: "2024-01-15", gad7Score: 12, note: "Feeling slightly less edge" },
                { date: "2024-01-29", gad7Score: 8, note: "Significant improvement in daily functioning" },
                { date: "2024-02-12", gad7Score: 6, note: "Doing well overall" }
            ]
        }
    },
    {
        id: "p-006",
        name: "Yousef Ali",
        age: 26,
        gender: "Male",
        service: "Skincare",
        planName: "Custom Acne Rx",
        status: "Pending Review",
        flag: "green",
        medicalHistory: ["None"],
        questionnaire: {
            "Is your skin primarily dry, oily, or combination?": "Oily",
            "Are you currently using any over-the-counter acne treatments?": "Salicylic acid cleanser",
            "Have you ever taken oral isotretinoin (Accutane)?": "No"
        },
        currentMedication: "Tretinoin 0.025% + Clindamycin 1% + Niacinamide 4%",
        trackingData: {
            photoLog: [
                { date: "2024-01-10", type: "Face-Front", url: "https://mock.url/face-front-wk1.jpg" },
                { date: "2024-01-10", type: "Face-Side", url: "https://mock.url/face-side-wk1.jpg" }
            ],
            sideEffectLog: [
                { date: "2024-01-24", issue: "Mild purging and redness", severity: "Moderate", doctorNotified: true }
            ]
        }
    },
    {
        id: "p-007",
        name: "Saud Abdullah",
        age: 39,
        gender: "Male",
        service: "Labs",
        planName: "Comprehensive Male Panel",
        status: "Results Ready",
        flag: "green",
        medicalHistory: ["Obesity, Class I"],
        questionnaire: {
            "Are you currently fasting (water only for 12 hours)?": "Yes",
            "Do you take any daily supplements?": "Multivitamin",
            "Any recent changes to your diet?": "Started keto diet 2 weeks ago"
        },
        currentMedication: "None",
        trackingData: {
            biomarkers: [
                { name: "LDL", value: 110, unit: "mg/dL", status: "optimal", range: "< 130" },
                { name: "HDL", value: 45, unit: "mg/dL", status: "optimal", range: "> 40" },
                { name: "Vitamin D", value: 18, unit: "ng/mL", status: "abnormal", range: "30-100" },
                { name: "Ferritin", value: 85, unit: "ng/mL", status: "optimal", range: "24-336" },
                { name: "HbA1c", value: 5.4, unit: "%", status: "optimal", range: "< 5.7" }
            ]
        }
    },

    // ----------------------------------------------------
    // FEMALE PERSONAS (7)
    // ----------------------------------------------------
    {
        id: "p-008",
        name: "Fatima Al-Dosari",
        age: 38,
        gender: "Female",
        service: "Weight Loss",
        planName: "GLP-1 Weight Management",
        status: "Active",
        flag: "green",
        medicalHistory: ["PCOS"],
        questionnaire: {
            "Are you currently pregnant, breastfeeding, or planning to become pregnant?": "No",
            "Have you noticed any severe abdominal pain?": "No",
            "Are you engaging in regular physical activity?": "Walking 3x a week"
        },
        currentMedication: "Semaglutide 1.0mg",
        trackingData: {
            weightLog: [
                { date: "2024-01-05", weight: 88 },
                { date: "2024-01-20", weight: 85 },
                { date: "2024-02-05", weight: 83 },
                { date: "2024-02-20", weight: 81 }
            ]
        }
    },
    {
        id: "p-009",
        name: "Noura Al-Saud",
        age: 41,
        gender: "Female",
        service: "Hair Regrowth",
        planName: "Female Hair Revival",
        status: "Active",
        flag: "green",
        medicalHistory: ["Iron deficiency"],
        questionnaire: {
            "When did you first notice hair thinning?": "After my last pregnancy (3 years ago)",
            "Is your hair thinning diffuse or concentrated in one area?": "Mostly at the part line",
            "Are you taking any supplements for hair?": "Biotin"
        },
        currentMedication: "Topical Minoxidil 5%",
        trackingData: {
            photoLog: [
                { date: "2023-11-10", type: "Part Line", url: "https://mock.url/part-line-baseline.jpg" },
                { date: "2023-11-10", type: "Crown", url: "https://mock.url/crown-female-baseline.jpg" },
                { date: "2024-02-10", type: "Part Line", url: "https://mock.url/part-line-month3.jpg" },
                { date: "2024-02-10", type: "Crown", url: "https://mock.url/crown-female-month3.jpg" }
            ]
        }
    },
    {
        id: "p-010",
        name: "Aisha Rahman",
        age: 52,
        gender: "Female",
        service: "Menopause",
        planName: "HRT Optimization",
        status: "Pending Review",
        flag: "green",
        medicalHistory: ["Osteopenia"],
        questionnaire: {
            "When was your last menstrual period?": "14 months ago",
            "Have you had a mammogram in the last 12 months?": "Yes, normal",
            "Any history of blood clots or stroke?": "No"
        },
        currentMedication: "Estradiol Patch 0.05mg + Progesterone 100mg",
        trackingData: {
            symptomLog: [
                { date: "2024-01-01", hotFlashesPerDay: 8, sleepQuality: 3, notes: "Baseline" },
                { date: "2024-01-15", hotFlashesPerDay: 5, sleepQuality: 5, notes: "Slight improvement" },
                { date: "2024-01-29", hotFlashesPerDay: 2, sleepQuality: 7, notes: "Sleeping much better" },
                { date: "2024-02-12", hotFlashesPerDay: 1, sleepQuality: 8, notes: "Feeling normal again" }
            ]
        }
    },
    {
        id: "p-011",
        name: "Layla Al-Omari",
        age: 47,
        gender: "Female",
        service: "Sexual Health",
        planName: "Female Libido & Comfort",
        status: "Active",
        flag: "green",
        medicalHistory: ["Hypothyroidism"],
        questionnaire: {
            "Are you experiencing vaginal dryness or discomfort during intercourse?": "Yes, frequently",
            "Are you post-menopausal?": "Perimenopausal",
            "Do you have a history of estrogen-dependent cancer?": "No"
        },
        currentMedication: "Vaginal Estrogen Cream 0.01%",
        trackingData: {
            comfortLog: [
                { date: "2023-12-05", comfortScore: 2, notes: "Severe pain during intimacy" },
                { date: "2024-01-05", comfortScore: 6, notes: "Noticeable improvement, less dryness" },
                { date: "2024-02-05", comfortScore: 8, notes: "Comfortable, significant symptom relief" }
            ]
        }
    },
    {
        id: "p-012",
        name: "Sara Al-Qahtani",
        age: 29,
        gender: "Female",
        service: "Mental Health",
        planName: "Depression Management",
        status: "Active",
        flag: "green",
        medicalHistory: ["Migraines"],
        questionnaire: {
            "Have you experienced any thoughts of self-harm in the last week?": "No",
            "How is your appetite?": "Poor, eating less than usual",
            "Are you having trouble falling or staying asleep?": "Trouble falling asleep"
        },
        currentMedication: "Sertraline 50mg",
        trackingData: {
            phq9Log: [
                { date: "2024-01-10", phq9Score: 18, notes: "Baseline: Moderately severe depression" },
                { date: "2024-01-24", phq9Score: 14, notes: "Slightly more energy in mornings" },
                { date: "2024-02-07", phq9Score: 10, notes: "Moderate, appetite returning" },
                { date: "2024-02-21", phq9Score: 7, notes: "Mild, sleeping better now" }
            ]
        }
    },
    {
        id: "p-013",
        name: "Reem Tariq",
        age: 33,
        gender: "Female",
        service: "Skincare",
        planName: "Anti-Aging Rx",
        status: "Active",
        flag: "green",
        medicalHistory: ["None"],
        questionnaire: {
            "Are you pregnant or nursing?": "No",
            "What are your primary skin concerns?": "Fine lines and occasional breakouts",
            "Do you use a daily sunscreen?": "Yes, SPF 50 every morning"
        },
        currentMedication: "Tretinoin 0.025% + Azelaic Acid 15% + Niacinamide 4%",
        trackingData: {
            photoLog: [
                { date: "2023-10-20", type: "Face-Front", url: "https://mock.url/reem-face-wk0.jpg" },
                { date: "2024-01-20", type: "Face-Front", url: "https://mock.url/reem-face-mo3.jpg" }
            ],
            formulaDetails: {
                activeIngredients: ["Tretinoin 0.025%", "Azelaic Acid 15%", "Niacinamide 4%"],
                formulationBase: "Cream",
                applicationInstructions: "Apply a pea-sized amount every other night"
            }
        }
    },
    {
        id: "p-014",
        name: "Maha Khaled",
        age: 44,
        gender: "Female",
        service: "Labs",
        planName: "Comprehensive Female Panel",
        status: "Results Ready",
        flag: "green",
        medicalHistory: ["None"],
        questionnaire: {
            "What day of your menstrual cycle was blood drawn?": "Day 21",
            "Are you taking any hormonal birth control?": "No",
            "Are you experiencing any new symptoms like fatigue or weight changes?": "Feeling more tired recently"
        },
        currentMedication: "None",
        trackingData: {
            biomarkers: [
                { name: "Estradiol", value: 45, unit: "pg/mL", status: "abnormal", range: "Luteal phase: 43-214" },
                { name: "FSH", value: 6.2, unit: "mIU/mL", status: "optimal", range: "Luteal phase: 1.3-8.4" },
                { name: "TSH", value: 2.1, unit: "uIU/mL", status: "optimal", range: "0.4-4.0" },
                { name: "Free T3", value: 3.1, unit: "pg/mL", status: "optimal", range: "2.3-4.2" },
                { name: "Vitamin B12", value: 450, unit: "pg/mL", status: "optimal", range: "200-900" }
            ]
        }
    }
];
