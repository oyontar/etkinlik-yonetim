import { getServerSession } from "next-auth";
import { authOptions }      from "@/lib/auth";  // veya doğru yolunuza göre
import "./globals.css";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="tr">
      <body>
        <header className="bg-gray-800 text-white p-4 flex justify-between">
          <h1 className="text-xl font-bold">
            <a href="/">Etkinlik Yöneticisi</a>
          </h1>
          <nav className="space-x-4">
            <a href="/">Ana Sayfa</a>
            {session ? (
              <>
                <a href="/events/new">Etkinlik Ekle</a>
                {/* Profil linki buraya ekleniyor */}
                <a href="/profile">Profilim</a>
                {session.user.role === "ADMIN" && <a href="/admin">Admin Paneli</a>}
                <a href="/api/auth/signout">Çıkış</a>
              </>
            ) : (
              <>
                <a href="/auth/signin">Giriş</a>
                <a href="/auth/signup">Kayıt Ol</a>
              </>
            )}
          </nav>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
