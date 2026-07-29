import { motion, useScroll, useTransform } from "framer-motion";
import ReservationForm from "../components/sections/ReservationForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Star } from "lucide-react";

const Reservation = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const contactInfo = [
    { icon: <MapPin size={24} />, title: "Visit Us", detail: "Sector 62, Bengaluru", sub: "Gautam Buddha Nagar, UP" },
    { icon: <Phone size={24} />, title: "Call Us", detail: "+91 96209 96689", sub: "Mon - Sun, 10am - 11pm" },
    { icon: <Mail size={24} />, title: "Email Us", detail: "hello@nova.in", sub: "Response within 24hrs" },
  ];

  const policies = [
    { icon: <Clock size={20} />, text: "15-minute grace period for arrivals" },
    { icon: <ShieldCheck size={20} />, text: "Smart casual dress code required" },
    { icon: <Star size={20} />, text: "VIP lounge available for 8+ guests" },
  ];

  return (
    <div className="relative overflow-hidden bg-bg-dark pb-24 pt-40">
      <motion.div style={{ y: y1 }} className="absolute right-[-10%] top-20 h-[500px] w-[500px] rounded-full bg-gold-primary/10 blur-[120px]" />
      <motion.div style={{ y: y2 }} className="absolute bottom-40 left-[-5%] h-[400px] w-[400px] rounded-full bg-gold-primary/8 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 space-y-6 text-center"
        >
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-block rounded-full border border-gold-primary/25 bg-gold-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-primary"
          >
            Exclusive Dining
          </motion.span>
          <h1 className="font-serif text-6xl tracking-tight text-text-base md:text-8xl">
            The <span className="italic text-gold-primary">Experience</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg font-light leading-relaxed text-text-muted">
            From intimate dinners to grand celebrations, every seat at The Nova Table
            is a journey through flavor and elegance.
          </p>
        </motion.div>

        <div className="group relative">
          <div className="pointer-events-none absolute -inset-1 rounded-[3rem] bg-gold-primary/15 opacity-40 blur-3xl" />
          <ReservationForm />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-8 border-y border-border-subtle py-12"
        >
          {policies.map((p, index) => (
            <div key={index} className="flex cursor-default items-center gap-3 text-text-muted transition-colors hover:text-gold-primary">
              <span className="rounded-lg bg-surface p-2">{p.icon}</span>
              <span className="text-sm font-medium tracking-wide">{p.text}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-32 grid gap-8 md:grid-cols-3">
          {contactInfo.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[2rem] border border-border-subtle bg-surface p-10"
            >
              <div className="absolute inset-0 bg-gold-primary/0 transition-colors duration-500 group-hover:bg-gold-primary/5" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-primary/10 text-gold-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black">
                  {item.icon}
                </div>
                <h4 className="mb-3 font-serif text-xl text-text-base">{item.title}</h4>
                <p className="mb-1 font-medium text-text-base/80">{item.detail}</p>
                <p className="text-xs uppercase tracking-widest text-text-muted">{item.sub}</p>
              </div>

              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-gold-primary/10 blur-2xl transition-all group-hover:bg-gold-primary/25" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center justify-between gap-8 rounded-[3rem] border border-border-subtle bg-surface p-12 md:flex-row"
        >
          <div className="space-y-2">
            <h3 className="font-serif text-2xl text-text-base">Opening Hours</h3>
            <p className="text-text-muted">Join us for lunch or dinner, seven days a week.</p>
          </div>
          <div className="flex gap-12">
            <div className="text-center md:text-left">
              <p className="mb-1 text-xs font-bold uppercase tracking-tighter text-gold-primary">Weekday</p>
              <p className="text-lg text-text-base">11:00 — 22:00</p>
            </div>
            <div className="border-l border-border-subtle pl-12 text-center md:text-left">
              <p className="mb-1 text-xs font-bold uppercase tracking-tighter text-gold-primary">Weekend</p>
              <p className="text-lg text-text-base">10:00 — 23:30</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reservation;
