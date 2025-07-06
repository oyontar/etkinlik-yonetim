import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const events = await prisma.event.findMany({
    include: { category: true, organizer: { select: { id: true, email: true } } }
  });
  return new Response(JSON.stringify(events), { status: 200 });
}

export async function POST(request) {
  const { title, description, date, categoryId, organizerId } = await request.json();
  if (!title || !description || !date || !categoryId || !organizerId) {
    return new Response(JSON.stringify({ error: "Eksik alan" }), { status: 400 });
  }
  const event = await prisma.event.create({
    data: { title, description, date: new Date(date), categoryId, organizerId }
  });
  return new Response(JSON.stringify(event), { status: 201 });
}
