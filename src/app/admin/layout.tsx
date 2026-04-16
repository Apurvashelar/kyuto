import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminUser } from "@/lib/auth/admin";

export const metadata = { title: "Admin" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) redirect("/login?next=/admin/products");

  return (
    <div className="min-h-screen bg-kyuto-pastel-cream/40">
      <header className="bg-white border-b border-kyuto-purple-100">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/products" className="font-heading text-xl text-kyuto-dark">
              Kyuto Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/admin/products"
                className="text-kyuto-grey hover:text-kyuto-purple-700"
              >
                Products
              </Link>
            </nav>
          </div>
          <div className="text-xs text-kyuto-grey">{user.email}</div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
