import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Priorité : variables Supabase marketplace (Supavisor), puis DATABASE_URL classique
const rawUrl =
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_URL_NON_POOLING ??
  process.env.DATABASE_URL ??
  '';

// Supprime sslmode= de l'URL pour qu'on puisse le gérer via l'option ssl
const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, (m, offset, str) => {
  const isFirst = str[offset] === '?';
  return isFirst ? '?' : '';
}).replace(/\?$/, '');

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
