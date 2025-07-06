"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

export default function NewEventPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    categoryId: ""
  });
  const [error, setError] = useState("");

  // 1. Kategorileri çek
  useEffect(() => {
    fetch(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setError("Kategoriler yüklenemedi"));
  }, []);

  // 2. Oturum kontrolü
  if (status === "loading") return <p>Yükleniyor…</p>;
  if (!session) {
    signIn(); // giriş sayfasına yönlendir
    return null;
  }

  // 3. Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      ...form,
      date: new Date(form.date).toISOString(),
      organizerId: session.user.id
    };
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.error || "Etkinlik oluşturulamadı");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl mb-4">Yeni Etkinlik Oluştur</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Başlık</label>
          <input
            type="text"
            required
            className="w-full border p-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1">Açıklama</label>
          <textarea
            required
            className="w-full border p-2"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1">Tarih ve Saat</label>
          <input
            type="datetime-local"
            required
            className="w-full border p-2"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div>
          <label className="block mb-1">Kategori</label>
          <select
            required
            className="w-full border p-2"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">-- Kategori Seçin --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Oluştur
        </button>
      </form>
    </div>
  );
}
