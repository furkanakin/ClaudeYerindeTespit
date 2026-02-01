import { cookies } from 'next/headers'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION_DAYS = 7

function generateToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let token = ''
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return token
}

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            return { success: false, error: 'Geçersiz kullanıcı adı veya şifre' }
        }

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
            return { success: false, error: 'Geçersiz kullanıcı adı veya şifre' }
        }

        // Create session
        const token = generateToken()
        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS)

        await prisma.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt
            }
        })

        // Set cookie
        const cookieStore = await cookies()
        cookieStore.set(SESSION_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/'
        })

        return { success: true }
    } catch (error) {
        console.error('Login error:', error)
        return { success: false, error: 'Bir hata oluştu' }
    }
}

export async function validateSession(): Promise<{ valid: boolean; userId?: string }> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

        if (!token) {
            return { valid: false }
        }

        const session = await prisma.session.findUnique({
            where: { token },
            include: { user: true }
        })

        if (!session || session.expiresAt < new Date()) {
            if (session) {
                await prisma.session.delete({ where: { id: session.id } })
            }
            return { valid: false }
        }

        return { valid: true, userId: session.userId }
    } catch (error) {
        console.error('Session validation error:', error)
        return { valid: false }
    }
}

export async function logout(): Promise<void> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

        if (token) {
            await prisma.session.deleteMany({ where: { token } })
            cookieStore.delete(SESSION_COOKIE_NAME)
        }
    } catch (error) {
        console.error('Logout error:', error)
    }
}

export async function createAdminUser(): Promise<void> {
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
        console.log('Admin user created')
    }
}
