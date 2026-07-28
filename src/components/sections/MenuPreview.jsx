import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "../../data/menuData";
import AddToCartButton from "../AddToCartButton";
import { fadeIn, staggerContainer } from "../../utils/animations";
import GlassCard from "../ui/GlassCard";
import MenuImage from "../ui/MenuImage";
import { formatPrice } from "../../utils/helpers";
import { Flame, Leaf, Star, Sparkles } from "lucide-react";

const categories = ["All", "Breakfast", "Starters", "Dinner", "Fast Food", "Sweets", "Drinks"];

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredMenu = activeTab === "All" 
    ? menuData 
    : menuData.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-32 bg-bg-main relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <motion.div 
          variants={fadeIn("up", 0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-primary" size={16} />
            <span className="text-primary uppercase tracking-[0.5em] text-xs font-bold block">
              Premium Selection
            </span>
            <Sparkles className="text-primary" size={16} />
          </div>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">
            The <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-300">Culinary</span> Gallery
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Every dish is a prototype of perfection. Explore our meticulously curated menu 
            designed for those who appreciate the finer details of gastronomy.
          </p>
        </motion.div>

        {/* Animated Filter Bar */}
        <nav className="flex flex-wrap justify-center gap-3 md:gap-6 mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="relative px-8 py-3 group overflow-hidden"
            >
              <span className={`relative z-10 text-sm font-bold tracking-widest uppercase transition-colors duration-300 ${
                activeTab === cat ? "text-white" : "text-slate-500 group-hover:text-white"
              }`}>
                {cat}
              </span>
              {activeTab === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full -z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Gallery Grid */}
        <motion.div 
          layout
          variants={staggerContainer} 
          initial="initial" 
          whileInView="animate" 
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <GlassCard className="group relative flex min-h-[520px] flex-col overflow-hidden border-white/5 p-0 transition-all duration-500 hover:border-primary/30">
                  {/* Top Image Section */}
                  <div className="relative h-3/5 overflow-hidden">
                    <MenuImage
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Floating Info Overlays */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.tags.includes("Best Seller") && (
                        <div className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star size={10} fill="white" /> ELITE
                        </div>
                      )}
                      {item.tags.includes("Spicy") && (
                        <div className="bg-orange-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Flame size={10} fill="white" /> HOT
                        </div>
                      )}
                    </div>
                    
                    {/* Calorie Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                      <p className="text-primary text-[10px] font-bold tracking-tighter uppercase">
                        {item.calories}
                      </p>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                          {item.category}
                        </p>
                        <h3 className="text-2xl text-white font-serif tracking-wide">{item.name}</h3>
                      </div>
                      <span className="text-2xl text-white/90 font-serif italic">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <div className="w-12 h-[1px] bg-primary/40 group-hover:w-full transition-all duration-700" />

                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 transition-colors group-hover:text-slate-200">
                      {item.description}
                    </p>

                    {/* Bottom Detail: Hover Reveal Text */}
                    <div className="pt-4 flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <Leaf size={14} className="text-primary" />
                      <span className="text-[10px] uppercase tracking-[0.1em] text-slate-500">
                        Crafted with organic ingredients
                      </span>
                    </div>

                    <div className="mt-auto pt-6">
                      <AddToCartButton item={item} />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuPreview;