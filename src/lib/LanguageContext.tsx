"use client";

import React, { createContext, useContext } from "react";

interface LanguageContextType {
    locale: string;
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
        return translations[key] || fallback || key;
    };

    return (
        <LanguageContext.Provider value={{ locale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        // Fallback if provider is missing (e.g. in some isolated client components)
        return {
            locale: "tr",
            t: (key: string, fallback?: string) => fallback || key,
        };
    }
    return context;
}
