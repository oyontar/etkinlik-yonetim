import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function requireAdmin(request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new Response(
      JSON.stringify({ error: "Yetkisiz erişim" }),
      { status: 403 }
    );
  }
  return null;
}
