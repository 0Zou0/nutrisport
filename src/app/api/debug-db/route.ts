import { NextResponse } from 'next/server';
import { Pool } from 'pg';

function mask(url?: string) {
  if (!url) return 'non définie';
  return url.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
}

async function tryConnect(url: string, sslOpts?: object): Promise<{ ok: boolean; error?: string }> {
  try {
    const pool = new Pool({ connectionString: url, ssl: sslOpts, connectionTimeoutMillis: 8000 });
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
    if (!url) { results[key] = { url: 'non définie', ok: false }; continue; }
    // Test 1 : avec rejectUnauthorized:false
    const r1 = await tryConnect(url, { rejectUnauthorized: false });
    if (r1.ok) { results[key] = { url: mask(url), ok: true, ssl: 'rejectUnauthorized:false' }; continue; }
    // Test 2 : sans SSL explicite (laisse le URL gérer)
    const r2 = await tryConnect(url);
    if (r2.ok) { results[key] = { url: mask(url), ok: true, ssl: 'url-only' }; continue; }
    results[key] = { url: mask(url), ok: false, err1: r1.error, err2: r2.error };
  }

  return NextResponse.json(results);
}
