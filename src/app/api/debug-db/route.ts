import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL ?? 'NON_DEFINI';

  // Masque le mot de passe pour l'affichage
  const maskedUrl = url.replace(/:([^@]+)@/, ':***@');

  try {
    const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 8000 });
    await pool.query('SELECT 1');
    await pool.end();
    return NextResponse.json({ status: 'OK', url: maskedUrl });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ status: 'ERREUR', url: maskedUrl, error: msg }, { status: 500 });
  }
}
