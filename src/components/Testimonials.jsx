export default function Testimonials() {
  const reviews = [
    {
      text: "Excellent service and genuine guidance throughout the buying process. Found our home in Whitefield with complete peace of mind.",
      author: "Deepak Kumar",
      role: "Apartment Buyer, Whitefield",
      rating: 5,
    },
    {
      text: "Found my dream villa within a week! Their team was transparent, proactive, and guided us with all legal documentation.",
      author: "Chandni Verma",
      role: "Villa Owner, Sarjapur Road",
      rating: 5,
    },
    {
      text: "Professional team with outstanding knowledge of Bangalore's high-growth corridors. Great investment plots suggested.",
      author: "Amit Verma",
      role: "Plot Investor, Devanahalli",
      rating: 5,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-950 text-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400 mb-2">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Real stories from home buyers and property investors across Bengaluru
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-slate-900/90 border border-slate-800 p-6 sm:p-7 rounded-2xl flex flex-col justify-between hover:border-yellow-400/30 transition shadow-lg"
            >
              <div>
                <div className="flex gap-1 text-yellow-400 text-sm mb-3">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <h4 className="text-yellow-400 font-bold text-sm sm:text-base">
                  {rev.author}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">{rev.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}