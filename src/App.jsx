import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { CompareProvider } from "./context/CompareContext";
import CompareTray from "./components/CompareTray";
import CompareModal from "./components/CompareModal";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CallButton from "./components/CallButton";

import Home from "./pages/Home";
import NewLaunches from "./pages/NewLaunches";
import About from "./pages/About";
import Apartments from "./pages/Apartments";
import Villas from "./pages/Villas";
import Plots from "./pages/Plots";
import Localities from "./pages/Localities";
import NriCorner from "./pages/NriCorner";
import Compare from "./pages/Compare";
import Contact from "./pages/Contact";
import PropertyDetails from "./pages/PropertyDetails";
import AdminDashboard from "./admin/AdminDashboard";

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-yellow-400 selection:text-black">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-launches" element={<NewLaunches />} />
          <Route path="/about" element={<About />} />
          <Route path="/apartments" element={<Apartments />} />
          <Route path="/villas" element={<Villas />} />
          <Route path="/plots" element={<Plots />} />
          <Route path="/localities" element={<Localities />} />
          <Route path="/nri-corner" element={<NriCorner />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Floating Action Buttons & Comparison Tray */}
      {!isAdmin && (
        <>
          <CallButton />
          <WhatsAppButton />
          <CompareTray />
          <CompareModal />
        </>
      )}

      {/* Global Footer */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CompareProvider>
        <Layout />
      </CompareProvider>
    </BrowserRouter>
  );
}