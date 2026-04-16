import { Heart } from "lucide-react";
import { WishlistClient } from "./WishlistClient";
import { getAllProducts } from "@/lib/products/queries";

export const metadata = { title: "Wishlist" };

export default async function WishlistPage() {
  const products = await getAllProducts();
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart size={20} className="text-kyuto-pink-500" />
        <h2 className="font-heading text-2xl text-kyuto-dark">My Wishlist</h2>
      </div>
      <WishlistClient allProducts={products} />
    </div>
  );
}
