// SEO-friendly route path mappings for each language
// Maps language-specific paths to internal routes

export type LocaleRoutes = {
    [key: string]: string;
};

export const routeMapping: { [locale: string]: LocaleRoutes } = {
    tr: {
        '/': '/',
        '/hakkimizda': '/hakkimizda',
        '/paketler': '/paketler',
        '/sss': '/sss',
        '/iletisim': '/iletisim',
        '/gizlilik': '/gizlilik',
        '/kvkk': '/kvkk',
        '/kullanim-kosullari': '/kullanim-kosullari',
        '/sozlesmeler': '/sozlesmeler',
        '/cerez-aydinlatma': '/cerez-aydinlatma',
        '/aydinlatma': '/aydinlatma',
        '/ilgili-kisi-basvuru': '/ilgili-kisi-basvuru',
        '/iletisim-aydinlatma': '/iletisim-aydinlatma',
        '/ticari-ileti': '/ticari-ileti',
    },
    en: {
        '/': '/',
        '/about': '/hakkimizda',
        '/packages': '/paketler',
        '/faq': '/sss',
        '/contact': '/iletisim',
        '/privacy': '/gizlilik',
        '/gdpr': '/kvkk',
        '/terms': '/kullanim-kosullari',
        '/agreements': '/sozlesmeler',
        '/cookie-policy': '/cerez-aydinlatma',
        '/privacy-notice': '/aydinlatma',
        '/data-subject-request': '/ilgili-kisi-basvuru',
        '/contact-privacy': '/iletisim-aydinlatma',
        '/commercial-consent': '/ticari-ileti',
    }
};

// Reverse mapping: internal route -> locale-specific display path
export const reverseRouteMapping: { [locale: string]: { [internalPath: string]: string } } = {
    tr: {
        '/': '/',
        '/hakkimizda': '/hakkimizda',
        '/paketler': '/paketler',
        '/sss': '/sss',
        '/iletisim': '/iletisim',
        '/gizlilik': '/gizlilik',
        '/kvkk': '/kvkk',
        '/kullanim-kosullari': '/kullanim-kosullari',
        '/sozlesmeler': '/sozlesmeler',
        '/cerez-aydinlatma': '/cerez-aydinlatma',
        '/aydinlatma': '/aydinlatma',
        '/ilgili-kisi-basvuru': '/ilgili-kisi-basvuru',
        '/iletisim-aydinlatma': '/iletisim-aydinlatma',
        '/ticari-ileti': '/ticari-ileti',
    },
    en: {
        '/': '/',
        '/hakkimizda': '/about',
        '/paketler': '/packages',
        '/sss': '/faq',
        '/iletisim': '/contact',
        '/gizlilik': '/privacy',
        '/kvkk': '/gdpr',
        '/kullanim-kosullari': '/terms',
        '/sozlesmeler': '/agreements',
        '/cerez-aydinlatma': '/cookie-policy',
        '/aydinlatma': '/privacy-notice',
        '/ilgili-kisi-basvuru': '/data-subject-request',
        '/iletisim-aydinlatma': '/contact-privacy',
        '/ticari-ileti': '/commercial-consent',
    }
};

// Get the display path for a given internal path and locale
export function getLocalizedPath(internalPath: string, locale: string): string {
    const displayPath = reverseRouteMapping[locale]?.[internalPath] || internalPath;
    return `/${locale}${displayPath === '/' ? '' : displayPath}`;
}

// Get internal path from display path
export function getInternalPath(displayPath: string, locale: string): string {
    return routeMapping[locale]?.[displayPath] || displayPath;
}

// Switch locale for current path
export function switchLocalePath(currentPath: string, fromLocale: string, toLocale: string): string {
    // Remove locale prefix
    const pathWithoutLocale = currentPath.replace(`/${fromLocale}`, '') || '/';

    // Get internal path
    const internalPath = getInternalPath(pathWithoutLocale, fromLocale);

    // Get display path for target locale
    return getLocalizedPath(internalPath, toLocale);
}

// Navigation links with internal paths
export const navLinks = [
    { internalPath: '/', key: 'home' },
    { internalPath: '/hakkimizda', key: 'about' },
    { internalPath: '/paketler', key: 'packages' },
    { internalPath: '/sss', key: 'faq' },
    { internalPath: '/iletisim', key: 'contact' },
];

// Get nav links with proper display paths for locale
export function getNavLinksForLocale(locale: string) {
    return navLinks.map(link => ({
        href: getLocalizedPath(link.internalPath, locale),
        key: link.key,
        internalPath: link.internalPath,
    }));
}
