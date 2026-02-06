import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Tek sözleşme sayfasını getir
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const page = await prisma.legalPage.findUnique({
            where: { slug },
        })

        if (!page) {
            return NextResponse.json(
                { error: 'Legal page not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(page)
    } catch (error) {
        console.error('Legal page fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch legal page' },
            { status: 500 }
        )
    }
}

// PUT - Sözleşme sayfasını güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        const data = await request.json()
        const { titleTr, titleEn, contentTr, contentEn, isActive } = data

        const page = await prisma.legalPage.update({
            where: { slug },
            data: {
                titleTr,
                titleEn,
                contentTr,
                contentEn,
                isActive,
            },
        })

        return NextResponse.json(page)
    } catch (error) {
        console.error('Legal page update error:', error)
        return NextResponse.json(
            { error: 'Failed to update legal page' },
            { status: 500 }
        )
    }
}

// DELETE - Sözleşme sayfasını sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params
        await prisma.legalPage.delete({
            where: { slug },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Legal page delete error:', error)
        return NextResponse.json(
            { error: 'Failed to delete legal page' },
            { status: 500 }
        )
    }
}
