import { Prisma, PrismaClient } from '@prisma/client';
import env from '@env';

const logEnviroment: Record<string, Prisma.LogLevel[]> = {
    development: ['error', 'info', 'query', 'warn'],
    production: ['info'],
    test: ['error', 'info', 'query', 'warn'],
};

export const prisma = new PrismaClient({
    log: logEnviroment[env.NODE_ENV],
});
