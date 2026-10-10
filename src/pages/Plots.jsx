import { Link } from "react-router-dom";

export default function Plots() {
  const plots = [
    {
      name: "Prestige Great Acres",
      location: "The Prestige City, Sarjapur Road, Bangalore",
      price: "₹45 Lakhs Onwards",
      dimension: "1200, 1500 & 2400 Sq.ft",
      approval: "BDA Approved & RERA",
      status: "Ready for Registration",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    },
    {
      name: "Brigade Oasis",
      location: "Devanahalli, North Bangalore",
      price: "₹35 Lakhs Onwards",
      dimension: "1200 - 3200 Sq.ft",
      approval: "BIAAPA Approved",
      status: "Gated Plotted Enclave",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
    },
    {
      name: "Sobha Greenfield",
      location: "Mysore Road, Bangalore",
      price: "₹40 Lakhs Onwards",
      dimension: "1200 - 2000 Sq.ft",
      approval: "BMRDA Approved",
      status: "Ready to Construct",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
    },
    {
      name: "Godrej Woodland",
      location: "Sarjapur Road Extension, Bangalore",
      price: "₹38 Lakhs Onwards",
      dimension: "900 - 1800 Sq.ft",
      approval: "DTCP & RERA Approved",
      status: "Resort Style Theme",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000",
    },
    {
      name: "Purva Tivoli Hills",
      location: "Devanahalli, Near Airport, Bangalore",
      price: "₹55 Lakhs Onwards",
      dimension: "1200 - 3200 Sq.ft",
      approval: "BIAAPA Approved",
      status: "Italian Themed Plotted",
      image:
        "https://images.unsplash.com/photo-1511497584788-87676104235f?w=1000",
    },
    {
      name: "Century Seasons",
      location: "Yelahanka - Doddaballapur Road, Bangalore",
      price: "₹48 Lakhs Onwards",
      dimension: "1500 - 2400 Sq.ft",
      approval: "BIAAPA Approved",
      status: "Ready for Registration",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            High Growth Land
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 sm:mb-4">
            Premium Investment Plots
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300">
            Clear titled, BDA &amp; BIAAPA approved plotted developments in Bangalore's highest capital appreciation belts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plots.map((plot, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:shadow-xl hover:shadow-yellow-400/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={plot.image}
                  alt={plot.name}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase shadow">
                  {plot.status}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition">
                    {plot.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                    <span>📍</span> {plot.location}
                  </p>

                  <div className="flex flex-col gap-1 mb-4 text-xs text-gray-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                    <div className="font-semibold text-yellow-400">📏 {plot.dimension}</div>
                    <div className="text-gray-400">📜 {plot.approval}</div>
                  </div>
                </div>

                <div>
                  <p className="text-yellow-400 font-extrabold text-lg sm:text-xl mb-4">
                    {plot.price}
                  </p>

                  <Link to="/property-details">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-md">
                      View Plot Layout &amp; Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}