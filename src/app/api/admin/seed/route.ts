import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const defaultLegalPages = [
    { slug: "kullanim-kosullari", titleTr: "Kullanım Koşulları", titleEn: "Terms of Use" },
    { slug: "cerez-aydinlatma", titleTr: "Çerez Aydınlatma Metni", titleEn: "Cookie Policy" },
    { slug: "aydinlatma", titleTr: "Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metni", titleEn: "Privacy Notice" },
    { slug: "ilgili-kisi-basvuru", titleTr: "İlgili Kişi Başvuru Formu", titleEn: "Data Subject Request Form" },
    { slug: "iletisim-aydinlatma", titleTr: "İletişim Formu Aydınlatma Metni", titleEn: "Contact Form Privacy Notice" },
    { slug: "ticari-ileti", titleTr: "Elektronik Ticari İleti Aydınlatma ve Açık Rıza Metni", titleEn: "Commercial Electronic Message Consent" },
]

export async function GET() {
    try {
        await prisma.$connect()

        const results: string[] = []

        // 1. Admin user
        const existingUser = await prisma.user.findUnique({
            where: { username: 'yerindeanaliz' }
        })

        if (existingUser) {
            results.push('Admin user already exists')
        } else {
            const hashedPassword = await bcrypt.hash('analizyerindeqwer1928', 10)
            await prisma.user.create({
                data: {
                    username: 'yerindeanaliz',
                    password: hashedPassword
                }
            })
            results.push('Admin user created')
        }

        // 2. Default legal pages
        let legalCreated = 0
        for (const page of defaultLegalPages) {
            try {
                const existing = await prisma.legalPage.findUnique({
                    where: { slug: page.slug }
                })
                if (!existing) {
                    await prisma.legalPage.create({
                        data: {
                            slug: page.slug,
                            titleTr: page.titleTr,
                            titleEn: page.titleEn,
                            contentTr: '',
                            contentEn: '',
                            isActive: true,
                        }
                    })
                    legalCreated++
                }
            } catch {
                // Skip if table doesn't exist yet
            }
        }
        results.push(`Legal pages: ${legalCreated} created`)

        return NextResponse.json({
            message: results.join(' | '),
            success: true
        })
    } catch (error: unknown) {
        console.error('Seed error:', error)

        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        if (errorMessage.includes('does not exist') || errorMessage.includes('P2021')) {
            return NextResponse.json(
                {
                    error: 'Database tables do not exist. Please run: npx prisma db push',
                    details: errorMessage
                },
                { status: 500 }
            )
        }

        if (errorMessage.includes('connect') || errorMessage.includes('P1001')) {
            return NextResponse.json(
                {
                    error: 'Cannot connect to database. Check DATABASE_URL environment variable.',
                    details: errorMessage
                },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to seed database', details: errorMessage },
            { status: 500 }
        )
    }
}
