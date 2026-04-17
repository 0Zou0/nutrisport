import { NextResponse } from 'next/server';

// Diagnostic : voir quelle URL est utilisée
export async function GET() {
  const vars = {
    POSTGRES_PRISMA_URL:      process.env.POSTGRES_PRISMA_URL ? 'SET (' + process.env.POSTGRES_PRISMA_URL.slice(0,60) + '...)' : 'NOT SET',
    POSTGRES_URL:             process.env.POSTGRES_URL ? 'SET (' + process.env.POSTGRES_URL.slice(0,60) + '...)' : 'NOT SET',
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING ? 'SET (' + process.env.POSTGRES_URL_NON_POOLING.slice(0,60) + '...)' : 'NOT SET',
    DATABASE_URL:             process.env.DATABASE_URL ? 'SET (' + process.env.DATABASE_URL.slice(0,60) + '...)' : 'NOT SET',
    NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED ?? 'NOT SET',
  };
  return NextResponse.json(vars);
}
