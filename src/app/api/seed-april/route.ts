import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const rawUrl = process.env.POSTGRES_PRISMA_URL ?? '';

  // Test 1 : URL brute, ssl override false
  const t1 = await testPool(rawUrl, { rejectUnauthorized: false });
  // Test 2 : URL brute, PAS de ssl override (utilise sslmode=require de l'URL + NODE_TLS_REJECT_UNAUTHORIZED=0)
  const t2 = await testPoolNoSsl(rawUrl);
  // Test 3 : URL brute, ssl: true (full verification)
  const t3 = await testPool(rawUrl, true as unknown as { rejectUnauthorized: boolean });

  return NextResponse.json({ t1, t2, t3, NODE_TLS: process.env.NODE_TLS_REJECT_UNAUTHORIZED });
}

async function testPool(url: string, sslOpt: { rejectUnauthorized: boolean } | true) {
  const pool = new Pool({ connectionString: url, ssl: sslOpt as { rejectUnauthorized: boolean } });
  try {
    const r = await pool.query('SELECT current_user');
    const user = r.rows[0].current_user;
    await pool.query(`INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES ('_p_','2000-01-01','season-2025-2026','user-nutri',NOW(),NOW()) ON CONFLICT ("id") DO NOTHING`);
    await pool.query(`DELETE FROM "DayPlan" WHERE id='_p_'`);
    return `READ+WRITE OK (user=${user})`;
  } catch (e: unknown) {
    return 'ERR: ' + (e instanceof Error ? e.message : String(e)).slice(0, 120);
  } finally {
    await pool.end().catch(()=>{});
  }
}

async function testPoolNoSsl(url: string) {
  const pool = new Pool({ connectionString: url }); // no ssl override
  try {
    const r = await pool.query('SELECT current_user');
    const user = r.rows[0].current_user;
    await pool.query(`INSERT INTO "DayPlan" ("id","date","seasonId","createdById","createdAt","updatedAt") VALUES ('_p_','2000-01-01','season-2025-2026','user-nutri',NOW(),NOW()) ON CONFLICT ("id") DO NOTHING`);
    await pool.query(`DELETE FROM "DayPlan" WHERE id='_p_'`);
    return `READ+WRITE OK (user=${user})`;
  } catch (e: unknown) {
    return 'ERR: ' + (e instanceof Error ? e.message : String(e)).slice(0, 120);
  } finally {
    await pool.end().catch(()=>{});
  }
}
