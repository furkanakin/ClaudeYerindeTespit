import prisma from './prisma';

export async function getTranslations(pageSlug: string, locale: string) {
    try {
        const content = await prisma.pageContent.findMany({
            where: { pageSlug },
        });

        const translations: Record<string, string> = {};

        // For each key, use the requested locale. 
        // If the requested locale translation is missing in DB, we skip it 
        // effectively allowing the component-level hardcoded fallback (which might be in the correct language) to take over.
        content.forEach((item) => {
            const value = locale === 'en' ? item.en : item.tr;
            if (value) {
                translations[item.key] = value;
            }
        });

        return translations;
    } catch (error) {
        console.error('Failed to fetch translations:', error);
        // Return empty translations on database error - components should have fallbacks
        return {};
    }
}

export type Locale = 'tr' | 'en';
export const defaultLocale: Locale = 'tr';
export const locales: Locale[] = ['tr', 'en'];
