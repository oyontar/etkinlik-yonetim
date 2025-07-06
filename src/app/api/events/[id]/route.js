import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // params'ı await edin
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      category: true,
      organizer: { select: { id: true, email: true } }
    }
  });
  if (!event) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(event), { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  try {
    const updated = await prisma.event.update({
      where: { id },
      data: {
        title:       data.title,
        description: data.description,
        date:        data.date ? new Date(data.date) : undefined,
        categoryId:  data.categoryId,
        status:      data.status
      }
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/events/[id] error:", err);
    if (err.code === "P2025") {
      return new Response(JSON.stringify({ error: "Event bulunamadı" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await prisma.event.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/events/[id] error:", err);
    if (err.code === "P2025") {
      return new Response(JSON.stringify({ error: "Event bulunamadı" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

