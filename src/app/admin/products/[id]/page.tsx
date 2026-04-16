import { notFound } from "next/navigation";
import { getAllProducts } from "@/lib/products/queries";
import { ProductForm } from "../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const all = await getAllProducts();
  const product = all.find((p) => p.id === id);
  if (!product) notFound();

  return <ProductForm mode="edit" initial={product} />;
}
