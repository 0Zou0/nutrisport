import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const rawUrl = process.env.POSTGRES_PRISMA_URL ?? '';

  // Extrait le project reference depuis options=reference=PROJECT_REF
  const refMatch = rawUrl.match(/[?&]options=([^&]*)/);
  const optionsDecoded = refMatch ? decodeURIComponent(refMatch[1]) : '';
  const projectRef = optionsDecoded.match(/reference=([^&\s]+)/)?.[1] ?? '';

  const results: Record<string, string> = {
    projectRef,
    snameAttempted: projectRef ? `${projectRef}.pooler.supabase.com` : 'none',
  };

  if (!projectRef) {
    results.error = 'No project ref found in options';
    return NextResponse.json(results);
  }

  // Test avec servername SNI = project-specific hostname
  const pool = new Pool({
    connectionString: rawUrl,
    ssl: {
      rejectUnauthorized: false,
      servername: `${projectRef}.pooler.supabase.com`,
    },
  });

  try {
    const r = await pool.query('SELECT current_user');
    results.read = `OK: user=${r.rows[0].current_user}`;
    await pool.query(`INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES ('_p_','2000-01-01','season-2025-2026','user-nutri',NOW(),NOW()) ON CONFLICT ("id") DO NOTHING`);
    await pool.query(`DELETE FROM "DayPlan" WHERE id='_p_'`);
    results.write = 'OK';
  } catch (e: unknown) {
    results.error = (e instanceof Error ? e.message : String(e)).slice(0, 200);
  } finally {
    await pool.end().catch(()=>{});
  }

  return NextResponse.json(results);
}
