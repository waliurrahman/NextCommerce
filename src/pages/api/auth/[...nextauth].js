import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { User } from 'models/User';
import dbConnect from 'lib/dbConnect';

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ username: credentials.username });
        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },

    async session(session, token) {
      session.user.id = token.userId;

      return session;
    },
  },
});
