import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  Calendar,
  Users,
  Clock,
  Mail,
  User,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import bookingAnimation from "../../assets/animations/booking.json";
import { useEffect, useState } from "react";

const FIELDS = [
  { id: "name", label: "Name", icon: User, type: "text" },
  { id: "email", label: "Email", icon: Mail, type: "email" },
  { id: "phone", label: "Phone", icon: Phone, type: "tel" },
  { id: "date", label: "Date", icon: Calendar, type: "date" },
];

const inputClass =
  "w-full min-h-11 rounded-xl border border-border-subtle bg-bg-main/40 py-3 pl-10 pr-4 text-text-base outline-none transition-colors focus:border-gold-primary/50";

const ReservationForm = () => {
  const [Player, setPlayer] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let active = true;

    import("@lottiefiles/react-lottie-player").then((module) => {
      if (active) setPlayer(() => module.Player);
    });

    return () => {
      active = false;
    };
  }, []);

  const lottieData = bookingAnimation?.default || bookingAnimation;

  const onSubmit = (data) => {
    const phoneNumber = "919620996689";

    const message = `*New Table Reservation*%0A%0A*Name:* ${data.name}%0A*Email:* ${data.email}%0A*Phone:* ${data.phone}%0A*Date:* ${data.date}%0A*Time:* ${data.time}%0A*Guests:* ${data.guests}%0A*Note:* ${data.message || "None"}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    toast.success("Opening WhatsApp to confirm your table...", {
      style: {
        background: "#0f172a",
        color: "#d4af37",
        border: "1px solid rgba(212,175,55,0.3)",
        borderRadius: "12px",
      },
    });

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      reset();
    }, 800);
  };

  return (
    <section className="relative overflow-hidden bg-bg-dark py-24 md:py-32">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute left-1/4 top-0 h-[320px] w-[320px] rounded-full bg-gold-primary/15 blur-[120px] sm:h-[500px] sm:w-[500px]"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center lg:w-2/5 lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gold-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold-primary">
              <Sparkles size={14} /> Instant Confirmation
            </div>

            <h2 className="font-serif text-4xl leading-tight text-text-base sm:text-5xl md:text-6xl">
              Book Your <span className="italic text-gold-primary">Table</span>
            </h2>

            <p className="text-text-muted">
              A table, held for you — confirmed over WhatsApp in minutes.
            </p>

            <div className="mx-auto h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] lg:mx-0">
              {Player && lottieData && typeof lottieData === "object" ? (
                <Player autoplay loop src={bookingAnimation} style={{ height: "100%", width: "100%" }} />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full border border-border-subtle bg-surface text-xs uppercase tracking-[0.3em] text-text-muted">
                  Loading
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5"
          >
            <div className="rounded-3xl border border-border-subtle bg-surface p-8 shadow-xl backdrop-blur-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {FIELDS.map((field) => (
                  <div key={field.id}>
                    <label className="text-xs font-bold uppercase tracking-widest text-text-muted">
                      {field.label}
                    </label>
                    <div className="relative mt-1.5">
                      <field.icon
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                      />
                      <input
                        type={field.type}
                        {...register(field.id, { required: `${field.label} is required` })}
                        className={inputClass}
                      />
                    </div>
                    {errors[field.id] && (
                      <p className="mt-1 text-xs text-red-500">{errors[field.id].message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Time</label>
                  <div className="relative mt-1.5">
                    <Clock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <select {...register("time")} className={inputClass}>
                      <option>07:00 PM</option>
                      <option>08:00 PM</option>
                      <option>09:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Guests</label>
                  <div className="relative mt-1.5">
                    <Users size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <select {...register("guests")} className={inputClass}>
                      <option>2</option>
                      <option>4</option>
                      <option>6</option>
                      <option>8</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    Message (optional)
                  </label>
                  <textarea
                    {...register("message")}
                    className={`${inputClass} mt-1.5 min-h-24 pl-4`}
                    placeholder="Special request, allergy, or occasion..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gold-primary py-4 font-bold uppercase tracking-widest text-black transition-colors hover:bg-gold-hover sm:col-span-2"
                >
                  Confirm Booking <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
