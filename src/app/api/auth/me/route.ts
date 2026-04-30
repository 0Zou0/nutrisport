import { type NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    // Priorité : token JWT dans le header Authorization (envoyé par le browser client)
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    let email: string | null = null;

    if (token) {
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
      }
      email = data.user.email ?? null;
    } else {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
      }
      email = data.user.email ?? null;
    }

    if (!email) {
      return NextResponse.json({ error: 'Email introuvable' }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { email },
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
