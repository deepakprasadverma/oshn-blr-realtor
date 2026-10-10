import { Link } from "react-router-dom";
import { localitiesData } from "../data/localitiesData";

export default function Localities() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            Bangalore Real Estate Map
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            Top Micro-Markets &amp; Investment Corridors
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            Every neighborhood in Bangalore has distinct price appreciation dynamics, rental yields, and upcoming transit infrastructure. Explore our in-depth corridor breakdown.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {localitiesData.map((loc, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-yellow-400/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-400">
                    {loc.zone}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <h2 className="text-xl font-black text-white">{loc.name}</h2>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/40">
                      {loc.priceTrend}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {loc.description}
                  </p>

                  <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price Band:</span>
                      <span className="font-bold text-yellow-400">{loc.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Metro Transit:</span>
                      <span className="font-semibold text-white truncate max-w-[170px]">{loc.metroLine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Best For:</span>
                      <span className="font-semibold text-emerald-400">{loc.popularFor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/apartments"
                  className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-xs sm:text-sm transition transform active:scale-95 shadow"
                >
                  Browse Projects in {loc.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
