import { Link } from "react-router-dom";
import { propertiesData } from "../data/propertiesData";
import { useCompare } from "../context/CompareContext";

export default function NewLaunches() {
  const { addToCompare, isInCompare } = useCompare();

  // New launch and upcoming projects
  const newLaunchProjects = propertiesData.filter((p) => p.isNewLaunch || p.status === "Under Construction");

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider animate-pulse">
            🔥 Exclusive Pre-Launch Opportunities
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 sm:mb-4">
            Upcoming &amp; New Launch Projects in Bangalore
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
            Invest early at ground-floor pricing before official public launch. Gain 15-25% price appreciation advantage during the construction phase.
          </p>
        </div>

        {/* Pre-launch Benefits Bar */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl">💰</span>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">Lowest Early-Bird Prices</h3>
              <p className="text-xs text-gray-400 mt-0.5">Pre-launch stage offers the lowest entry rate before progressive price hikes.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl">🎯</span>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">First Pick of Premium Units</h3>
              <p className="text-xs text-gray-400 mt-0.5">Choose higher floor views, Vaastu-compliant corner homes, and preferred layouts.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl">📜</span>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">100% RERA Registered</h3>
              <p className="text-xs text-gray-400 mt-0.5">All projects in our curated inventory hold valid RERA Karnataka sanction certificates.</p>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {newLaunchProjects.map((p) => {
            const inCompare = isInCompare(p.id);

            return (
              <div
                key={p.id}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow">
                    Pre-Launch Phase
                  </span>

                  <button
                    type="button"
                    onClick={() => addToCompare(p)}
                    className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg transition ${
                      inCompare
                        ? "bg-amber-500 text-black border border-amber-300"
                        : "bg-black/70 hover:bg-slate-900 text-white border border-white/20"
                    }`}
                  >
                    {inCompare ? "✓ Comparing" : "+ Compare"}
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">{p.builder}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                      <span>📍</span> {p.locality}, {p.zone}
                    </p>

                    <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-xs text-gray-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Configurations:</span>
                        <span className="font-semibold text-yellow-300">{p.bhk}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Possession:</span>
                        <span className="text-white">{p.possession}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                          Pre-Launch Price
                        </span>
                        <p className="text-lg sm:text-xl font-extrabold text-yellow-400">
                          {p.price}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {p.status}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/919448567426?text=${encodeURIComponent(
                        `Hi, I am interested in early bird pre-launch booking for ${p.name}. Please share the expression of interest (EOI) details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-xs sm:text-sm transition transform active:scale-95 shadow-md"
                    >
                      Unlock Early-Bird Offer
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
