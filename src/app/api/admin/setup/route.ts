import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
    const results: string[] = []

    try {
        // Test connection
        await prisma.$connect()
        results.push('✅ Database connection successful')

        // Create tables using raw SQL
        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
        results.push('✅ User table created')

        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "expiresAt" TIMESTAMP(3) NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
      )
    `)
        results.push('✅ Session table created')

        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ContactSubmission" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "package" TEXT NOT NULL,
        "propertyType" TEXT NOT NULL,
        "purpose" TEXT,
        "parcelInfo" TEXT,
        "listingUrl" TEXT,
        "notes" TEXT,
        "kvkkAccepted" BOOLEAN NOT NULL DEFAULT false,
        "isRead" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `)
        results.push('✅ ContactSubmission table created')

        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "PageContent" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "pageSlug" TEXT NOT NULL,
        "key" TEXT NOT NULL,
        "tr" TEXT NOT NULL,
        "en" TEXT NOT NULL,
        CONSTRAINT "PageContent_pageSlug_key_key" UNIQUE ("pageSlug", "key")
      )
    `)
        results.push('✅ PageContent table created')

        // Create admin user
        const existingUser = await prisma.user.findUnique({
            where: { username: 'yerindeanaliz' }
        })

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('analizyerindeqwer1928', 10)
            await prisma.user.create({
                data: {
                    username: 'yerindeanaliz',
                    password: hashedPassword
                }
            })
            results.push('✅ Admin user created (yerindeanaliz)')
        } else {
            results.push('ℹ️ Admin user already exists')
        }

        return NextResponse.json({
            success: true,
            message: 'Database setup completed!',
            results
        })

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        results.push(`❌ Error: ${errorMessage}`)

        return NextResponse.json({
            success: false,
            error: errorMessage,
            results
        }, { status: 500 })
    }
}
