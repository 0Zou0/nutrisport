import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const rawPrismaUrl = process.env.POSTGRES_PRISMA_URL ?? '';

  // Affiche l'URL complète pour diagnostic (masque le mot de passe)
  const masked = rawPrismaUrl.replace(/:([^@]+)@/, ':***@');

  // Teste 3 variantes de nettoyage de l'URL
  const variants: Record<string, string> = {
    'raw (no change)': rawPrismaUrl,
    'strip sslmode only': rawPrismaUrl
      .replace(/[?&]sslmode=[^&]*/g, (m, o: number, s: string) => (s[o]==='?'?'?':''))
      .replace(/\?$/, ''),
    'strip sslmode+pgbouncer': rawPrismaUrl
      .replace(/[?&]sslmode=[^&]*/g, (m, o: number, s: string) => (s[o]==='?'?'?':''))
      .replace(/[?&]pgbouncer=[^&]*/g, (m, o: number, s: string) => (s[o]==='?'?'?':''))
      .replace(/\?$/, ''),
  };

  const results: Record<string, string> = { maskedUrl: masked };

  for (const [label, url] of Object.entries(variants)) {
    const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });
    try {
      const r = await pool.query('SELECT current_user, current_database()');
      results[label + ' READ'] = 'OK: ' + JSON.stringify(r.rows[0]);
      // test write
      await pool.query(`INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES ('_probe_','2000-01-01','season-2025-2026','user-nutri',NOW(),NOW()) ON CONFLICT ("id") DO NOTHING`);
      results[label + ' WRITE'] = 'OK';
      await pool.query(`DELETE FROM "DayPlan" WHERE id='_probe_'`);
    } catch (e: unknown) {
      results[label] = 'ERROR: ' + (e instanceof Error ? e.message : String(e)).slice(0, 150);
    } finally {
      await pool.end().catch(()=>{});
    }
  }

  return NextResponse.json(results);
}
