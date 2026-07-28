"use client";

import { toast } from "sonner";
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
        "relative z-10 w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
      }
    >
      <i className="fas fa-cart-plus"></i>
      Add to Cart
    </button>
  );
}
