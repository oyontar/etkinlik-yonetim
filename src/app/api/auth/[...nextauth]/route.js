import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
