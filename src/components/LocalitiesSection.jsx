import { Link } from "react-router-dom";
import { localitiesData } from "../data/localitiesData";

export default function LocalitiesSection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-900/40 border-t border-slate-800 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Micro-Markets Guide
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Top Localities of <span className="text-yellow-400">Bangalore</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-1 max-w-2xl">
              High-growth investment corridors handpicked with detailed infra analysis, metro status, and pricing trends.
            </p>
          </div>

          <Link
            to="/localities"
            className="text-xs sm:text-sm text-yellow-400 hover:text-yellow-300 font-semibold flex items-center gap-1 group whitespace-nowrap"
          >
            Explore all corridors <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {localitiesData.map((loc, idx) => (
            <div
              key={idx}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden h-40 sm:h-44">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold">
                      {loc.zone}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {loc.name}
                    </h3>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-2 py-0.5 rounded-full">
                    {loc.priceTrend}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                  {loc.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Avg Price Band:</span>
                    <span className="font-semibold text-yellow-400">{loc.avgPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Metro Line:</span>
                    <span className="font-medium text-white truncate max-w-[170px]">{loc.metroLine}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Active Projects:</span>
                    <span className="font-semibold text-emerald-400">{loc.projectsCount}</span>
                  </div>
                </div>

                <Link
                  to="/apartments"
                  className="block w-full text-center bg-slate-800 hover:bg-yellow-400 hover:text-black text-gray-200 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition duration-200"
                >
                  View Projects in {loc.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
