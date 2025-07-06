import { getServerSession } from "next-auth";
import { authOptions }      from "@/lib/auth";
import { redirect }         from "next/navigation";
import AdminCategories      from "@/components/AdminCategories";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    // Geri döneceğimiz yeri parametreyle veriyoruz
    redirect(`/auth/signin?callbackUrl=${encodeURIComponent("/admin/categories")}`);
  }
  return <AdminCategories />;
}
