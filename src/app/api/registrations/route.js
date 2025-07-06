import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const regs = await prisma.registration.findMany({
      include: {
        user:    { select: { id: true, email: true } },
        event:   { select: { id: true, title: true, date: true } }
      }
    });
    return new Response(JSON.stringify(regs), { status: 200 });
  } catch (err) {
    console.error("GET /api/registrations error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { userId, eventId } = await request.json();
    if (!userId || !eventId) {
      return new Response(
        JSON.stringify({ error: "userId ve eventId gerekli" }),
        { status: 400 }
      );
    }
    // Aynı kayıttan önlem (opsiyonel)
    const exists = await prisma.registration.findFirst({
      where: { userId, eventId }
    });
    if (exists) {
      return new Response(
        JSON.stringify({ error: "Zaten kayıtlısınız" }),
        { status: 409 }
      );
    }
    const reg = await prisma.registration.create({
      data: { userId, eventId }
    });
    return new Response(JSON.stringify(reg), { status: 201 });
  } catch (err) {
    console.error("POST /api/registrations error:", err);
    // Event veya User bulunamazsa
    if (err.code === "P2025") {
      return new Response(
        JSON.stringify({ error: "User veya Event bulunamadı" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
