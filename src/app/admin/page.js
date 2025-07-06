import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    // Oturum yoksa veya role ADMIN değilse
    return redirect("/auth/signin");
  }

  // Buraya yalnızca ADMIN ulaşır
  return (
    <div>
      <h1>Yönetici Paneli</h1>
      <p>Bu sayfa yalnızca ADMIN rolündeki kullanıcılar içindir.</p>
    </div>
  );
}
