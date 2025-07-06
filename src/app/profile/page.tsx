import { getServerSession } from "next-auth";
import { authOptions }      from "@/lib/auth";
import { redirect }         from "next/navigation";
import { PrismaClient }     from "@prisma/client";
import React                from "react";

const prisma = new PrismaClient();

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent("/profile")}`);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile:       true,
      registrations: { include: { event: true } },
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profilim</h1>
      <div className="mb-6">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>İsim:</strong> {user?.profile?.name ?? "—"}</p>
        <p><strong>Bio:</strong> {user?.profile?.bio ?? "—"}</p>
      </div>
      <h2 className="text-xl font-semibold mb-2">Kayıtlı Etkinlikler</h2>
      {user?.registrations.length === 0 ? (
        <p>Henüz hiçbir etkinliğe kayıt olmadınız.</p>
      ) : (
        <ul className="list-disc list-inside space-y-2">
          {user.registrations.map((reg) => (
            <li key={reg.id}>
              <a
                href={`/events/${reg.event.id}`}
                className="text-blue-600 hover:underline"
              >
                {reg.event.title}
              </a>{" "}
              — {new Date(reg.event.date).toLocaleString("tr-TR")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


