"use client";

import { useState, useEffect } from "react";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Kategorileri yükle
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Kategori yüklenemedi");
      setCategories(await res.json());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Ekle
  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Eklenemedi");
    } else {
      setName("");
      fetchCategories();
    }
  };

  // Sil
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Silme başarısız");
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  // Düzenleme başlat
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setError("");
  };

  // Güncelle
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch(`/api/categories/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Güncellenemedi");
    } else {
      setEditId(null);
      setEditName("");
      fetchCategories();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kategori Yönetimi</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Yeni Kategori Formu */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Yeni kategori adı"
          className="flex-1 border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Ekle</button>
      </form>

      {/* Kategori Listesi */}
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center border p-3 rounded">
            {editId === cat.id ? (
              <form onSubmit={handleUpdate} className="flex gap-2 flex-1">
                <input
                  type="text"
                  className="flex-1 border p-1 rounded"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
                <button className="px-3 py-1 bg-green-600 text-white rounded">Kaydet</button>
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                  İptal
                </button>
              </form>
            ) : (
              <>
                <span>{cat.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(cat)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
