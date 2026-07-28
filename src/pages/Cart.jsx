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
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-5xl font-serif text-white md:text-6xl">Your Cart</h1>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {cartCount} total items ready for checkout
          </p>
        </motion.div>

        {isEmpty ? (
          <motion.div variants={fadeIn("up", 0.2)} initial="initial" animate="animate">
            <GlassCard className="mx-auto max-w-2xl border-white/5 p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/5 bg-white/5 text-slate-700">
                <ShoppingBag size={40} />
              </div>
              <h2 className="mb-4 text-xl sm:text-2xl font-serif text-white">Your cart is empty</h2>
              <p className="mx-auto mb-8 max-w-md text-slate-500">
                Add a few dishes from the menu to start building your order.
              </p>
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-primary px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-primary/20"
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
              <div className="mb-2 flex items-end justify-between border-b border-white/5 pb-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white">Cart Items</h2>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
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
              <GlassCard className="space-y-8 border-primary/10 p-6 sm:p-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif tracking-wide text-white">Order Summary</h3>
                  <div className="h-1 w-12 rounded-full bg-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold uppercase tracking-widest text-slate-500">Subtotal</span>
                    <span className="font-medium text-white">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold uppercase tracking-widest text-slate-500">Delivery Fee</span>
                    <span className="font-bold uppercase tracking-tighter text-emerald-500">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold uppercase tracking-widest text-slate-500">Taxes (GST)</span>
                    <span className="font-medium text-white">{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="my-6 h-px bg-white/10" />

                  <div className="flex items-end justify-between">
                    <span className="text-lg font-serif text-white">Grand Total</span>
                    <span className="text-3xl font-serif italic text-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/order")}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/10 transition-all hover:bg-primary-dark"
                  >
                    Checkout <ChevronRight size={18} />
                  </motion.button>

                  <Link
                    to="/menu"
                    className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-primary"
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
