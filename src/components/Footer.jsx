import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-gray-400 pt-12 pb-32 sm:pb-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-yellow-400 mb-3 tracking-tight">
              OSHN BLRREALTOR
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
              Your trusted partner for buying luxury apartments, premium villas, and high-ROI investment plots across Bengaluru.
            </p>
            <span className="inline-block bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs px-3 py-1 rounded-full font-semibold">
              RERA Compliant Projects
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-3">
              Explore Properties
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/apartments" className="hover:text-yellow-400 transition">
                  Luxury Apartments
                </Link>
              </li>
              <li>
                <Link to="/villas" className="hover:text-yellow-400 transition">
                  Gated Community Villas
                </Link>
              </li>
              <li>
                <Link to="/plots" className="hover:text-yellow-400 transition">
                  Investment Plots
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400 transition">
                  About Our Agency
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-3">
              Prime Hotspots
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-400">
              <li>📍 Whitefield & IT Corridor</li>
              <li>📍 Sarjapur Road & Electronic City</li>
              <li>📍 Devanahalli & North Bengaluru</li>
              <li>📍 Hebbal & Yelahanka</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-3">
              Office Contact
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed mb-2">
              📍 490, 4th Cross Rd, AG's Layout, Mathikere, Bengaluru, Karnataka 560054
            </p>
            <p className="text-xs sm:text-sm mb-1.5">
              📞 <a href="tel:+919448567426" className="text-yellow-400 hover:underline">+91 9448567426</a>
            </p>
            <p className="text-xs sm:text-sm">
              📧 <a href="mailto:srikant.blrrealtor@gmail.com" className="text-gray-300 hover:underline">srikant.blrrealtor@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 text-center text-xs sm:text-sm space-y-2 max-w-sm sm:max-w-none mx-auto pr-14 sm:pr-0">
          <p className="text-gray-400">
            © {new Date().getFullYear()} OSHN BLRREALTOR. All Rights Reserved.
          </p>
          <p className="text-yellow-400 font-semibold tracking-wide">
            Designed &amp; Developed By{" "}
            <span className="font-extrabold text-white bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded-full inline-block ml-1 shadow-sm">
              Syntrixad
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}