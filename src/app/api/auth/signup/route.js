import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  const { email, password, name, bio } = await request.json();

  if (!email || !password || !name) {
    return new Response(JSON.stringify({ error: "Eksik alan" }), { status: 400 });
  }

  // E-posta zaten var mı?
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return new Response(JSON.stringify({ error: "Email kullanımda" }), { status: 409 });
  }

  // Şifreyi hash’le
  const hash = await bcrypt.hash(password, 10);

  // Kullanıcı & profil oluştur
  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
      profile: { create: { name, bio: bio || "" } }
    },
  });

  return new Response(JSON.stringify({ status: "ok", userId: user.id }), { status: 201 });
}
