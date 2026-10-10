import { Link } from "react-router-dom";

export default function Villas() {
  const villas = [
    {
      name: "Prestige Golfshire",
      location: "Nandi Hills, Bangalore",
      price: "₹4.5 Crore Onwards",
      bhk: "4 & 5 BHK Mansions",
      sqft: "5895 - 9905 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1000",
    },
    {
      name: "Sobha Lifestyle Legacy",
      location: "IVC Road, Devanahalli, Bangalore",
      price: "₹3.8 Crore Onwards",
      bhk: "4 BHK Presidential Villas",
      sqft: "4600 - 6200 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000",
    },
    {
      name: "Embassy Boulevard",
      location: "Bellary Road, Yelahanka, Bangalore",
      price: "₹5.0 Crore Onwards",
      bhk: "4 & 5 BHK Ultra Luxury",
      sqft: "3935 - 7310 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1000",
    },
    {
      name: "Raffles Park",
      location: "Soukya Road, Whitefield, Bangalore",
      price: "₹4.2 Crore Onwards",
      bhk: "5 BHK Singapore Styled",
      sqft: "6200 - 6900 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000",
    },
    {
      name: "Adarsh Palm Retreat",
      location: "Outer Ring Road, Bellandur, Bangalore",
      price: "₹6.5 Crore Onwards",
      bhk: "4 BHK Red Cedar Villas",
      sqft: "3150 - 5500 Sq.ft",
      status: "Resale & Fresh",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000",
    },
    {
      name: "Prestige Silver Oak",
      location: "ECC Road, Whitefield, Bangalore",
      price: "₹3.2 Crore Onwards",
      bhk: "4 BHK Luxury Villas",
      sqft: "3600 - 4150 Sq.ft",
      status: "Ready to Move",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            Elite Living
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 sm:mb-4">
            Luxury Gated Community Villas
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300">
            Private gardens, individual clubhouse privileges, and serene landscapes across Bangalore's most prestigious enclaves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {villas.map((villa, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:shadow-xl hover:shadow-yellow-400/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase shadow">
                  {villa.status}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white group-hover:text-yellow-400 transition">
                    {villa.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                    <span>📍</span> {villa.location}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                    <span className="font-semibold text-yellow-400">{villa.bhk}</span>
                    <span>•</span>
                    <span>{villa.sqft}</span>
                  </div>
                </div>

                <div>
                  <p className="text-yellow-400 font-extrabold text-lg sm:text-xl mb-4">
                    {villa.price}
                  </p>

                  <Link to="/property-details">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-md">
                      View Details &amp; Layout
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