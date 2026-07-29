import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import { fadeIn, staggerContainer } from "../utils/animations";
import { formatPrice } from "../utils/helpers";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/cart/CartItemRow";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartCount, subtotal, deliveryFee, taxAmount, grandTotal } = useCart();

  const isEmpty = cart.length === 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-main pt-32 pb-20">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-primary/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-serif text-text-base md:text-6xl">Your Cart</h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
            {cartCount} total items ready for checkout
          </p>
        </motion.div>

        {isEmpty ? (
          <motion.div variants={fadeIn("up", 0.2)} initial="initial" animate="animate">
            <GlassCard className="mx-auto max-w-2xl border-border-subtle p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-muted">
                <ShoppingBag size={40} />
              </div>
              <h2 className="mb-4 text-xl sm:text-2xl font-serif text-text-base">Your cart is empty</h2>
              <p className="mx-auto mb-8 max-w-md text-text-muted">
                Add a few dishes from the menu to start building your order.
              </p>
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-gold-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-gold-primary/10"
                >
                  Return to Menu
                </motion.button>
              </Link>
            </GlassCard>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4 lg:col-span-2"
            >
              <div className="mb-2 flex items-end justify-between border-b border-border-subtle pb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-text-base">Cart Items</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  {cartCount} Items
                </span>
              </div>

              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <CartItemRow item={item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={fadeIn("left", 0.3)}
              initial="initial"
              animate="animate"
              className="h-fit"
            >
              <GlassCard className="space-y-8 border-gold-primary/20 p-6 sm:p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif tracking-wide text-text-base">Order Summary</h3>
                  <div className="h-1 w-12 rounded-full bg-gold-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold uppercase tracking-widest text-text-muted">Subtotal</span>
                    <span className="font-medium text-text-base">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold uppercase tracking-widest text-text-muted">Delivery Fee</span>
                    <span className="font-bold uppercase tracking-tighter text-emerald-500">
                      {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold uppercase tracking-widest text-text-muted">Taxes (GST)</span>
                    <span className="font-medium text-text-base">{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="my-6 h-px bg-surface" />

                  <div className="flex items-end justify-between">
                    <span className="text-lg font-serif text-text-base">Grand Total</span>
                    <span className="text-3xl font-serif italic text-gold-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/order")}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gold-primary py-5 font-bold uppercase tracking-widest text-black shadow-xl shadow-gold-primary/10 transition-all hover:bg-gold-hover"
                  >
                    Checkout <ChevronRight size={18} />
                  </motion.button>

                  <Link
                    to="/menu"
                    className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-text-muted transition-colors hover:text-gold-primary"
                  >
                    <ArrowLeft size={14} /> Continue Browsing
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
