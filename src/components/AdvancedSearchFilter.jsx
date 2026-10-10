import { useState } from "react";
import { Link } from "react-router-dom";
import { propertiesData } from "../data/propertiesData";
import { useCompare } from "../context/CompareContext";
import WhatsAppIcon from "./WhatsAppIcon";

export default function AdvancedSearchFilter() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCompare, isInCompare } = useCompare();

  const filteredProperties = propertiesData.filter((p) => {
    // Type filter
    if (selectedType !== "All" && p.type !== selectedType) return false;

    // Zone filter
    if (selectedZone !== "All" && !p.zone.includes(selectedZone)) return false;

    // Status filter
    if (selectedStatus !== "All") {
      if (selectedStatus === "New Launch" && !p.isNewLaunch) return false;
      if (selectedStatus === "Ready to Move" && p.status !== "Ready to Move" && p.status !== "Ready for Registration") return false;
      if (selectedStatus === "Under Construction" && p.status !== "Under Construction") return false;
    }

    // Budget filter
    if (selectedBudget === "under-50l" && p.priceNum > 5000000) return false;
    if (selectedBudget === "50l-1cr" && (p.priceNum < 5000000 || p.priceNum > 10000000)) return false;
    if (selectedBudget === "1cr-2.5cr" && (p.priceNum < 10000000 || p.priceNum > 25000000)) return false;
    if (selectedBudget === "2.5cr-plus" && p.priceNum < 25000000) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.builder.toLowerCase().includes(q) ||
        p.bhk.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <section className="py-14 sm:py-20 bg-slate-950 px-4 sm:px-6" id="explore-inventory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Curated Bengaluru Inventory
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">
            Explore All Verified <span className="text-yellow-400">Projects</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Compare configurations, pricing, RERA numbers, and builder reputations across Bangalore.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search project, builder, locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 p-2.5 sm:p-3 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-yellow-400 pl-8"
              />
              <span className="absolute left-2.5 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm">
                🔍
              </span>
            </div>

            {/* Type */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2.5 sm:p-3 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-yellow-400"
            >
              <option value="All">All Types (Apartments, Villas, Plots)</option>
              <option value="Apartment">Apartments</option>
              <option value="Villa">Villas</option>
              <option value="Plot">Plots</option>
            </select>

            {/* Zone */}
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2.5 sm:p-3 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-yellow-400"
            >
              <option value="All">All Zones (East, North, South)</option>
              <option value="East">East Bangalore (Whitefield, Sarjapur)</option>
              <option value="North">North Bangalore (Airport, Hebbal)</option>
              <option value="South">South Bangalore (Electronic City, JP Nagar)</option>
            </select>

            {/* Budget */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2.5 sm:p-3 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-yellow-400"
            >
              <option value="All">Any Budget</option>
              <option value="under-50l">Under ₹50 Lakhs</option>
              <option value="50l-1cr">₹50 Lakhs - ₹1 Crore</option>
              <option value="1cr-2.5cr">₹1 Crore - ₹2.5 Crore</option>
              <option value="2.5cr-plus">₹2.5 Crore &amp; Above</option>
            </select>

            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-800 border border-slate-700 p-2.5 sm:p-3 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-yellow-400"
            >
              <option value="All">All Statuses</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
              <option value="New Launch">New Launch / Pre-Launch</option>
            </select>
          </div>

          {/* Quick Active Filter Counts & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <span className="text-gray-400">
              Showing <strong className="text-yellow-400">{filteredProperties.length}</strong> matching projects
            </span>

            {(selectedType !== "All" || selectedZone !== "All" || selectedBudget !== "All" || selectedStatus !== "All" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedType("All");
                  setSelectedZone("All");
                  setSelectedBudget("All");
                  setSelectedStatus("All");
                  setSearchQuery("");
                }}
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                Reset Filters ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredProperties.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-12 text-center rounded-2xl text-gray-400">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-base font-semibold text-white">No properties matched your current filters.</p>
            <p className="text-xs sm:text-sm mt-1">Try resetting some filters or searching with different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((p) => {
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

                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="bg-yellow-400 text-black text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase shadow">
                        {p.type}
                      </span>
                      {p.isNewLaunch && (
                        <span className="bg-rose-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full uppercase shadow">
                          New Launch
                        </span>
                      )}
                    </div>

                    {/* Compare Button on Card */}
                    <button
                      type="button"
                      onClick={() => addToCompare(p)}
                      className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full shadow-lg transition flex items-center gap-1 ${
                        inCompare
                          ? "bg-amber-500 text-black border border-amber-300"
                          : "bg-black/70 hover:bg-slate-900 text-white border border-white/20"
                      }`}
                    >
                      <span>{inCompare ? "✓" : "+"}</span>
                      <span>{inCompare ? "Comparing" : "Compare"}</span>
                    </button>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>{p.builder}</span>
                        <span className="text-yellow-400 font-semibold">{p.pricePerSqft}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition mb-1 leading-snug">
                        {p.name}
                      </h3>

                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                        <span>📍</span> {p.locality}, {p.zone}
                      </p>

                      <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 text-xs text-gray-300 flex justify-between items-center">
                        <span className="font-semibold text-yellow-300">{p.bhk}</span>
                        <span className="text-gray-400">•</span>
                        <span>{p.sqft}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end mb-3">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                            Starting Price
                          </span>
                          <p className="text-lg sm:text-xl font-extrabold text-yellow-400">
                            {p.price}
                          </p>
                        </div>

                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {p.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/property-details"
                          className="text-center bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shadow"
                        >
                          View Details
                        </Link>
                        <a
                          href={`https://wa.me/919448567426?text=${encodeURIComponent(
                            `Hi, I want more details on ${p.name} (${p.locality}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 shadow"
                        >
                          <WhatsAppIcon className="w-4 h-4 fill-white" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
