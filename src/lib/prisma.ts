import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Supporte les noms de variables Vercel/Supabase marketplace et la variable classique
const connectionString =
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_URL ??
  '';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
