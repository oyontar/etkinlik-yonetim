import { withAdmin } from "@/lib/withAdmin";

function ClientAdminPage() {
  return <div>"Client-side Admin İçeriği"</div>;
}

export default withAdmin(ClientAdminPage);
