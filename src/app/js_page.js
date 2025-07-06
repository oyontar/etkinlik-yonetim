import EventCard from "@/components/EventCard";

async function getEvents() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/events`, { cache: "no-store" });
  if (!res.ok) throw new Error("Etkinlikler yüklenemedi");
  return res.json();
}

export default async function HomePage() {
  const events = await getEvents();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(ev => (
        <EventCard key={ev.id} event={ev} />
      ))}
    </div>
  );
}
