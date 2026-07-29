import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { menuData } from "../../data/menuData";
import AddToCartButton from "../AddToCartButton";
import { fadeIn, staggerContainer } from "../../utils/animations";
import GlassCard from "../ui/GlassCard";
import MenuImage from "../ui/MenuImage";
import { formatPrice } from "../../utils/helpers";
import { Flame, Star, ArrowRight } from "lucide-react";

// A curated slice, not the full catalogue — the homepage is a preview,
// the full filterable menu already lives at /menu.
const CURATED_ITEMS = menuData.slice(0, 6);

const MenuPreview = () => {
  return (
    <section id="menu" className="relative overflow-hidden bg-bg-main py-28 md:py-36">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6">
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-gold-primary">
            Chef's Selection
          </span>
          <h2 className="mb-6 font-serif text-4xl text-text-base sm:text-5xl md:text-6xl">
            A Taste of the <span className="italic text-gold-primary">Menu</span>
          </h2>
          <p className="mx-auto max-w-xl leading-relaxed text-text-muted">
            A handful of dishes our guests keep coming back for. The full menu
            has a great deal more to explore.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {CURATED_ITEMS.map((item) => (
            <motion.div key={item.id} variants={fadeIn("up", 0.05)} className="flex h-full">
              <GlassCard className="group relative flex h-full min-h-[500px] flex-col overflow-hidden border-border-subtle p-0 transition-all duration-500 hover:border-gold-primary/30">
                <div className="relative h-3/5 overflow-hidden">
                  <MenuImage
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 flex gap-2">
                    {item.tags.includes("Best Seller") && (
                      <span className="flex items-center gap-1 rounded-full bg-gold-primary/90 px-3 py-1 text-[10px] font-bold text-black backdrop-blur-md">
                        <Star size={10} fill="black" /> SIGNATURE
                      </span>
                    )}
                    {item.tags.includes("Spicy") && (
                      <span className="flex items-center gap-1 rounded-full bg-orange-500/90 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                        <Flame size={10} fill="white" /> SPICY
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full border border-border-subtle bg-black/60 px-3 py-1 backdrop-blur-md">
                    <p className="text-[10px] font-bold uppercase tracking-tight text-gold-primary">
                      {item.calories}
                    </p>
                  </div>
                </div>

                <div className="flex h-full flex-1 flex-col p-7">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-primary">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-xl text-text-base">{item.name}</h3>
                    </div>
                    <span className="whitespace-nowrap font-serif text-xl italic text-text-base">
                      {formatPrice(item.price)}
                    </span>
                  </div>

                  <div className="mb-4 h-px w-10 bg-gold-primary/40 transition-all duration-700 group-hover:w-full" />

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>

                  <div className="mt-auto">
                    <AddToCartButton item={item} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-gold-primary/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gold-primary transition-all hover:bg-gold-primary hover:text-black"
          >
            View Full Menu
            <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuPreview;
