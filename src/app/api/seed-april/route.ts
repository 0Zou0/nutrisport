import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Teste quelle URL accepte les writes (simple test INSERT)
export async function GET() {
  const urls = {
    POSTGRES_PRISMA_URL:      process.env.POSTGRES_PRISMA_URL,
    POSTGRES_URL:             process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    DATABASE_URL:             process.env.DATABASE_URL,
  };

  const results: Record<string, string> = {};

  for (const [name, rawUrl] of Object.entries(urls)) {
    if (!rawUrl) { results[name] = 'NOT SET'; continue; }

    // Nettoie sslmode
    const connectionString = rawUrl
      .replace(/[?&]sslmode=[^&]*/g, (m, offset, str) => (str[offset] === '?' ? '?' : ''))
      .replace(/\?$/, '');

    const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
    try {
      // Test read
      await pool.query('SELECT 1');
      // Test write : upsert innocueux sur une table existante
      await pool.query(`
        INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt")
        VALUES ('test-write-probe','2000-01-01','season-2025-2026','user-nutri',NOW(),NOW())
        ON CONFLICT ("id") DO NOTHING
      `);
      results[name] = 'READ+WRITE OK';
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      results[name] = 'ERROR: ' + msg.slice(0, 120);
    } finally {
      await pool.end().catch(() => {});
    }
  }

  // Nettoyage du test
  const anyWorking = Object.entries(results).find(([,v]) => v === 'READ+WRITE OK');
  if (anyWorking) {
    const rawUrl = urls[anyWorking[0] as keyof typeof urls]!;
    const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, (m, o, s) => s[o]==='?'?'?':'').replace(/\?$/,'');
    const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
    await pool.query(`DELETE FROM "DayPlan" WHERE id='test-write-probe'`).catch(()=>{});
    await pool.end().catch(()=>{});
  }

  return NextResponse.json(results);
}
