import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist additional data to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

