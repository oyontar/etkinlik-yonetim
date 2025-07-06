import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error("GET /api/categories error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name } = await request.json();
    if (!name) {
      return new Response(JSON.stringify({ error: "Kategori adı gerekli" }), { status: 400 });
    }
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
      return new Response(JSON.stringify({ error: "Bu isimde kategori zaten var" }), { status: 409 });
    }
    const category = await prisma.category.create({ data: { name } });
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (err) {
    console.error("POST /api/categories error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
