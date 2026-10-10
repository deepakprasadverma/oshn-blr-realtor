import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <aside
      aria-label="RERA & Helpline"
      className="bg-slate-950 text-gray-300 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-slate-800/80 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Trust & RERA badge */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="font-semibold text-yellow-400 truncate text-[10px] sm:text-xs">
            RERA Karnataka Advisory
          </span>
          <span className="hidden lg:inline text-gray-600">|</span>
          <span className="hidden lg:inline text-gray-400 font-mono text-[10px]">
            PRM/KA/RERA/1251/310/AG/170824/000174
          </span>
        </div>

        {/* Right: Quick Links for desktop + Direct Call button on all screens */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[11px] sm:text-xs">
          <div className="hidden md:flex items-center gap-3 text-gray-300">
            <Link
              to="/new-launches"
              className="hover:text-yellow-400 transition flex items-center gap-1 font-medium text-amber-300"
            >
              <span>🔥</span> New Launches
            </Link>
            <span className="text-gray-700">|</span>
            <Link to="/localities" className="hover:text-yellow-400 transition">
              Top Localities
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              to="/nri-corner"
              className="hover:text-yellow-400 transition flex items-center gap-1 font-medium text-yellow-400"
            >
              <span>🌏</span> NRI Corner
            </Link>
            <span className="text-gray-700">|</span>
          </div>

          {/* Hotline (Visible on both mobile & desktop cleanly) */}
          <a
            href="tel:+919448567426"
            className="text-white hover:text-yellow-400 font-bold transition flex items-center gap-1 bg-slate-900/90 hover:bg-slate-800 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-700/60 text-[10px] sm:text-xs shrink-0"
          >
            <span>📞</span>
            <span className="hidden xs:inline">+91 </span>9448567426
          </a>
        </div>
      </div>
    </aside>
  );
}
