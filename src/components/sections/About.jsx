import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn, staggerContainer } from "../../utils/animations";
import { Utensils, Award, Leaf, Sparkles } from "lucide-react";

const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const CORE_VALUES = [
  { icon: Leaf, title: "Organic Sourcing", desc: "Produce from local farms, picked at peak freshness." },
  { icon: Sparkles, title: "Seasonal Menus", desc: "Recipes that evolve with what's genuinely in season." },
  { icon: Award, title: "Trained Kitchen", desc: "A team mentored under Michelin-starred chefs." },
  { icon: Utensils, title: "Honest Cooking", desc: "No shortcuts, no artificial enhancers — ever." },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-bg-main py-28 md:py-36">
      <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gold-primary/10 blur-[120px]" />

      <div className="container mx-auto px-6">
        <div className="mb-24 grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <motion.div
            variants={fadeIn("right", 0.15)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border-subtle shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf"
                alt="Chef preparing a dish in the The Nova Table kitchen"
                className="h-[360px] w-full object-cover transition-transform duration-1000 hover:scale-105 sm:h-[440px] lg:h-[600px]"
              />
              <div className="glass-indigo absolute bottom-6 left-6 right-6 rounded-2xl border border-border-subtle p-6">
                <p className="text-center font-serif text-lg italic text-text-base">
                  "Cooking, done properly, is an act of care — not performance."
                </p>
              </div>
            </div>

            <div className="absolute -right-6 -top-6 flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 border-bg-main bg-gold-primary text-black shadow-xl">
              <span className="font-serif text-2xl font-bold">Est.</span>
              <span className="text-xs font-bold tracking-wide">2014</span>
            </div>
          </motion.div>

          {/* Narrative */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeIn("up", 0.1)}
              className="mb-4 block text-xs font-bold uppercase tracking-[0.35em] text-gold-primary"
            >
              Our Story
            </motion.span>

            <motion.h2
              variants={fadeIn("up", 0.2)}
              className="mb-8 font-serif text-4xl leading-[1.15] text-text-base sm:text-5xl md:text-6xl"
            >
              A Kitchen Built on
              <br />
              <span className="italic text-gold-primary">Patience &amp; Craft</span>
            </motion.h2>

            <motion.div variants={fadeIn("up", 0.3)} className="mb-12 space-y-5 text-text-muted">
              <p className="text-lg leading-relaxed">
                The Nova Table began in Sector 62, Bengaluru, with a simple idea: good food
                doesn't need to shout. It needs time, attention, and ingredients
                worth the effort.
              </p>
              <p className="leading-relaxed">
                Every dish that leaves our kitchen has been tasted, adjusted, and
                tasted again. We'd rather do fewer things exceptionally well than
                stretch ourselves thin chasing trends.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 border-y border-border-subtle py-10">
              <div>
                <h4 className="mb-1 font-serif text-3xl text-text-base">
                  <StatCounter end={12} suffix="+" />
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Years Open
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-serif text-3xl text-text-base">
                  <StatCounter end={18} suffix="" />
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Kitchen Team
                </p>
              </div>
              <div>
                <h4 className="mb-1 font-serif text-3xl text-text-base">
                  <StatCounter end={150} suffix="k" />
                </h4>
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  Guests Served
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CORE_VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              variants={fadeIn("up", 0.08 * i)}
              className="group rounded-3xl border border-border-subtle bg-surface p-7 transition-all hover:border-gold-primary/35"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-primary/10 text-gold-primary transition-transform group-hover:scale-110">
                <value.icon size={19} />
              </div>
              <h5 className="mb-2 font-bold text-text-base">{value.title}</h5>
              <p className="text-sm leading-relaxed text-text-muted">{value.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
