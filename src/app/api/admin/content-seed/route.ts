import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Default content data for seeding
const defaultContent = {
    // Paket Modal içerikleri
    'paket-modal': [
        { key: 'packageConfiguratorText', tr: 'Paket Yapılandırıcı', en: 'Package Configurator' },
        { key: 'deliveryTimeLabel', tr: 'Teslim Süresi', en: 'Delivery Time' },
        { key: 'forWhomText', tr: 'Kimler için?', en: 'Who is it for?' },
        { key: 'basePriceText', tr: 'Baz Fiyat', en: 'Base Price' },
        { key: 'extraServicesText', tr: 'Ek Hizmetler', en: 'Extra Services' },
        { key: 'totalEstimatedText', tr: 'Toplam Tahmini Tutar', en: 'Total Estimated Amount' },
        { key: 'getQuoteText', tr: 'Teklif Alın', en: 'Get Quote' },
        { key: 'basedOnScopeText', tr: 'Kapsama Göre', en: 'Based on Scope' },
        { key: 'noAddonsText', tr: 'Bu paket için ek hizmet bulunmamaktadır.', en: 'No additional services available for this package.' },
        { key: 'taxLabel', tr: 'KDV', en: 'VAT' },
    ],

    // Navbar içerikleri
    'navbar': [
        { key: 'home', tr: 'Ana Sayfa', en: 'Home' },
        { key: 'about', tr: 'Hakkımızda', en: 'About Us' },
        { key: 'packages', tr: 'Paketler', en: 'Packages' },
        { key: 'faq', tr: 'SSS', en: 'FAQ' },
        { key: 'contact', tr: 'İletişim', en: 'Contact' },
        { key: 'tagline', tr: 'Gayrimenkul Analiz ve Danışmanlık', en: 'Real Estate Analysis & Consulting' },
    ],

    // Footer içerikleri
    'footer': [
        { key: 'description', tr: 'Yerinde Analiz, gayrimenkul yatırımlarınızda bilinçli kararlar vermenizi sağlayan profesyonel analiz ve danışmanlık hizmeti sunar.', en: 'Yerinde Analiz provides professional analysis and consulting services to help you make informed decisions in your real estate investments.' },
        { key: 'tagline', tr: 'Yerinde Tespit, Doğru Karar', en: 'On-site Discovery, Right Decision' },
        { key: 'email', tr: 'info@yerindeanaliz.com.tr', en: 'info@yerindeanaliz.com.tr' },
        { key: 'address', tr: 'Fethiye, Muğla', en: 'Fethiye, Muğla, Turkey' },
        { key: 'quickLinks', tr: 'Hızlı Erişim', en: 'Quick Links' },
        { key: 'contact', tr: 'İletişim', en: 'Contact' },
        { key: 'rights', tr: '© 2025 Yerinde Analiz. Tüm hakları saklıdır.', en: '© 2025 Yerinde Analiz. All rights reserved.' },
        { key: 'privacy', tr: 'Gizlilik Politikası', en: 'Privacy Policy' },
        { key: 'terms', tr: 'Kullanım Koşulları', en: 'Terms of Service' },
    ],
}

export async function GET() {
    try {
        let seededCount = 0
        let skippedCount = 0

        for (const [pageSlug, items] of Object.entries(defaultContent)) {
            for (const item of items) {
                // Check if content already exists
                const existing = await prisma.pageContent.findUnique({
                    where: {
                        pageSlug_key: {
                            pageSlug,
                            key: item.key,
                        },
                    },
                })

                if (!existing) {
                    // Create new content
                    await prisma.pageContent.create({
                        data: {
                            pageSlug,
                            key: item.key,
                            tr: item.tr,
                            en: item.en,
                        },
                    })
                    seededCount++
                } else {
                    skippedCount++
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `Content seed completed. Created: ${seededCount}, Skipped (already exists): ${skippedCount}`,
            seededCount,
            skippedCount,
        })
    } catch (error: unknown) {
        console.error('Content seed error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        return NextResponse.json(
            { error: 'Failed to seed content', details: errorMessage },
            { status: 500 }
        )
    }
}
