import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Public endpoint - Aktif sözleşme sayfasını getir
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const page = await prisma.legalPage.findUnique({
            where: { slug },
        })

        if (!page || !page.isActive) {
            return NextResponse.json(
                { error: 'Page not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            slug: page.slug,
            titleTr: page.titleTr,
            titleEn: page.titleEn,
            contentTr: page.contentTr,
            contentEn: page.contentEn,
        })
    } catch (error) {
        console.error('Legal page fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch legal page' },
            { status: 500 }
        )
    }
}
