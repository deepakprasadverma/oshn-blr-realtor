import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { number: "500+", label: "Happy Families Assisted" },
    { number: "1000+", label: "Properties Evaluated & Sold" },
    { number: "10+", label: "Years Bengaluru Expertise" },
  ];

  const highlights = [
    { title: "100% RERA Verified", desc: "Every project is thoroughly vetted for legal titles and RERA approvals." },
    { title: "Direct Builder Pricing", desc: "Transparent dealings with verified builders and maximum negotiation leverage." },
    { title: "Dedicated Site Visits", desc: "Complimentary cab pick-up and accompanied project walkthroughs." },
    { title: "Home Loan Assistance", desc: "Partnerships with major nationalized and private banks for instant loan approvals." },
    { title: "Zero Pressure Advice", desc: "Honest analysis based on your budget, appreciation forecasts, and preferences." },
    { title: "End-to-End Registration", desc: "Guidance through sale deed drafting, verification, and registration." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-4 uppercase tracking-wider">
            Who We Are
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4 sm:mb-6">
            About OSHN BLRREALTOR
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            OSHN BLRREALTOR is Bengaluru's premier real estate consultancy. We bridge the gap between discerning property buyers and the city's finest developers, delivering an unparalleled buying experience backed by integrity, market intelligence, and dedicated support.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl text-center hover:border-yellow-400/40 transition shadow-lg"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400">
                {s.number}
              </h2>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-300 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-12 sm:mb-16 shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400 mb-6 sm:mb-8 text-center sm:text-left">
            Why Choose OSHN BLRREALTOR?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-xl hover:border-yellow-400/40 transition"
              >
                <h3 className="text-base sm:text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                  <span>✔</span> {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="text-center bg-gradient-to-r from-yellow-400/10 via-amber-400/10 to-yellow-400/10 border border-yellow-400/30 rounded-2xl p-6 sm:p-10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Looking for tailored advice on your next property?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-6 max-w-xl mx-auto">
            Our property consultants are just a phone call or message away.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto">
            <Link to="/contact">
              <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition">
                Contact An Advisor
              </button>
            </Link>
            <Link to="/apartments">
              <button className="w-full sm:w-auto border border-yellow-400 hover:bg-yellow-400 hover:text-black text-yellow-400 px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base transition">
                Browse Properties
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}