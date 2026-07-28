import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CustomCursor from "./components/common/CustomCursor";
import ThemeToggle from "./components/common/ThemeToggle";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Reservation from "./pages/Reservation";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="bg-bg-dark min-h-screen">
          
          <CustomCursor />
          <ThemeToggle />

          <Toaster position="bottom-right" />
          <SonnerToaster position="bottom-right" richColors />

          <Navbar />
          <ScrollToTop />

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

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;