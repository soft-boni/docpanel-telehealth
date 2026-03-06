import { createContext, useContext, useState, ReactNode } from "react";
import { mockPatients } from "./mockDatabase";

export type PatientPersona = typeof mockPatients[0];

interface PersonaState {
    activePatient: PatientPersona;
    switchPersona: (id: string) => void;
}

const PersonaContext = createContext<PersonaState | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
    // Default to the first patient (Omar Al-Rashid)
    const [activePatient, setActivePatient] = useState<PatientPersona>(mockPatients[0]);

    const switchPersona = (id: string) => {
        const patient = mockPatients.find((p) => p.id === id);
        if (patient) {
            setActivePatient(patient);
        }
    };

    return (
        <PersonaContext.Provider value={{ activePatient, switchPersona }}>
            {children}
        </PersonaContext.Provider>
    );
}

export function usePersona() {
    const context = useContext(PersonaContext);
    if (!context) {
        throw new Error("usePersona must be used within a PersonaProvider");
    }
    return context;
}
