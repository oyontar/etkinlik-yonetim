import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const msg = await prisma.message.findUnique({
      where: { id },
      include: {
        sender:   { select: { id: true, email: true } },
        receiver: { select: { id: true, email: true } }
      }
    });
    if (!msg) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(msg), { status: 200 });
  } catch (err) {
    console.error("GET /api/messages/[id] error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { content } = await request.json();
    if (!content) {
      return new Response(JSON.stringify({ error: "content gerekli" }), { status: 400 });
    }
    const updated = await prisma.message.update({
      where: { id },
      data: { content }
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/messages/[id] error:", err);
    if (err.code === "P2025") {
      return new Response(
        JSON.stringify({ error: "Mesaj bulunamadı" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.message.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/messages/[id] error:", err);
    if (err.code === "P2025") {
      return new Response(
        JSON.stringify({ error: "Mesaj bulunamadı" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
