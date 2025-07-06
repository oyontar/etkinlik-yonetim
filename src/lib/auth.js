import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"},
  providers: [
    CredentialsProvider({
      name: "E-posta/Şifre",
      credentials: {
        email:    { label: "E-posta", type: "email" },
        password: { label: "Şifre",   type: "password" }
      },
      async authorize(credentials) {
    const { email, password } = credentials ?? {};
    if (!email || !password) return null;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    // Sadece dönmek istediğiniz alanları verin
    return { id: user.id, email: user.email, role: user.role };
  }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
};
