"use client"
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { typography } from "@/styles";

// Popup Component Props Type
type PopupProps = {
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    title?: string;
    description?: string;
};

// Popup Component
export default function Popup({ isModalOpen, setIsModalOpen, title = "title", description = "description" }: PopupProps): React.JSX.Element {
    // Handle Esc key press to close popup
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        // Add event listener when popup is open
        if (isModalOpen) {
            document.addEventListener("keydown", handleEscKey);
        }

        // Cleanup event listener
        return () => {
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [isModalOpen, setIsModalOpen]);

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-600"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <h2 className={`${typography.serif} ${typography.heading.large} text-black`}>
                                {title}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-black hover:text-white transition-colors ml-4"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className={`${typography.phonic} ${typography.body.medium} text-black leading-relaxed`}>
                            {description}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
