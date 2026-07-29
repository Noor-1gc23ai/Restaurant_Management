import { motion } from "framer-motion";
import { CheckCircle2, Clock3, ShoppingBag, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/helpers";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { getOrderById } = useCart();

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-bg-main pt-32 pb-20">
        <div className="container mx-auto px-6">
          <GlassCard className="mx-auto max-w-2xl p-8 sm:p-10 text-center">
            <h1 className="mb-4 text-2xl sm:text-3xl font-serif text-text-base">Order not found</h1>
            <p className="mb-8 text-text-muted">
              We could not find the order you requested.
            </p>
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full bg-gold-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-black">
              <ArrowLeft size={14} /> Back to Menu
            </Link>
          </GlassCard>
        </div>
      </div>
    );
  }

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(order.createdAt));

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-main pt-32 pb-20">
      <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gold-primary/15 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="mb-4 text-4xl sm:text-5xl md:text-6xl font-serif text-text-base">Order Placed</h1>
          <p className="mx-auto max-w-2xl text-text-muted">
            Your order has been confirmed. We are preparing everything for delivery.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <GlassCard className="space-y-6 p-8 lg:col-span-2">
            <div className="flex flex-col gap-3 border-b border-border-subtle pb-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-primary">Order ID</p>
                <h2 className="font-serif text-2xl text-text-base">{order.orderId}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <Clock3 size={16} className="text-gold-primary" /> {formattedDate}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif text-text-base">Ordered Items</h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-xl">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="font-serif text-lg text-text-base">{item.name}</p>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">
                          Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted">Item Total</p>
                      <p className="text-lg font-serif text-text-base">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-6 border-gold-primary/20 p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif tracking-wide text-text-base">Payment Summary</h3>
              <div className="h-1 w-12 rounded-full bg-gold-primary" />
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="font-bold uppercase tracking-widest text-text-muted">Items</span>
                <span className="text-text-base">{order.items.reduce((total, item) => total + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold uppercase tracking-widest text-text-muted">Total</span>
                <span className="font-serif text-2xl text-gold-primary">{formatPrice(order.grandTotal)}</span>
              </div>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface p-5">
              <div className="flex items-center gap-3 text-emerald-400">
                <ShoppingBag size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Success</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                We have saved your order and will start preparing it right away.
              </p>
            </div>

            <Link
              to="/menu"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gold-primary py-4 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-gold-hover"
            >
              <ArrowLeft size={14} /> Back to Menu
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
