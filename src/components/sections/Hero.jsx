import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fadeIn, staggerContainer } from "../../utils/animations";
import { ArrowRight, Star, Award, ChevronDown } from "lucide-react";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
];

const TRUST_SIGNALS = [
  { icon: Star, label: "4.9 / 5", sub: "Google Rating" },
  { icon: Award, label: "Michelin Inspired", sub: "Seasonal Tasting Menu" },
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-bg-main"
    >
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImg}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-bg-main/85 via-bg-main/55 to-bg-main" />
            <img
              src={HERO_IMAGES[currentImg]}
              className="h-full w-full object-cover"
              alt="The Nova Table ambiance"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="container relative z-20 mx-auto grid items-center gap-16 px-6 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-0">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center lg:text-left"
        >
          <motion.div
            variants={fadeIn("down", 0.15)}
            className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-gold-primary/25 bg-gold-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-primary lg:mx-0"
          >
            Now Open · Sector 62, Bengaluru
          </motion.div>

          <motion.h1
            variants={fadeIn("up", 0.3)}
            className="mb-6 font-serif text-4xl leading-[1.1] text-text-base sm:text-5xl md:text-6xl lg:text-7xl"
          >
            An Evening Worth
            <br />
            <span className="italic text-gold-primary">Remembering</span>
          </motion.h1>

          <motion.p
            variants={fadeIn("up", 0.45)}
            className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-text-muted lg:mx-0"
          >
            Seasonal ingredients, unhurried service, and a room designed for
            the moments worth slowing down for.
          </motion.p>

          <motion.div
            variants={fadeIn("up", 0.6)}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              to="/reservation"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-primary px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-black transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              Reserve a Table
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/menu"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-subtle bg-surface px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-text-base transition-colors hover:border-gold-primary/40 hover:text-gold-primary sm:w-auto"
            >
              View Menu
            </Link>
          </motion.div>

          {/* Trust signals — visually secondary, separated from CTAs */}
          <motion.div
            variants={fadeIn("up", 0.75)}
            className="mx-auto mt-12 flex max-w-md items-center justify-center gap-8 border-t border-border-subtle pt-8 lg:mx-0 lg:justify-start"
          >
            {TRUST_SIGNALS.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5 text-left">
                <Icon size={16} className="text-gold-primary" />
                <div>
                  <p className="font-serif text-sm italic leading-none text-text-base">
                    {label}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-text-muted">
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Decorative side card — desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hidden lg:block"
        >
          <div className="glass-indigo rounded-[2rem] border border-border-subtle p-7">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary">
              Chef's Special
            </p>
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              className="mb-6 h-60 w-full rounded-2xl object-cover grayscale transition-all duration-700 hover:grayscale-0"
              alt="Wild glazed salmon, chef's special"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-lg text-text-base">Wild Glazed Salmon</p>
                <p className="text-sm text-text-muted">Served with truffle mash</p>
              </div>
              <span className="font-serif text-xl italic text-gold-primary">₹420</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <ChevronDown size={20} className="text-text-muted/50" />
      </motion.div>
    </section>
  );
};

export default Hero;
