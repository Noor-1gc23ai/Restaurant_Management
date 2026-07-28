import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = ({ className = "", compact = false }) => {
  const { theme, toggleTheme, isDay } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.97 }}
      aria-label={`Switch to ${isDay ? "night" : "day"} mode`}
      aria-pressed={isDay}
      className={`theme-toggle group relative inline-flex items-center overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_12px_36px_rgba(15,23,42,0.18)] ${compact ? "h-10 w-[4.9rem] px-1" : "h-11 w-[5.9rem] px-1.5"} ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.05))]" />

      <motion.span
        layout
        animate={{ x: isDay ? 0 : compact ? 40 : 44 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        className={`${compact ? "h-8 w-8" : "h-8 w-8"} relative z-10 rounded-full bg-white/90 shadow-[0_12px_24px_rgba(15,23,42,0.18)]`}
      >
        <span className="absolute inset-0 rounded-full bg-white/60 blur-xl opacity-70" />
      </motion.span>

      <span className="absolute left-1.5 top-1/2 z-20 -translate-y-1/2">
        <motion.span
          animate={{ rotate: isDay ? 0 : 90, opacity: isDay ? 1 : 0.45 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-amber-500"
        >
          {isDay && <span className="absolute inset-0 rounded-full bg-amber-300/25 blur-md" />}
          <Sun size={16} className="relative z-10" />
        </motion.span>
      </span>

      <span className="absolute right-1.5 top-1/2 z-20 -translate-y-1/2">
        <motion.span
          animate={{ rotate: isDay ? -90 : 0, opacity: isDay ? 0.45 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-slate-100"
        >
          {!isDay && <span className="absolute inset-0 rounded-full bg-sky-300/20 blur-md" />}
          <Moon size={16} className="relative z-10" />
        </motion.span>
      </span>
    </motion.button>
  );
};

export default ThemeToggle;