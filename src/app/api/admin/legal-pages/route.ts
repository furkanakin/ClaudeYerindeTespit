import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Tüm sözleşme sayfalarını getir
export async function GET() {
    try {
        const pages = await prisma.legalPage.findMany({
            orderBy: { createdAt: 'asc' },
        })
        return NextResponse.json(pages)
    } catch (error) {
        console.error('Legal pages fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch legal pages' },
            { status: 500 }
        )
    }
}

// POST - Yeni sözleşme sayfası oluştur
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        const { slug, titleTr, titleEn, contentTr, contentEn, isActive } = data

        const page = await prisma.legalPage.create({
            data: {
                slug,
                titleTr,
                titleEn,
                contentTr: contentTr || '',
                contentEn: contentEn || '',
                isActive: isActive ?? true,
            },
        })

        return NextResponse.json(page)
    } catch (error) {
        console.error('Legal page create error:', error)
        return NextResponse.json(
            { error: 'Failed to create legal page' },
            { status: 500 }
        )
    }
}
