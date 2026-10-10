import { Link } from "react-router-dom";

export default function BuyersRoute() {
  const pillars = [
    {
      step: "01",
      title: "Is the project priced right?",
      question: "Are you paying fair market price or marketing hype?",
      description: "We audit recent transaction values, per sq.ft appreciation velocity in the micro-market, and comparable nearby launches to verify true asset value before you commit.",
      icon: "📊",
    },
    {
      step: "02",
      title: "Will the location work every day?",
      question: "Beyond brochure maps: daily reality check.",
      description: "Peak-hour commute time to major tech corridors, Cauvery water connection timeline, underground sewage network, and upcoming metro line access audited on ground.",
      icon: "🧭",
    },
    {
      step: "03",
      title: "What does the brochure leave out?",
      question: "Carpet area vs Super built-up loading analysis.",
      description: "We demystify high loading percentages (28-35%), clarify UDS (Undivided Share of Land), verify high-tension wire clearances, and inspect environmental buffers.",
      icon: "🔍",
    },
    {
      step: "04",
      title: "Group Buy & Negotiation Advantage",
      question: "Why buy alone when pooling demand saves lakhs?",
      description: "We pool verified buyers for pre-launch and new launch projects, securing volume discounts, waiver of floor-rise charges, and preferential unit allocations.",
      icon: "🤝",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-900/60 border-t border-slate-800 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
            The OSHN Advisory Edge
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Home Buying, With A <span className="text-yellow-400">Clearer View</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
            Good property decisions require more than a glamorous brochure and an aggressive sales pitch. We bring together unbiased ground facts so you decide with total confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-yellow-400/40 hover:-translate-y-1 transition-all duration-300 shadow-xl relative overflow-hidden group"
            >
              <div className="absolute -right-4 -bottom-4 text-7xl font-black text-slate-800/40 select-none group-hover:text-yellow-400/10 transition">
                {item.step}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-mono font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
                    Step {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-amber-300/80 mb-3">
                  {item.question}
                </p>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <span className="text-xs text-yellow-400 font-semibold group-hover:underline flex items-center gap-1">
                  Free Advisory Included <span>✓</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Action Bar */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-yellow-400/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Want a free comparative property audit for any Bangalore project?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Speak to our senior real estate consultants for an unbiased review before paying token advance.
            </p>
          </div>

          <Link to="/contact">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition transform active:scale-95 shadow-md whitespace-nowrap">
              Schedule Free Consultation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
