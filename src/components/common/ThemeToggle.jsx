import { Sun, Moon } from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <button 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gold-primary text-black shadow-lg hover:scale-110 transition"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;