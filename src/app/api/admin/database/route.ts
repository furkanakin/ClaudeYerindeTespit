import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Tüm veritabanı verilerini JSON olarak dışa aktar
export async function GET() {
    try {
        const [pageContents, faqs, legalPages, contactSubmissions] = await Promise.all([
            prisma.pageContent.findMany(),
            prisma.faq.findMany({ orderBy: { order: 'asc' } }),
            prisma.legalPage.findMany(),
            prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
        ])

        const backup = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            data: {
                pageContents,
                faqs,
                legalPages,
                contactSubmissions,
            }
        }

        return new NextResponse(JSON.stringify(backup, null, 2), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="yerinde-analiz-backup-${new Date().toISOString().split('T')[0]}.json"`,
            },
        })
    } catch (error) {
        console.error('Database export error:', error)
        return NextResponse.json(
            { error: 'Failed to export database' },
            { status: 500 }
        )
    }
}

// POST - JSON dosyasından veritabanına aktar
export async function POST(request: Request) {
    try {
        const backup = await request.json()

        if (!backup.data) {
            return NextResponse.json(
                { error: 'Invalid backup format' },
                { status: 400 }
            )
        }

        const results: Record<string, number> = {}

        // PageContent import
        if (backup.data.pageContents?.length) {
            // Mevcut verileri sil ve yenilerini ekle
            await prisma.pageContent.deleteMany()
            for (const item of backup.data.pageContents) {
                await prisma.pageContent.create({
                    data: {
                        id: item.id,
                        pageSlug: item.pageSlug,
                        key: item.key,
                        tr: item.tr,
                        en: item.en,
                    }
                })
            }
            results.pageContents = backup.data.pageContents.length
        }

        // FAQ import
        if (backup.data.faqs?.length) {
            await prisma.faq.deleteMany()
            for (const item of backup.data.faqs) {
                await prisma.faq.create({
                    data: {
                        id: item.id,
                        questionTr: item.questionTr,
                        answerTr: item.answerTr,
                        questionEn: item.questionEn,
                        answerEn: item.answerEn,
                        order: item.order,
                    }
                })
            }
            results.faqs = backup.data.faqs.length
        }

        // LegalPage import
        if (backup.data.legalPages?.length) {
            await prisma.legalPage.deleteMany()
            for (const item of backup.data.legalPages) {
                await prisma.legalPage.create({
                    data: {
                        id: item.id,
                        slug: item.slug,
                        titleTr: item.titleTr,
                        titleEn: item.titleEn,
                        contentTr: item.contentTr,
                        contentEn: item.contentEn,
                        isActive: item.isActive,
                    }
                })
            }
            results.legalPages = backup.data.legalPages.length
        }

        // ContactSubmission import
        if (backup.data.contactSubmissions?.length) {
            await prisma.contactSubmission.deleteMany()
            for (const item of backup.data.contactSubmissions) {
                await prisma.contactSubmission.create({
                    data: {
                        id: item.id,
                        source: item.source || 'contact',
                        firstName: item.firstName,
                        lastName: item.lastName,
                        phone: item.phone,
                        email: item.email,
                        package: item.package,
                        propertyType: item.propertyType,
                        purpose: item.purpose,
                        parcelInfo: item.parcelInfo,
                        listingUrl: item.listingUrl,
                        notes: item.notes,
                        selectedOptions: item.selectedOptions,
                        kvkkAccepted: item.kvkkAccepted,
                        isRead: item.isRead,
                        createdAt: new Date(item.createdAt),
                    }
                })
            }
            results.contactSubmissions = backup.data.contactSubmissions.length
        }

        return NextResponse.json({
            success: true,
            message: 'Database imported successfully',
            imported: results,
        })
    } catch (error) {
        console.error('Database import error:', error)
        return NextResponse.json(
            { error: 'Failed to import database' },
            { status: 500 }
        )
    }
}
