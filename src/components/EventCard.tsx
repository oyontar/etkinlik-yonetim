interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">{event.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {new Date(event.date).toLocaleString("tr-TR")}
      </p>
      <p className="mb-4 line-clamp-3">{event.description}</p>
      <div className="flex justify-between items-center">
        <a href={`/events/${event.id}`} className="text-blue-600 hover:underline">
          Detay
        </a>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {event.status}
        </span>
      </div>
    </div>
  );
}
