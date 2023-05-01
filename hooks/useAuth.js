import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export const useAuth = (redirectTo = '/login') => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const tokenUser = session?.user;
  
  useEffect(() => {
    if (status === 'loading') {
      return; // do nothing while loading
    }
    
    if (!session) {
      router.replace(redirectTo);
    }
  }, [session, status, router, redirectTo]);
  
  return { session, tokenUser };
};

export const getTokenUser = async (req) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_JWT_SECRET });
  return token?.user || null;
};

export const redirectIfAuthenticated = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return;
  }

  return { props: {} };
};
