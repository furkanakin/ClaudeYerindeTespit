import { NextRequest, NextResponse } from 'next/server'
import { login, logout } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password } = body

        if (!username || !password) {
            return NextResponse.json(
                { success: false, error: 'Kullanıcı adı ve şifre gerekli' },
                { status: 400 }
            )
        }

        const result = await login(username, password)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Auth API error:', error)
        return NextResponse.json(
            { success: false, error: 'Bir hata oluştu' },
            { status: 500 }
        )
    }
}

export async function DELETE() {
    try {
        await logout()
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Logout API error:', error)
        return NextResponse.json(
            { success: false, error: 'Bir hata oluştu' },
            { status: 500 }
        )
    }
}
