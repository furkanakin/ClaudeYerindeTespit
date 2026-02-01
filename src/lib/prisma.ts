import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Prisma 7 requires datasourceUrl in client options
const prismaClientSingleton = () => {
    return new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL || 'file:./prisma/dev.db',
    });
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
