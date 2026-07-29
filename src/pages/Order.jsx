import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  CreditCard,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard";
import { fadeIn, staggerContainer } from "../utils/animations";
import { formatPrice } from "../utils/helpers";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/cart/CartItemRow";

const Order = () => {
  const navigate = useNavigate();
  const { cart, subtotal, deliveryFee, taxAmount, grandTotal, placeOrder } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const isEmpty = cart.length === 0;

  const steps = [
    { id: 1, name: "Cart", icon: <ShoppingBag size={14} />, active: true },
    { id: 2, name: "Details & Payment", icon: <CreditCard size={14} />, active: true },
  ];

  const validateCustomer = () => {
    const nextErrors = {};
    const trimmedName = customer.name.trim();
    const trimmedPhone = customer.phone.trim();
    const trimmedEmail = customer.email.trim();
    const trimmedAddress = customer.address.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = "Enter a valid name.";
    }

    if (!/^[0-9]{10}$/.test(trimmedPhone.replace(/\s+/g, ""))) {
      nextErrors.phone = "Enter a 10-digit phone number.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (trimmedAddress.length < 8) {
      nextErrors.address = "Enter a complete delivery address.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!validateCustomer()) {
      return;
    }

    setIsSubmitting(true);

    const order = placeOrder(customer);

    if (order) {
      navigate(`/order/success/${order.orderId}`);
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-main pt-32 pb-20">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold-primary/15 blur-[120px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Progress Stepper */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 bg-surface border border-border-subtle px-6 py-3 rounded-full">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest ${step.active ? "text-gold-primary" : "text-text-muted"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step.active ? "border-gold-primary bg-gold-primary/15" : "border-slate-800"}`}>
                    {step.id}
                  </span>
                  {step.name}
                </div>
                {idx !== steps.length - 1 && <ChevronRight size={14} className="text-text-muted" />}
              </div>
            ))}
          </div>
        </div>

        {isEmpty ? (
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="initial"
            animate="animate"
          >
            <GlassCard className="mx-auto max-w-2xl border-border-subtle p-8 sm:p-10 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-muted">
                <ShoppingBag size={40} />
              </div>
              <h3 className="mb-4 text-xl sm:text-2xl font-serif text-text-base">Your cart is empty</h3>
              <p className="mx-auto mb-8 max-w-md text-text-muted">
                Add a few dishes from the menu before starting checkout.
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
          
          {/* Left Column: Cart Items */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex justify-between items-end border-b border-border-subtle pb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-text-base">Order Items</h2>
              <span className="text-text-muted text-sm font-bold uppercase tracking-widest">
                {cart.length} Items
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div key={item.id} layout variants={fadeIn("up", 0.1)}>
                  <CartItemRow item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Summary */}
          <motion.div 
            variants={fadeIn("left", 0.3)}
            initial="initial"
            animate="animate"
            className="h-fit space-y-8"
          >
            <GlassCard className="space-y-8 border-gold-primary/20 p-6 sm:p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-serif tracking-wide text-text-base">Customer Details</h3>
                <div className="w-12 h-1 bg-gold-primary rounded-full" />
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-text-base/50">Name</label>
                    <input
                      required
                      value={customer.name}
                      onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
                      className={`mt-1 w-full rounded-xl border bg-surface px-4 py-3 text-text-base outline-none transition-all duration-300 placeholder:text-text-base/20 focus:ring-1 focus:ring-gold-primary/20 ${errors.name ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-gold-primary/20"}`}
                      placeholder="Enter full name"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-text-base/50">Phone</label>
                    <input
                      required
                      value={customer.phone}
                      onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                      className={`mt-1 w-full rounded-xl border bg-surface px-4 py-3 text-text-base outline-none transition-all duration-300 placeholder:text-text-base/20 focus:ring-1 focus:ring-gold-primary/20 ${errors.phone ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-gold-primary/20"}`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-text-base/50">Email</label>
                    <input
                      required
                      type="email"
                      value={customer.email}
                      onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                      className={`mt-1 w-full rounded-xl border bg-surface px-4 py-3 text-text-base outline-none transition-all duration-300 placeholder:text-text-base/20 focus:ring-1 focus:ring-gold-primary/20 ${errors.email ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-gold-primary/20"}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-text-base/50">Address</label>
                    <textarea
                      required
                      rows={4}
                      value={customer.address}
                      onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
                      className={`mt-1 w-full rounded-xl border bg-surface px-4 py-3 text-text-base outline-none transition-all duration-300 placeholder:text-text-base/20 focus:ring-1 focus:ring-gold-primary/20 ${errors.address ? "border-red-500 focus:border-red-500" : "border-border-subtle focus:border-gold-primary/20"}`}
                      placeholder="Enter delivery address"
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest font-bold">Subtotal</span>
                    <span className="text-text-base font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest font-bold">Delivery Fee</span>
                    <span className="text-emerald-500 font-bold tracking-tighter uppercase">
                      {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted uppercase tracking-widest font-bold">Taxes (GST)</span>
                    <span className="text-text-base font-medium">{formatPrice(taxAmount)}</span>
                  </div>

                  <div className="h-px bg-surface my-6" />

                  <div className="flex justify-between items-end">
                    <span className="text-text-base font-serif text-lg">Grand Total</span>
                    <span className="text-3xl text-gold-primary font-serif italic">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <motion.button 
                  type="submit"
                  disabled={isEmpty || isSubmitting}
                  whileHover={!isEmpty && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isEmpty && !isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-gold-primary/10 ${
                    isEmpty || isSubmitting
                      ? "bg-surface text-text-muted cursor-not-allowed"
                      : "bg-gold-primary text-black hover:bg-gold-hover"
                  }`}
                >
                  {isSubmitting ? "Placing Order..." : <>Place Order <ChevronRight size={18} /></>}
                </motion.button>

                <p className="text-[10px] text-center text-text-muted uppercase tracking-[0.2em] font-bold">
                    Secure order confirmation
                </p>
              </form>
            </GlassCard>

            {/* Back Link */}
            <Link to="/cart" className="flex items-center justify-center gap-2 text-text-muted hover:text-gold-primary transition-colors text-xs font-bold uppercase tracking-widest group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Continue Browsing
            </Link>
          </motion.div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Order;