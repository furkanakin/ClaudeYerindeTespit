require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function test() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    const prisma = new PrismaClient();
    try {
        const users = await prisma.user.findMany();
        console.log('Users:', users);
    } catch (err) {
        console.error('Error detail:', err);
    } finally {
        await prisma.$disconnect();
    }
}

test();
