import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from './prisma';
import { randomBytes } from 'crypto';

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function createSession(userId: string): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    await prisma.session.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    });

    return token;
}

export async function validateSession(token: string) {
    const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!session) return null;
    if (session.expiresAt < new Date()) {
        await prisma.session.delete({ where: { id: session.id } });
        return null;
    }

    return session.user;
}

export async function deleteSession(token: string): Promise<void> {
    await prisma.session.deleteMany({ where: { token } });
}

export async function login(username: string, password: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) return null;

    return createSession(user.id);
}

export async function getSessionFromCookies() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;
    return validateSession(token);
}

export async function ensureAdminUser() {
    const existingUser = await prisma.user.findUnique({
        where: { username: 'yerindeanaliz' },
    });

    if (!existingUser) {
        const hashedPassword = await hashPassword('analizyerindeqwer1928');
        await prisma.user.create({
            data: {
                username: 'yerindeanaliz',
                password: hashedPassword,
            },
        });
        console.log('Admin user created');
    }
}
