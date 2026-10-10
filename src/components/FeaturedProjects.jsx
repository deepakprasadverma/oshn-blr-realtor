import { Link } from "react-router-dom";

export default function FeaturedProjects() {
  const projects = [
    {
      name: "Prestige Lakeside Habitat",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000",
      type: "Apartment",
      price: "₹85 L+",
      location: "Whitefield, Bangalore",
    },
    {
      name: "Prestige Golfshire",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000",
      type: "Villa",
      price: "₹4.5 Cr+",
      location: "Nandi Hills, Bangalore",
    },
    {
      name: "Prestige Great Acres",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000",
      type: "Plot",
      price: "₹45 L+",
      location: "Sarjapur Road, Bangalore",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-950 text-white px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-8 sm:mb-12">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-yellow-400/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                  {project.type}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4">
                    📍 {project.location}
                  </p>
                </div>

                <div>
                  <p className="text-yellow-400 font-bold text-lg mb-4">
                    {project.price}
                  </p>
                  <Link to="/property-details">
                    <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-sm sm:text-base transition active:scale-95 shadow">
                      View Details
                    </button>
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