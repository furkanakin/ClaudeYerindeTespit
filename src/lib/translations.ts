import prisma from './prisma';

export async function getTranslations(pageSlug: string, locale: string) {
    try {
        const content = await prisma.pageContent.findMany({
            where: { pageSlug },
        });

        const translations: Record<string, string> = {};

        // For each key, use the requested locale, fallback to TR if empty
        content.forEach((item) => {
            translations[item.key] = locale === 'en' ? (item.en || item.tr) : item.tr;
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
