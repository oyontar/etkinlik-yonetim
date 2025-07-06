import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route.js";

async function getEvent(id) {
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const res  = await fetch(`${base}/api/events/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Etkinlik bulunamadı");
  return res.json();
}

export default async function EventDetail({ params }) {

  const { id } = await params;

  const event   = await getEvent(id);
  const session = await getServerSession(authOptions);

  const handleRegister = async () => {
    await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id, eventId: event.id })
    });
    alert("Kaydınız alındı!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{new Date(event.date).toLocaleString("tr-TR")}</p>
      <p>{event.description}</p>
      {session ? (
        <button
          onClick={handleRegister}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Etkinliğe Kayıt Ol
        </button>
      ) : (
        <p>Kaydolmak için <a href="/auth/signin" className="text-blue-600">giriş yapın</a>.</p>
      )}
    </div>
  );
}
