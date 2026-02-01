import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
    try {
        // Test database connection first
        await prisma.$connect()

        const existingUser = await prisma.user.findUnique({
            where: { username: 'yerindeanaliz' }
        })

        if (existingUser) {
            return NextResponse.json({ message: 'Admin user already exists', success: true })
        }

        const hashedPassword = await bcrypt.hash('analizyerindeqwer1928', 10)
        await prisma.user.create({
            data: {
                username: 'yerindeanaliz',
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: 'Admin user created successfully', success: true })
    } catch (error: unknown) {
        console.error('Seed error:', error)

        const errorMessage = error instanceof Error ? error.message : 'Unknown error'

        // Check if it's a table not found error
        if (errorMessage.includes('does not exist') || errorMessage.includes('P2021')) {
            return NextResponse.json(
                {
                    error: 'Database tables do not exist. Please run: npx prisma db push',
                    details: errorMessage
                },
                { status: 500 }
            )
        }

        // Check if it's a connection error
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
            { error: 'Failed to create admin user', details: errorMessage },
            { status: 500 }
        )
    }
}
