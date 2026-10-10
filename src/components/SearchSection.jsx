import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchSection() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const value = search.trim().toLowerCase();

    if (!value) {
      alert("Please enter a property type (e.g., Apartment, Villa, Plot).");
      return;
    }

    if (value.includes("apartment") || value.includes("flat") || value.includes("bhk")) {
      navigate("/apartments");
    } else if (value.includes("villa") || value.includes("house")) {
      navigate("/villas");
    } else if (value.includes("plot") || value.includes("land")) {
      navigate("/plots");
    } else {
      alert("We specialize in Apartments, Villas, and Plots. Taking you to all projects!");
      navigate("/apartments");
    }
  };

  return (
    <section className="bg-slate-950 py-10 sm:py-16 px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-2 sm:mb-3">
            Search Your Dream Property
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 text-center mb-6 sm:mb-8">
            Find the perfect home or investment across prime Bangalore locations
          </p>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Apartment, Villa or Plot..."
              className="flex-1 bg-slate-800 text-white border border-slate-700 p-3.5 sm:p-4 rounded-xl sm:rounded-full outline-none focus:border-yellow-400 text-sm sm:text-base placeholder:text-gray-500 transition"
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-full transition transform active:scale-95 text-sm sm:text-base shadow-md flex items-center justify-center gap-2"
            >
              <span>🔍</span> Search
            </button>
          </form>

          {/* Quick Category Badges for easy mobile tap */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs sm:text-sm">
            <span className="text-gray-400">Quick explore:</span>
            <button
              type="button"
              onClick={() => navigate("/apartments")}
              className="bg-slate-800 hover:bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 transition"
            >
              Apartments
            </button>
            <button
              type="button"
              onClick={() => navigate("/villas")}
              className="bg-slate-800 hover:bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 transition"
            >
              Villas
            </button>
            <button
              type="button"
              onClick={() => navigate("/plots")}
              className="bg-slate-800 hover:bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-400/30 transition"
            >
              Plots
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-slate-800/80">
            <a href="tel:+919448567426" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-full font-bold text-sm sm:text-base transition transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                <span>📞</span> Talk To An Expert
              </button>
            </a>

            <a
              href="https://wa.me/919448567426"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3.5 rounded-xl sm:rounded-full font-bold text-sm sm:text-base transition transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                <span>💬</span> Chat On WhatsApp
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}