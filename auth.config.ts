import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      
      if (isAdminRoute) {
        if (isLoggedIn) {
          // Check role: SUPER_ADMIN or MANAGER or STAFF
          const role = (auth.user as any).role;
          if (role === 'SUPER_ADMIN' || role === 'MANAGER' || role === 'STAFF') {
            return true;
          }
          return false; // Redirects non-staff back to sign-in or home
        }
        return false; // Redirect to login
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  providers: [], // Add providers in auth.ts to avoid Edge Runtime issues
} satisfies NextAuthConfig;
