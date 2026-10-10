import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="bg-slate-900 border-b border-slate-800/80 text-xs text-gray-300 py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left: Trust & RERA */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5 text-yellow-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            RERA Karnataka Registered Advisory
          </span>
          <span className="hidden md:inline text-gray-600">|</span>
          <span className="hidden md:inline text-gray-400">
            PRM/KA/RERA/1251/310/AG/170824/000174
          </span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-[11px] sm:text-xs">
          <Link to="/new-launches" className="hover:text-yellow-400 transition font-medium text-amber-300">
            🔥 New Launches
          </Link>
          <span className="text-gray-700">|</span>
          <Link to="/localities" className="hover:text-yellow-400 transition">
            Top Localities
          </Link>
          <span className="text-gray-700">|</span>
          <Link to="/nri-corner" className="hover:text-yellow-400 transition font-medium text-yellow-400">
            🌏 NRI Corner
          </Link>
          <span className="text-gray-700">|</span>
          <a
            href="tel:+919448567426"
            className="text-white hover:text-yellow-400 font-bold transition flex items-center gap-1"
          >
            <span>📞</span> +91 9448567426
          </a>
        </div>
      </div>
    </div>
  );
}
