import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { User } from 'models/User';
import dbConnect from 'lib/dbConnect';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();

        const { email, password } = credentials;

        const user = await User.findOne({ email });

        if (!user || password !== user.password) {
          throw new Error('Invalid email or password');
        }

        return { email: user.email };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
