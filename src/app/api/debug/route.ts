import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const result: Record<string, unknown> = {
    env: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) + '...',
    },
    supabase: null,
    prisma: null,
  };

  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    result.supabase = {
      ok: !error && !!user,
      email: user?.email ?? null,
      error: error?.message ?? null,
    };
  } catch (e) {
    result.supabase = { ok: false, error: String(e) };
  }

  try {
    const count = await prisma.user.count();
    result.prisma = { ok: true, userCount: count };
  } catch (e) {
    result.prisma = { ok: false, error: String(e) };
  }

  return NextResponse.json(result);
}
