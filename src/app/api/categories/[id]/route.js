import { PrismaClient } from "@prisma/client";
import { requireAdmin } from "@/lib/requireAdmin";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return new Response(null, { status: 404 });
    return new Response(JSON.stringify(category), { status: 200 });
  } catch (err) {
    console.error("GET /api/categories/[id] error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name } = await request.json();
    if (!name) {
      return new Response(JSON.stringify({ error: "Kategori adı gerekli" }), { status: 400 });
    }
    const updated = await prisma.category.update({
      where: { id },
      data: { name }
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error("PUT /api/categories/[id] error:", err);
    if (err.code === 'P2025') {
      return new Response(JSON.stringify({ error: "Kategori bulunamadı" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const unauthorized = await requireAdmin(request);
  if (unauthorized) return unauthorized;
  try {
    const { id } = params;
    await prisma.category.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/categories/[id] error:", err);
    if (err.code === 'P2025') {
      return new Response(JSON.stringify({ error: "Kategori bulunamadı" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
