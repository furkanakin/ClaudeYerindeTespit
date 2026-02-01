import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const pageSlug = searchParams.get('pageSlug')

        if (!pageSlug) {
            return NextResponse.json(
                { error: 'pageSlug is required' },
                { status: 400 }
            )
        }

        const content = await prisma.pageContent.findMany({
            where: { pageSlug },
        })

        return NextResponse.json(content)
    } catch (error) {
        console.error('Content API GET error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch content' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { pageSlug, content } = body

        if (!pageSlug || !content) {
            return NextResponse.json(
                { error: 'pageSlug and content are required' },
                { status: 400 }
            )
        }

        // Upsert each content item
        for (const item of content) {
            await prisma.pageContent.upsert({
                where: {
                    pageSlug_key: {
                        pageSlug,
                        key: item.key,
                    },
                },
                create: {
                    pageSlug,
                    key: item.key,
                    tr: item.tr,
                    en: item.en,
                },
                update: {
                    tr: item.tr,
                    en: item.en,
                },
            })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Content API POST error:', error)
        return NextResponse.json(
            { error: 'Failed to save content' },
            { status: 500 }
        )
    }
}
