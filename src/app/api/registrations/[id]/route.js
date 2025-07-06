import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const reg = await prisma.registration.findUnique({
      where: { id },
      include: {
        user:  { select: { id: true, email: true } },
        event: { select: { id: true, title: true } }
      }
    });
    if (!reg) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(reg), { status: 200 });
  } catch (err) {
    console.error("GET /api/registrations/[id] error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await prisma.registration.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/registrations/[id] error:", err);
    if (err.code === "P2025") {
      return new Response(
        JSON.stringify({ error: "Kayıt bulunamadı" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
