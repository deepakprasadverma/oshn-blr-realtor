import { Link } from "react-router-dom";

export default function Apartments() {
  const apartments = [
    {
      name: "Prestige Lakeside Habitat",
      location: "Whitefield, Bangalore",
      price: "₹85 Lakhs Onwards",
      bhk: "2, 2.5 & 3 BHK",
      sqft: "1195 - 1650 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Sobha Dream Acres",
      location: "Panathur / Varthur, Bangalore",
      price: "₹75 Lakhs Onwards",
      bhk: "1 & 2 BHK",
      sqft: "650 - 1200 Sq.ft",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Brigade El Dorado",
      location: "Aerospace Park, Bagalur, Bangalore",
      price: "₹65 Lakhs Onwards",
      bhk: "2 & 3 BHK",
      sqft: "795 - 1561 Sq.ft",
      status: "New Launch",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Godrej Splendour",
      location: "Whitefield, Bangalore",
      price: "₹92 Lakhs Onwards",
      bhk: "2 & 3 BHK",
      sqft: "980 - 1550 Sq.ft",
      status: "Possession 2026",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Assetz Marq 3.0",
      location: "Kannamangala, Whitefield, Bangalore",
      price: "₹1.15 Cr Onwards",
      bhk: "3 & 4 BHK",
      sqft: "1350 - 2250 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    },
    {
      name: "Total Environment In That Quiet Earth",
      location: "Hennur Main Road, Bangalore",
      price: "₹1.85 Cr Onwards",
      bhk: "3 & 4 BHK Luxury",
      sqft: "2300 - 3400 Sq.ft",
      status: "Under Construction",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            Premium Living
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 sm:mb-4">
            Luxury Apartments in Bengaluru
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300">
            Explore 1, 2, 3 & 4 BHK high-rise condominiums with lifestyle clubhouse amenities in top IT hubs and arterial corridors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {apartments.map((apt, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:shadow-xl hover:shadow-yellow-400/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={apt.image}
                  alt={apt.name}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase shadow">
                  {apt.status}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition">
                    {apt.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                    <span>📍</span> {apt.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                    <span className="font-semibold text-yellow-400">{apt.bhk}</span>
                    <span>•</span>
                    <span>{apt.sqft}</span>
                  </div>
                </div>

                <div>
                  <p className="text-yellow-400 font-extrabold text-lg sm:text-xl mb-4">
                    {apt.price}
                  </p>

                  <Link to="/property-details">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-md">
                      View Details &amp; Floor Plan
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