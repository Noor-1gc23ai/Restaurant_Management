import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const variants = {
    primary: "bg-gold-primary text-black hover:bg-gold-hover shadow-[0_0_15px_rgba(212,175,55,0.3)]",
    outline: "border border-gold-primary/50 text-gold-primary hover:bg-gold-primary/10",
    ghost: "text-white/70 hover:text-gold-primary hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`px-6 py-3 rounded-full font-bold tracking-widest uppercase text-xs transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;