import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Oshn_logo.png";
import TopBar from "./TopBar";
import { useCompare } from "../context/CompareContext";
import WhatsAppPreformModal from "./WhatsAppPreformModal";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openWhatsAppModal, setOpenWhatsAppModal] = useState(false);
  const location = useLocation();
  const { compareList } = useCompare();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "New Launch", path: "/new-launches", badge: "HOT" },
    { name: "Apartments", path: "/apartments" },
    { name: "Villas", path: "/villas" },
    { name: "Plots", path: "/plots" },
    { name: "Localities", path: "/localities" },
    { name: "NRI Corner", path: "/nri-corner" },
    {
      name: "Compare",
      path: "/compare",
      count: compareList.length > 0 ? compareList.length : null,
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top bar with RERA number & direct helpline */}
      <TopBar />

      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img
              src={logo}
              alt="OSHN BLRREALTOR Logo"
              className="h-8 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className="text-xs sm:text-base md:text-lg font-black tracking-tight text-yellow-400 group-hover:text-yellow-300 transition block">
                OSHN BLRREALTOR
              </span>
              <span className="text-[8px] sm:text-[10px] text-gray-400 font-medium block">
                Bangalore Realty Experts
              </span>
            </div>
          </Link>

          {/* Desktop Menu (XL screens) */}
          <nav aria-label="Desktop Navigation" className="hidden xl:flex items-center gap-5 text-white font-medium text-xs lg:text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition relative py-1 flex items-center gap-1 ${
                  isActive(link.path)
                    ? "text-yellow-400 font-bold"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                {link.name}
                {link.badge && (
                  <span className="text-[9px] font-black bg-rose-600 text-white px-1.5 py-0.5 rounded-full uppercase leading-none">
                    {link.badge}
                  </span>
                )}
                {link.count && (
                  <span className="text-[10px] font-bold bg-amber-500 text-black px-1.5 py-0.5 rounded-full leading-none">
                    {link.count}
                  </span>
                )}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 rounded-full" />
                )}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setOpenWhatsAppModal(true)}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-1.5 rounded-xl font-bold text-xs transition transform hover:scale-105 active:scale-95 shadow flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </button>
          </nav>

          {/* Medium screen navigation (Tablets / Laptops) */}
          <div className="hidden md:flex xl:hidden items-center gap-3 text-xs font-semibold">
            <Link to="/new-launches" className="text-amber-300 hover:text-yellow-400">
              New Launch
            </Link>
            <Link to="/apartments" className="text-gray-300 hover:text-yellow-400">
              Apartments
            </Link>
            <Link to="/compare" className="text-yellow-400 flex items-center gap-1">
              Compare {compareList.length > 0 && `(${compareList.length})`}
            </Link>
            <button
              type="button"
              onClick={() => setOpenWhatsAppModal(true)}
              className="bg-[#25D366] text-white p-2 rounded-lg"
              title="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-yellow-400 hover:text-yellow-300 text-xl border border-slate-800 rounded-lg"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu & Quick WhatsApp Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenWhatsAppModal(true)}
              className="bg-[#25D366] active:bg-[#20ba59] text-white p-2 rounded-xl shadow-md transition flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
              title="Chat on WhatsApp"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
            </button>

            <button
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-yellow-400 bg-slate-900 border border-slate-800 rounded-xl text-lg hover:bg-slate-800 transition focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between overflow-y-auto animate-fadeIn">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
              <img src={logo} alt="OSHN Logo" className="h-7 w-auto" />
              <span className="text-sm font-bold text-yellow-400">OSHN BLRREALTOR</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-gray-300 hover:text-white flex items-center justify-center text-sm font-bold"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Drawer Body - Categorized Links */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div>
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest px-2 block mb-1">
                Advisory Portals
              </span>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/new-launches"
                  onClick={() => setMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs font-bold text-amber-300 hover:bg-slate-800"
                >
                  <span>🔥</span> New Launches
                </Link>
                <Link
                  to="/compare"
                  onClick={() => setMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-bold text-yellow-400 hover:bg-slate-800"
                >
                  <span className="flex items-center gap-1.5">⚖️ Compare</span>
                  {compareList.length > 0 && (
                    <span className="bg-amber-400 text-black px-1.5 py-0.2 rounded-full text-[10px]">
                      {compareList.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/localities"
                  onClick={() => setMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs font-bold text-gray-200 hover:bg-slate-800"
                >
                  <span>📍</span> Localities
                </Link>
                <Link
                  to="/nri-corner"
                  onClick={() => setMenuOpen(false)}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2 text-xs font-bold text-gray-200 hover:bg-slate-800"
                >
                  <span>🌏</span> NRI Corner
                </Link>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest px-2 block mb-1">
                Properties
              </span>
              <div className="flex flex-col gap-1">
                {[
                  { name: "Home", path: "/" },
                  { name: "Apartments in Bangalore", path: "/apartments" },
                  { name: "Luxury Villas", path: "/villas" },
                  { name: "Investment Plots", path: "/plots" },
                  { name: "About Us", path: "/about" },
                  { name: "Contact & Site Visits", path: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-between ${
                      isActive(link.path)
                        ? "bg-yellow-400 text-black font-bold"
                        : "text-gray-200 hover:bg-slate-900 hover:text-yellow-400"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer - Contact Buttons */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 space-y-2">
            <a
              href="tel:+919448567426"
              className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-3 rounded-xl transition text-xs sm:text-sm shadow-md"
            >
              <span>📞</span> Instant Call: +91 9448567426
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setOpenWhatsAppModal(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3 rounded-xl transition text-xs sm:text-sm shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      <WhatsAppPreformModal
        isOpen={openWhatsAppModal}
        onClose={() => setOpenWhatsAppModal(false)}
      />
    </>
  );
}