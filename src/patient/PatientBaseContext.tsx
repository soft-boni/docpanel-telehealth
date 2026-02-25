import { createContext, useContext } from "react";

/**
 * Provides the base path prefix for the Patient Panel.
 * - On production patient hostname: ""  (routes at /)
 * - On localhost: "/patient"           (routes at /patient/...)
 */
const PatientBaseContext = createContext("");

export const PatientBaseProvider = PatientBaseContext.Provider;

/** Returns the base path prefix, e.g. "" or "/patient" */
export function usePatientBase() {
    return useContext(PatientBaseContext);
}

/** Helper: prefix a patient-relative path with the base */
export function usePatientPath() {
    const base = usePatientBase();
    return (path: string) => {
        if (path === "/") return base || "/";
        return `${base}${path}`;
    };
}
