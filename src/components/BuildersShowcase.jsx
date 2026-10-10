import { buildersData } from "../data/buildersData";

export default function BuildersShowcase() {
  return (
    <section className="py-14 sm:py-20 bg-slate-950 border-t border-slate-900 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Grade-A Partnerships
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Recommended <span className="text-yellow-400">Builders</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            We work directly with India's most reputable real estate developers to secure exclusive pre-launch allocations and maximum discount benefits for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {buildersData.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col justify-between hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300 shadow-lg group"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {b.badge}
                  </span>
                  <span className="text-yellow-400 text-xs font-bold bg-slate-800 px-2 py-0.5 rounded-md">
                    {b.rating}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition mb-1">
                  {b.name}
                </h3>
                <p className="text-xs text-amber-300/80 italic mb-3">
                  "{b.tagline}"
                </p>

                <p className="text-xs text-gray-400 leading-relaxed mb-4">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Track Record:</span>
                  <span className="font-semibold text-white">{b.experience}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivered:</span>
                  <span className="font-semibold text-white">{b.deliveredSqft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bangalore Projects:</span>
                  <span className="font-semibold text-yellow-400">{b.activeProjects}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
