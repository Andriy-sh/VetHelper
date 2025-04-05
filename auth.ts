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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        console.log("Google Profile:", profile); // Логування профілю
        return profile;
      },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (
            !credentials?.email ||
            typeof credentials?.password !== "string"
          ) {
            throw new Error("Invalid credentials");
          }

          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              password: credentials.password, // Важливо: пароль має бути захищеним (хешування)
            },
          });

          if (!user) {
            throw new Error("No user found");
          }

          if (user.password !== credentials.password) {
            throw new Error("Password is incorrect");
          }

          return user; // Повертаємо користувача
        } catch (error) {
          console.error("Error during credentials authorization:", error); // Логування помилки
          throw error; // Перебрасываем ошибку в NextAuth
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("User in JWT callback:", user); // Логування даних користувача в JWT
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log("Session callback:", token, session); // Логування даних сесії
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Вказуємо сторінку для входу, якщо потрібно
  },
  debug: process.env.NODE_ENV === "development", // Включаємо дебаг у режимі розробки
});
