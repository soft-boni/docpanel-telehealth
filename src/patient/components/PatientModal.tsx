import { useEffect } from "react";
import { X } from "lucide-react";

interface PatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function PatientModal({ isOpen, onClose, title, children }: PatientModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-auto"
            style={{
                fontFamily: "var(--font-sans)",
            }}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 transition-opacity bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="relative flex flex-col w-full bg-white shadow-2xl md:w-[480px] md:max-h-[85vh] md:rounded-2xl transition-transform"
                style={{
                    maxHeight: "90vh",
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-[#e2e6ef]">
                    <h3 className="text-[1.05rem] font-bold text-[#1a1d2e] tracking-tight">{title}</h3>
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-[#f3f4f8] text-[#8892a8] hover:text-[#1a1d2e] hover:bg-[#e2e6ef] transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content (Scrollable) */}
                <div className="flex-1 p-5 md:p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
