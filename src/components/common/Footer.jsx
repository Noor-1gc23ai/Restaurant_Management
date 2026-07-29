import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  MapPin, Send, ArrowUp, Globe,
  Clock, ExternalLink, Sparkles
} from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { cn } from "../../utils/utils";
import { getRestaurantStatus } from "../../utils/helpers";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Menu", path: "/menu" },
  { name: "Reservation", path: "/reservation" },
  { name: "Order", path: "/order" },
  { name: "Contact", path: "/contact" },
];

const SOCIAL_LINKS = [
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebook, href: "#", label: "Facebook" },
  { Icon: FaTwitter, href: "#", label: "Twitter" },
  { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
];

const MagneticButton = ({ children }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - (left + width / 2));
    y.set(clientY - (top + height / 2));
  };

  const mouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div onMouseMove={mouseMove} onMouseLeave={mouseLeave} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const { status } = getRestaurantStatus();
  const isOpen = status === "Open Now";

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter an email address to subscribe.");
      return;
    }
    toast.success("You're on the list — thank you!");
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-bg-dark pb-8 pt-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-primary/8 blur-[120px]" />
        <div className="absolute left-0 top-1/2 h-64 w-64 rounded-full bg-gold-primary/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative mb-24"
        >
          <div className="absolute -inset-1 rounded-[3rem] bg-gold-primary/20 opacity-40 blur-xl transition duration-1000 group-hover:opacity-70" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border-subtle bg-surface p-8 backdrop-blur-3xl md:p-14">
            <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
              <div className="max-w-xl space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold-primary/20 bg-gold-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold-primary">
                  <Sparkles size={12} /> Stay in the Loop
                </div>
                <h3 className="font-serif text-3xl text-text-base md:text-5xl">
                  Hear About <span className="italic text-gold-primary">New Menus First</span>
                </h3>
                <p className="text-lg text-text-muted">
                  Seasonal menu launches and the occasional invite — nothing else.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="group/input relative w-full max-w-lg">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-border-subtle bg-bg-main/40 px-6 py-5 text-lg text-text-base outline-none transition-all focus:border-gold-primary/50 md:px-8 md:py-6"
                />
                <button
                  type="submit"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gold-primary px-10 py-4 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-gold-hover md:absolute md:bottom-2 md:right-2 md:top-2 md:mt-0 md:w-auto"
                >
                  Join <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="mb-20 grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-8">
            <div className="space-y-5">
              <h2 className="font-serif text-3xl text-text-base">
                CAFE<span className="italic text-gold-primary">NOVA</span>
              </h2>
              <p className="leading-relaxed text-text-muted">
                A neighbourhood kitchen in Sector 62, built around seasonal
                ingredients and unhurried evenings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <MagneticButton key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-surface text-text-muted transition-all duration-300",
                      "hover:border-gold-primary/30 hover:bg-gold-primary/10 hover:text-gold-primary"
                    )}
                  >
                    <Icon size={18} />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <h4 className="mb-8 flex items-center gap-3 font-serif text-lg text-text-base">
              <Globe size={18} className="text-gold-primary" /> Navigation
            </h4>
            <ul className="space-y-5">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "inline-block py-0.5 text-sm tracking-wide transition-colors",
                        isActive ? "font-bold text-gold-primary" : "text-text-muted hover:text-text-base"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h4 className="flex items-center gap-3 font-serif text-lg text-text-base">
                <MapPin size={18} className="text-gold-primary" /> The Venue
              </h4>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-gold-primary/25 text-gold-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className={`absolute h-full w-full rounded-full ${isOpen ? "animate-ping bg-emerald-400" : "bg-red-400"} opacity-75`} />
                  <span className={`relative h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
                </span>
                {status}
              </span>
            </div>

            <div className="group relative h-60 w-full overflow-hidden rounded-[2rem] shadow-inner">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gold-primary/15 opacity-40 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <iframe
                title="The Nova Table location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.11482718888!2d77.3703!3d28.6273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzM4LjMiTiA3N8KwMjInMTMuMSJF!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
                className="h-full w-full scale-105 grayscale contrast-125 transition-all duration-1000 group-hover:scale-100 group-hover:grayscale-0"
                loading="lazy"
              />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-6 right-6 z-20 translate-y-4 rounded-full bg-gold-primary p-4 text-black opacity-0 shadow-2xl transition-all group-hover:translate-y-0 group-hover:opacity-100"
                aria-label="Open in Google Maps"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Meta bar */}
        <div className="flex flex-col items-center justify-between gap-8 border-t border-border-subtle pt-10 xl:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface px-5 py-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`absolute h-full w-full animate-ping rounded-full opacity-75 ${isOpen ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className={`relative h-2.5 w-2.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-red-500"}`} />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-base">
                {isOpen ? "Open Now" : "Currently Closed"}
              </span>
            </div>
            <div className="hidden items-center gap-2 text-xs text-text-muted md:flex">
              <Clock size={14} className="text-gold-primary" />
              10:00 AM – 11:00 PM Daily
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
              <a href="/privacy" className="transition-colors hover:text-gold-primary">Privacy</a>
              <a href="/terms" className="transition-colors hover:text-gold-primary">Terms</a>
              <a href="/accessibility" className="transition-colors hover:text-gold-primary">Accessibility</a>
            </div>

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-5 py-2.5 text-text-base transition-all hover:border-gold-primary/30"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Top</span>
              <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>

        <div className="mt-14 border-t border-border-subtle/60 pt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted/60">
            © {new Date().getFullYear()} The Nova Table. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
