import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
            password: credentials.password,
          },
        });
        if (!user?.email) {
          throw new Error("No user found");
        }
        if (user?.password !== credentials.password) {
          throw new Error("Password is incorrect");
        }
        return user;
      },
    }),
  ],
});
