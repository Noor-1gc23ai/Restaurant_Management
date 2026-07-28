import { motion } from "framer-motion";

const GlassCard = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`glass-card p-6 rounded-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;