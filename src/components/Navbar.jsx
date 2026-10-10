import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Oshn_logo.png";
import TopBar from "./TopBar";
import { useCompare } from "../context/CompareContext";
import WhatsAppPreformModal from "./WhatsAppPreformModal";

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
      {/* Top bar with RERA number, NRI Corner, direct hotline */}
      <TopBar />

      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <img
              src={logo}
              alt="OSHN BLRREALTOR Logo"
              className="h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="text-sm sm:text-lg font-extrabold tracking-tight text-yellow-400 group-hover:text-yellow-300 transition">
                OSHN BLRREALTOR
              </h1>
              <p className="text-[9px] sm:text-[11px] text-gray-400 font-medium">
                Bangalore Realty Experts
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-5 text-white font-medium text-xs lg:text-sm">
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
                  <span className="text-[9px] font-black bg-rose-600 text-white px-1.5 py-0.2 rounded-full uppercase">
                    {link.badge}
                  </span>
                )}
                {link.count && (
                  <span className="text-[10px] font-bold bg-amber-500 text-black px-1.5 py-0.2 rounded-full">
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
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-bold text-xs transition transform hover:scale-105 active:scale-95 shadow flex items-center gap-1"
            >
              <span>💬</span> WhatsApp
            </button>
          </div>

          {/* Medium screen navigation fallback (tablets / laptops) */}
          <div className="hidden md:flex xl:hidden items-center gap-4 text-xs font-semibold">
            <Link to="/new-launches" className="text-amber-300 hover:text-yellow-400">
              New Launch
            </Link>
            <Link to="/apartments" className="text-gray-300 hover:text-yellow-400">
              Apartments
            </Link>
            <Link to="/villas" className="text-gray-300 hover:text-yellow-400">
              Villas
            </Link>
            <Link to="/plots" className="text-gray-300 hover:text-yellow-400">
              Plots
            </Link>
            <Link to="/compare" className="text-yellow-400 flex items-center gap-1">
              Compare {compareList.length > 0 && `(${compareList.length})`}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-yellow-400 hover:text-yellow-300 text-xl border border-slate-700 rounded-lg"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setOpenWhatsAppModal(true)}
              className="bg-emerald-600 text-white p-2 rounded-lg text-sm"
              title="Quick WhatsApp"
            >
              💬
            </button>

            <button
              className="p-2 text-yellow-400 hover:text-yellow-300 text-2xl focus:outline-none rounded-lg"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Drawer */}
        {menuOpen && (
          <div className="fixed inset-0 top-[88px] sm:top-[96px] bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800 z-50 flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-1">
                Navigation &amp; Portals
              </span>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-base font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-between ${
                    isActive(link.path)
                      ? "bg-yellow-400 text-black font-bold"
                      : "text-gray-200 hover:bg-slate-900 hover:text-yellow-400"
                  }`}
                >
                  <span>{link.name}</span>
                  <div className="flex items-center gap-1.5">
                    {link.badge && (
                      <span className="text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded-full uppercase">
                        {link.badge}
                      </span>
                    )}
                    {link.count && (
                      <span className="text-[11px] font-bold bg-amber-500 text-black px-2 py-0.5 rounded-full">
                        {link.count}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-slate-800 mt-6">
              <a
                href="tel:+919448567426"
                className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                📞 Call Expert: +91 9448567426
              </a>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setOpenWhatsAppModal(true);
                }}
                className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition text-sm"
              >
                💬 Pre-qualify on WhatsApp
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* WhatsApp Modal */}
      <WhatsAppPreformModal
        isOpen={openWhatsAppModal}
        onClose={() => setOpenWhatsAppModal(false)}
      />
    </>
  );
}