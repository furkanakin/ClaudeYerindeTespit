import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// English display path -> Turkish filesystem path mapping
const enToTrRoutes: Record<string, string> = {
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

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Only handle /en/ routes
    if (pathname.startsWith('/en/')) {
        const enPath = pathname.replace('/en', '')
        const trPath = enToTrRoutes[enPath]

        if (trPath) {
            // Rewrite to the Turkish filesystem route, keeping /en locale prefix
            const url = request.nextUrl.clone()
            url.pathname = `/en${trPath}`
            return NextResponse.rewrite(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/en/:path*'],
}
