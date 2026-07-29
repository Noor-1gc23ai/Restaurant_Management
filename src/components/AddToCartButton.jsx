import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ item, className = "" }) {
  const { addToCart } = useCart();

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();

    addToCart(item);

    toast.success(`${item.name} added to cart`, {
      description: `₹${item.price} · tap the cart icon to checkout`,
    });
  }

  return (
    <button
      onClick={handleAddToCart}
      className={
        className ||
        "relative z-10 flex w-full items-center justify-center gap-2 rounded-lg bg-gold-primary px-4 py-2.5 font-semibold text-black transition-colors hover:bg-gold-hover"
      }
    >
      <ShoppingCart size={16} />
      Add to Cart
    </button>
  );
}
