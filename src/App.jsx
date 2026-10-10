import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { CompareProvider } from "./context/CompareContext";
import CompareTray from "./components/CompareTray";
import CompareModal from "./components/CompareModal";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CallButton from "./components/CallButton";

// Lazy load pages for fast initial bundle and optimal mobile performance
const Home = lazy(() => import("./pages/Home"));
const NewLaunches = lazy(() => import("./pages/NewLaunches"));
const About = lazy(() => import("./pages/About"));
const Apartments = lazy(() => import("./pages/Apartments"));
const Villas = lazy(() => import("./pages/Villas"));
const Plots = lazy(() => import("./pages/Plots"));
const Localities = lazy(() => import("./pages/Localities"));
const NriCorner = lazy(() => import("./pages/NriCorner"));
const Compare = lazy(() => import("./pages/Compare"));
const Contact = lazy(() => import("./pages/Contact"));
const PropertyDetails = lazy(() => import("./pages/PropertyDetails"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));

// Elegant fallback spinner for lazy-loaded route chunks
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mb-4"></div>
      <p className="text-xs uppercase font-extrabold tracking-widest text-gray-400 animate-pulse">
        Loading OSHN BLR...
      </p>
    </div>
  );
}

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
      {!isAdmin && <Navbar />}

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </Suspense>
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

const appBaseName =
  import.meta.env.BASE_URL && import.meta.env.BASE_URL !== "/"
    ? import.meta.env.BASE_URL
    : undefined;

export default function App() {
  return (
    <BrowserRouter basename={appBaseName}>
      <CompareProvider>
        <Layout />
      </CompareProvider>
    </BrowserRouter>
  );
}