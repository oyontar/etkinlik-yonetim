import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { timestamp: "desc" },
      include: {
        sender:   { select: { id: true, email: true } },
        receiver: { select: { id: true, email: true } }
      }
    });
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (err) {
    console.error("GET /api/messages error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { senderId, receiverId, content } = await request.json();
    if (!senderId || !receiverId || !content) {
      return new Response(
        JSON.stringify({ error: "senderId, receiverId ve content gerekli" }),
        { status: 400 }
      );
    }
    const msg = await prisma.message.create({
      data: { senderId, receiverId, content }
    });
    return new Response(JSON.stringify(msg), { status: 201 });
  } catch (err) {
    console.error("POST /api/messages error:", err);
    if (err.code === "P2025") {
      return new Response(
        JSON.stringify({ error: "Gönderici veya alıcı bulunamadı" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
