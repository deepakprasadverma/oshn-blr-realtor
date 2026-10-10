import { Link } from "react-router-dom";

export default function Properties() {
  const properties = [
    {
      title: "Prestige Lakeside Habitat",
      type: "Apartment",
      location: "Whitefield, Bangalore",
      price: "₹85 Lakhs Onwards",
      specs: "2, 3 & 4 BHK • 1200 - 3000 Sq.ft",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000",
    },
    {
      title: "Luxury Villa Community",
      type: "Villa",
      location: "Sarjapur Road, Bangalore",
      price: "₹2.5 Cr Onwards",
      specs: "3 & 4 BHK • 2400 - 4500 Sq.ft",
      image:
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000",
    },
    {
      title: "Premium Investment Plots",
      type: "Plot",
      location: "Devanahalli, Bangalore",
      price: "₹45 Lakhs Onwards",
      specs: "1200 - 2400 Sq.ft • BIAAPA Approved",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
    },
  ];

  return (
    <section className="bg-slate-950 py-14 sm:py-20 px-4 sm:px-6" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Featured Projects in <span className="text-yellow-400">Bangalore</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Handpicked premium developments with superior amenities and high ROI potential
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.map((property, index) => (
            <div
              key={index}
              className="bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:shadow-xl hover:shadow-yellow-400/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  {property.type}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition">
                    {property.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-2 flex items-center gap-1.5">
                    <span>📍</span> {property.location}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-400 mb-4 bg-slate-800/80 p-2 rounded-lg border border-slate-700/50">
                    {property.specs}
                  </p>
                </div>

                <div>
                  <p className="text-yellow-400 font-extrabold text-lg sm:text-xl mb-4">
                    {property.price}
                  </p>

                  <Link
                    to="/property-details"
                    className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}