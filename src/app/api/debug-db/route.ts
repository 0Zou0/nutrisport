import { NextResponse } from 'next/server';
import { Pool } from 'pg';

function mask(url?: string) {
  if (!url) return 'non définie';
  return url.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
}

async function tryConnect(url: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 8000 });
    await pool.query('SELECT 1');
    await pool.end();
    return { ok: true };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export async function GET() {
  const vars = {
    DATABASE_URL: process.env.DATABASE_URL,
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
  };

  const results: Record<string, unknown> = {};
  for (const [key, url] of Object.entries(vars)) {
    results[key] = { url: mask(url), ...(url ? await tryConnect(url) : { ok: false, error: 'non définie' }) };
  }

  return NextResponse.json(results);
}
