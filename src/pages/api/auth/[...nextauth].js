import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from 'lib/dbConnect';
import { User } from 'models/User';

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Credentials:', credentials); // check if email value is present
        await dbConnect();
    
        const { email, password } = credentials;
    
        const user = await User.findOne({ email });
    
        if (!user || password !== user.password) {
          throw new Error('Invalid email or password');
        }
    
        console.log('Authorized:', { email: user.email });
        return { email: user.email };
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      console.log('SignIn:', user) //check if email value is present!
      await dbConnect();
  
      try {
        await User.findOneAndUpdate(
          { email: user.email },
          { $set: { email: user.email } },
          { upsert: true }
        );
        return true;
      } catch (error) {
        console.log('Error:', error);
        return false;
      }
    },
    async session(session, user) {
      console.log('Session:', session, user);
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log('JWT:', token, user, account, profile, isNewUser);
      return token;
    },
  },
  encryption: {
    key: process.env.ENCRYPTION_KEY,
  },
});
