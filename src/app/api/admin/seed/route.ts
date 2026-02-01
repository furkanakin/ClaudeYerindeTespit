import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { username: 'yerindeanaliz' }
        })

        if (existingUser) {
            return NextResponse.json({ message: 'Admin user already exists' })
        }

        const hashedPassword = await bcrypt.hash('analizyerindeqwer1928', 10)
        await prisma.user.create({
            data: {
                username: 'yerindeanaliz',
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: 'Admin user created successfully' })
    } catch (error) {
        console.error('Seed error:', error)
        return NextResponse.json(
            { error: 'Failed to create admin user' },
            { status: 500 }
        )
    }
}
