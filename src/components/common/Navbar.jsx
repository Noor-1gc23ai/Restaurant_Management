import { createContext, useState } from "react";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Frame, FutureButton } from "../ui/FutureNavbar";
import { getRestaurantStatus } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import ThemeToggle from "./ThemeToggle";

export const MobileMenuContext = createContext({
  showMenu: false,
  setShowMenu: () => {},
});

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { status } = getRestaurantStatus();
  
  const primaryStroke = "#fbbf24"; 
  const primaryFill = "rgba(251, 191, 36, 0.1)";

  const openWhatsApp = () => {
    const phoneNumber = "919620996689";
    const msg = "Hello CafeNova! I have an enquiry regarding my visit.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservation", path: "/reservation" },
    { name: "Order", path: "/order" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <MobileMenuContext.Provider value={{ showMenu, setShowMenu }}>
      <nav className="fixed w-full top-0 inset-x-0 z-50 h-20">
        <div className="absolute right-4 top-4 z-50 flex items-center gap-2 lg:hidden">
          <ThemeToggle compact />
          <NavLink
            to="/cart"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md shadow-xl"
          >
            <ShoppingBag size={14} className="text-yellow-500" />
            Cart
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        <div className="flex h-full relative w-full items-center">
          
          {/* Left Frame (Decorative) */}
          <div className="size-full relative -mr-[11px] hidden lg:block opacity-30">
            <Frame
              paths={[
                {
                  show: true,
                  style: { strokeWidth: "1", stroke: primaryStroke, fill: "rgba(251,191,36,0.05)" },
                  path: [["M","0","0"],["L","100% - 6","0"],["L","100% - 11","100% - 64"],["L","100% + 0","0% + 29"],["L","0","11"],["L","0","0"]]
                }
              ]}
            />
          </div>

          {/* Center Frame (Nav Links) */}
          <div className="flex-none h-full px-12 relative w-full lg:w-auto lg:min-w-[520px] xl:min-w-[580px]">
            <Frame
              enableBackdropBlur
              className="drop-shadow-[0_0_10px_rgba(251,191,36,0.1)]"
              paths={[
                {
                  show: true,
                  style: { strokeWidth: "1", stroke: primaryStroke, fill: primaryFill },
                  path: [["M","6","0"],["L","100% - 6.5","0"],["L","100% + 0","0% + 9"],["L","100% - 28","100% - 15"],["L","162","100% - 15"],["L","164","100% - 30"],["L","153","100% - 15"],["L","27","100% - 15"],["L","0","0% + 8"],["L","6","0"]]
                }
              ]}
            />
            
            <div className="flex items-center mt-3 relative z-20">
              <NavLink to="/" className="me-10 font-serif font-black text-xl tracking-tighter text-white">
                CAFE<span className="text-yellow-500 italic">NOVA</span>
              </NavLink>

              <div className="hidden lg:flex gap-6 font-bold text-[10px] uppercase tracking-[0.2em]">
                {navLinks.map((link) => (
                  <NavLink 
                    key={link.path} 
                    to={link.path} 
                    className={({ isActive }) => isActive ? "text-yellow-500" : "text-white/50 hover:text-white transition-colors"}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="ms-6 hidden xl:block">
                <span className="text-[8px] font-black px-2 py-0.5 rounded border border-yellow-500/20 text-yellow-500 animate-pulse uppercase">
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Right Frame (Enquiry Button) */}
          <div className="w-full relative -ml-[25px] lg:flex justify-end pe-10 hidden">
            <Frame
              enableBackdropBlur
              paths={[
                {
                  show: true,
                  style: { strokeWidth: "1", stroke: primaryStroke, fill: "rgba(251,191,36,0.05)" },
                  path: [["M","19","0"],["L","100% - 5","0"],["L","100% + 0","0% + 7"],["L","100% - 36","100% - 20"],["L","0","100% - 20"],["L","25","8.9"],["L","19","1"]]
                }
              ]}
            />
            <div className="flex items-center -mt-4 relative z-20">
              <div className="mr-3">
                <ThemeToggle />
              </div>
              <FutureButton
                onClick={() => navigate("/cart")}
                shape="flat"
                className="font-black px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:brightness-125 mr-3"
              >
                <div className="relative flex items-center gap-2">
                  <ShoppingBag size={14} className="text-yellow-500" />
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -right-5 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-black text-white">
                      {cartCount}
                    </span>
                  )}
                </div>
              </FutureButton>

              <FutureButton
                onClick={openWhatsApp}
                shape="flat"
                className="font-black px-6 py-2 text-[10px] uppercase tracking-[0.2em] hover:brightness-125"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} className="text-yellow-500" />
                  Enquiry
                </div>
              </FutureButton>
            </div>
          </div>
        </div>
      </nav>
    </MobileMenuContext.Provider>
  );
};

export default Navbar;