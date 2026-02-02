"use client";

import React, { createContext, useContext } from "react";

interface LanguageContextType {
    locale: string;
    translations: Record<string, string>;
    t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({
    children,
    locale,
    translations,
}: {
    children: React.ReactNode;
    locale: string;
    translations: Record<string, string>;
}) {
    const t = (key: string, fallback?: string) => {
        // Return translation if exists, otherwise fallback, otherwise key
        return translations[key] || fallback || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, translations, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        // Fallback if provider is missing
        return {
            locale: "tr",
            translations: {} as Record<string, string>,
            t: (key: string, fallback?: string) => fallback || key,
        };
    }
    return context;
}
