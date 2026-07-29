import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/helpers";

const CartItemRow = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();

  const itemSubtotal = item.price * item.quantity;

  return (
    <GlassCard className="p-0 border-border-subtle">
      <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-6 md:p-5">
        <div className="relative h-32 w-full overflow-hidden rounded-2xl md:h-24 md:w-28 md:flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-primary">
            {item.category}
          </p>
          <h4 className="truncate font-serif text-xl text-text-base md:text-2xl">
            {item.name}
          </h4>
          <p className="mt-1 text-sm text-text-muted">{formatPrice(item.price)} each</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-2">
            <button
              type="button"
              onClick={() => decreaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-text-base transition-colors hover:bg-surface"
              aria-label={`Decrease ${item.name}`}
            >
              <Minus size={14} />
            </button>
            <span className="min-w-8 text-center text-sm font-bold text-text-base">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => increaseQuantity(item.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-primary/15 text-text-base transition-colors hover:bg-gold-primary/15"
              aria-label={`Increase ${item.name}`}
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="min-w-28 text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              Subtotal
            </p>
            <p className="text-lg font-serif text-text-base">{formatPrice(itemSubtotal)}</p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-colors hover:border-red-500/30 hover:text-red-400"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default CartItemRow;
