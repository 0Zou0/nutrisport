import { NextResponse, type NextRequest } from 'next/server';

// Le middleware laisse passer toutes les requêtes.
// La protection des routes est gérée côté client via RoleContext
// (redirect vers /login si pas de session Supabase).
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
