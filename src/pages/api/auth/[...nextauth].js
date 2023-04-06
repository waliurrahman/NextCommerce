import NextAuth from 'next-auth';
import { providers } from 'next-auth/react'; // change import statement

import { User } from 'models/User';
import dbConnect from 'lib/dbConnect';

export default NextAuth({
  providers: [
    providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      await dbConnect();

      try {
        await User.findOneAndUpdate(
          { email: user.email },
          { $set: { email: user.email } },
          { upsert: true }
        );
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
