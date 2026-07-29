import { createContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRestaurantStatus } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import ThemeToggle from "./ThemeToggle";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Reservation", path: "/reservation" },
  { name: "Order", path: "/order" },
  { name: "Contact", path: "/contact" },
];

const WHATSAPP_NUMBER = "919620996689";
const WHATSAPP_MESSAGE = "Hello The Nova Table! I have an enquiry regarding my visit.";

const openWhatsApp = () => {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    "_blank"
  );
};

const StatusBadge = ({ compact = false }) => {
  const { status, color } = getRestaurantStatus();
  const isOpen = status === "Open Now";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${
        isOpen
          ? "border-emerald-500/25 text-emerald-500"
          : "border-red-500/25 text-red-500"
      } ${compact ? "" : color}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
            isOpen ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            isOpen ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
      </span>
      {status}
    </span>
  );
};

const CartLink = ({ cartCount, className = "" }) => (
  <NavLink
    to="/cart"
    aria-label={`View cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
    className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-base transition-colors hover:border-gold-primary/40 hover:text-gold-primary ${className}`}
  >
    <ShoppingBag size={17} />
    {cartCount > 0 && (
      <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold-primary px-1 text-[9px] font-black text-black">
        {cartCount}
      </span>
    )}
  </NavLink>
);

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border-subtle bg-bg-main/85 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-serif text-xl font-black tracking-tight text-text-base"
            onClick={() => setShowMenu(false)}
          >
            THENOVA<span className="italic text-gold-primary">TABLE</span>
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "text-gold-primary"
                      : "text-text-muted hover:text-text-base"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gold-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <span className="hidden xl:inline-flex">
              <StatusBadge />
            </span>

            <button
              type="button"
              onClick={openWhatsApp}
              aria-label="Enquire on WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-base transition-colors hover:border-gold-primary/40 hover:text-gold-primary sm:flex"
            >
              <MessageCircle size={16} />
            </button>

            <span className="hidden sm:block">
              <ThemeToggle compact />
            </span>

            <CartLink cartCount={cartCount} className="hidden sm:flex" />

            <button
              type="button"
              onClick={() => navigate("/reservation")}
              className="hidden rounded-full bg-gold-primary px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-black transition-transform hover:scale-[1.03] active:scale-95 lg:inline-flex"
            >
              Reserve a Table
            </button>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle compact />
              <CartLink cartCount={cartCount} />
              <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label={showMenu ? "Close menu" : "Open menu"}
                aria-expanded={showMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface text-text-base"
              >
                {showMenu ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-main/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8 px-6">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.35 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `font-serif text-3xl tracking-tight ${
                        isActive ? "text-gold-primary" : "text-text-base"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * NAV_LINKS.length, duration: 0.35 }}
                className="mt-4 flex items-center gap-4"
              >
                <StatusBadge compact />
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-xs font-bold uppercase tracking-widest text-text-base"
                >
                  <MessageCircle size={14} /> WhatsApp
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileMenuContext.Provider>
  );
};

export default Navbar;
