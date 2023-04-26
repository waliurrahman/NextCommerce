import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from 'models/User';
import dbConnect from 'lib/dbConnect';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await dbConnect();

        try {
          const user = await User.findOne({ email: credentials.username });
          if (!user) {
            return null;
          }

          const isValidPassword = await user.comparePassword(credentials.password);
          if (!isValidPassword) {
            return null;
          }

          return { id: user._id };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google') {
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
      }

      return true;
    },
  },
});
