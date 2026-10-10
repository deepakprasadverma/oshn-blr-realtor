import { useState } from "react";
import { Link } from "react-router-dom";
import SiteVisitModal from "./SiteVisitModal";

export default function Hero() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <section
        className="relative min-h-[82vh] sm:min-h-[88vh] flex items-center justify-center text-center bg-cover bg-center py-16 sm:py-24"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2, 6, 23, 0.78), rgba(2, 6, 23, 0.82)), url('https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1920')",
        }}
      >
        <div className="px-4 sm:px-6 max-w-5xl mx-auto w-full">
          <div className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 sm:mb-6">
            ✨ Verified Properties across Bengaluru
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4 sm:mb-6">
            <span className="text-rose-500">Bangalore's Trusted</span>
            <span className="block text-yellow-400 mt-1 sm:mt-2">
              Real Estate Partner
            </span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-3 sm:mb-4 font-semibold tracking-wide">
            Apartments <span className="text-yellow-400">•</span> Villas{" "}
            <span className="text-yellow-400">•</span> Plots
          </p>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed px-2">
            Discover premium, RERA-approved real estate opportunities with
            expert guidance, transparent deals, and zero brokerage assistance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            <Link to="/apartments" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition transform hover:scale-105 active:scale-95 shadow-lg">
                Explore Projects
              </button>
            </Link>

            <button
              onClick={() => setOpenModal(true)}
              className="w-full sm:w-auto border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      </section>

      <SiteVisitModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}