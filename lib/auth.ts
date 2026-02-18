import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firebaseUser: { label: "Firebase User", type: "text" },
      },
      async authorize(credentials) {
        // Handle Firebase user login
        if (credentials?.firebaseUser) {
          try {
            const user = JSON.parse(credentials.firebaseUser);
            return {
              id: user.uid || user.email || "firebase-user",
              email: user.email,
              name: user.displayName || user.name,
              image: user.photoURL || user.photoURL,
            };
          } catch (error) {
            return null;
          }
        }

        // Handle regular credentials login
        if (credentials?.email && credentials?.password) {
          // Here you can add your own logic to verify credentials
          // For now, just create a session with the provided credentials
          return {
            id: credentials.email,
            email: credentials.email,
            name: "User",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).uid = token.sub || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
