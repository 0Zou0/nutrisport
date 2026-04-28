import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email! },
      select: { id: true, name: true, role: true, email: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'Utilisateur introuvable en base' }, { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (err) {
    console.error('[/api/auth/me]', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
