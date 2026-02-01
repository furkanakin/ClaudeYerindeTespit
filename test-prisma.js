const { PrismaClient } = require('@prisma/client');
console.log('PrismaClient type:', typeof PrismaClient);
console.log('PrismaClient keys:', Object.keys(require('@prisma/client')));
