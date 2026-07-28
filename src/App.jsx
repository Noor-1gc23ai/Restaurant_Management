import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CustomCursor from "./components/common/CustomCursor";
import { CartProvider } from "./context/CartContext";
import { useTheme } from "./context/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Menu = lazy(() => import("./pages/Menu"));
const Cart = lazy(() => import("./pages/Cart"));
const Reservation = lazy(() => import("./pages/Reservation"));
const Order = lazy(() => import("./pages/Order"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Accessibility = lazy(() => import("./pages/Accessibility"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ThemeAwareToasters = () => {
  const { isDay } = useTheme();

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: isDay ? "rgba(255,255,255,0.92)" : "rgba(15,23,42,0.86)",
            color: isDay ? "#1f2937" : "#f8fafc",
            border: isDay ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(255,255,255,0.08)",
            boxShadow: isDay ? "0 20px 45px rgba(15,23,42,0.08)" : "0 20px 45px rgba(0,0,0,0.28)",
            backdropFilter: "blur(24px)",
          },
        }}
      />
      <SonnerToaster
        position="bottom-right"
        richColors
        theme={isDay ? "light" : "dark"}
      />
    </>
  );
};

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-bg-main px-6 text-center text-sm uppercase tracking-[0.3em] text-slate-500 transition-colors duration-500">
    Loading CafeNova...
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="bg-bg-main min-h-screen text-text-base transition-colors duration-500">
          
          <CustomCursor />

          <ThemeAwareToasters />

          <Navbar />
          <ScrollToTop />

          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order/success/:orderId" element={<OrderSuccess />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/accessibility" element={<Accessibility />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;