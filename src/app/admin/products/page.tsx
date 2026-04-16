import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getAllProducts } from "@/lib/products/queries";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { DeleteProductButton } from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl text-kyuto-dark">Products</h1>
          <p className="text-sm text-kyuto-grey mt-1">
            {products.length} products — click any row to edit.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button size="sm" className="inline-flex items-center gap-1.5">
            <Plus size={16} /> New product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-kyuto-purple-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-kyuto-pastel-cream/60 text-kyuto-grey">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">Stock</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kyuto-purple-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-kyuto-pastel-cream/30">
                <td className="px-4 py-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-kyuto-purple-50">
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="font-medium text-kyuto-dark hover:text-kyuto-purple-700"
                  >
                    {p.name}
                  </Link>
                  <div className="text-xs text-kyuto-grey">{p.slug}</div>
                </td>
                <td className="px-4 py-3 text-kyuto-grey">{p.category}</td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(p.price)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={
                      p.stock === 0
                        ? "text-red-600"
                        : p.stock < 5
                          ? "text-amber-600"
                          : "text-kyuto-dark"
                    }
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <DeleteProductButton id={p.id} name={p.name} />
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-kyuto-grey"
                >
                  No products yet —{" "}
                  <Link
                    href="/admin/products/new"
                    className="text-kyuto-purple-700 underline"
                  >
                    add your first one
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
