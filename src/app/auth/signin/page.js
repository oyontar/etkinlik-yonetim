"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get("callbackUrl") || "/";

  const [form, setForm]   = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // NextAuth'e bırakıyoruz: redirect:true
    const res = await signIn("credentials", {
      email:       form.email,
      password:    form.password,
      callbackUrl,         // burayı mutlaka geçin
      redirect:    true    // default zaten true, ama netleştirdik
    });

    // Eğer signIn hata verirse res.error ile yakalayabilirsiniz,
    // ama redirect: true ile sağlam çalışırsa bu kısma dönmez.
    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Giriş Yap</h1>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            className="w-full border p-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        {/* Şifre */}
        <div>
          <label>Şifre</label>
          <input
            type="password"
            required
            className="w-full border p-2"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}