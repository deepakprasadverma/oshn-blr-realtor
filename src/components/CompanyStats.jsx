export default function CompanyStats() {
  const stats = [
    { number: "500+", label: "Happy Clients", icon: "🤝" },
    { number: "1000+", label: "Properties Sold", icon: "🏡" },
    { number: "10+", label: "Years Experience", icon: "🏆" },
    { number: "50+", label: "Trusted Builders", icon: "🏗" },
  ];

  return (
    <section className="bg-slate-900/60 border-y border-slate-800/80 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400 mb-2">
            Our Proven Track Record
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Numbers that demonstrate our commitment and excellence in Bangalore real estate
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-900/90 border border-slate-800 p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center hover:border-yellow-400/30 transition transform hover:-translate-y-1 shadow-lg"
            >
              <span className="text-2xl sm:text-3xl mb-2">{stat.icon}</span>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-yellow-400 tracking-tight">
                {stat.number}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1 sm:mt-2 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}