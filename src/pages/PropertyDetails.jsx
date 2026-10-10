import { useState } from "react";
import SiteVisitModal from "../components/SiteVisitModal";
import { useCompare } from "../context/CompareContext";
import { propertiesData } from "../data/propertiesData";
import { Link } from "react-router-dom";

export default function PropertyDetails() {
  const [openModal, setOpenModal] = useState(false);
  const { addToCompare, isInCompare, setIsModalOpen } = useCompare();

  const currentProperty = propertiesData[0]; // Prestige Lakeside Habitat
  const inCompare = isInCompare(currentProperty.id);

  const images = currentProperty.gallery;
  const [activeImage, setActiveImage] = useState(images[0]);

  const amenities = [
    { name: "Infinity Swimming Pool", icon: "🏊" },
    { name: "Fully Equipped Gymnasium", icon: "🏋" },
    { name: "Landscaped Gardens & Lake", icon: "🌳" },
    { name: "Tennis & Badminton Courts", icon: "🎾" },
    { name: "Covered Reserved Parking", icon: "🚗" },
    { name: "24/7 CCTV & Gated Security", icon: "🛡" },
    { name: "Children's Play Area", icon: "🎠" },
    { name: "Grand Clubhouse & Lounge", icon: "🏛" },
    { name: "100% Power Backup", icon: "⚡" },
  ];

  const specs = [
    { label: "Configuration", value: currentProperty.bhk },
    { label: "Super Built-up Area", value: currentProperty.sqft },
    { label: "Price / Sq.ft", value: currentProperty.pricePerSqft },
    { label: "Possession Status", value: currentProperty.status },
    { label: "Total Project Area", value: currentProperty.totalUnits },
    { label: "RERA Registration", value: currentProperty.rera },
    { label: "Bank Approvals", value: "SBI, HDFC, ICICI, Axis Bank" },
    { label: "Developer", value: currentProperty.builder },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb & Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <span>›</span>
            <Link to="/apartments" className="hover:text-yellow-400">Apartments</Link>
            <span>›</span>
            <span className="text-yellow-400">{currentProperty.name}</span>
          </div>

          <button
            type="button"
            onClick={() => addToCompare(currentProperty)}
            className={`text-xs font-bold px-4 py-1.5 rounded-full border transition flex items-center gap-1.5 ${
              inCompare
                ? "bg-amber-500 text-black border-amber-300"
                : "bg-slate-800 hover:bg-slate-700 text-yellow-400 border-yellow-400/30"
            }`}
          >
            <span>{inCompare ? "✓" : "⚖️"}</span>
            <span>{inCompare ? "Added to Compare" : "+ Compare this Project"}</span>
          </button>
        </div>

        {/* Property Gallery */}
        <div className="space-y-3 sm:space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <img
              src={activeImage}
              alt="Prestige Lakeside Habitat Main View"
              className="w-full h-60 sm:h-80 md:h-[460px] object-cover transition duration-300"
            />
            <span className="absolute top-4 left-4 bg-yellow-400 text-black text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full uppercase shadow-md">
              Featured Listing
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                className={`relative rounded-xl overflow-hidden border-2 transition ${
                  activeImage === img
                    ? "border-yellow-400 scale-[1.02]"
                    : "border-slate-800 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-16 sm:h-24 md:h-28 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Title & Quick Info Header */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2.5 py-0.5 rounded-full border border-yellow-400/30">
                {currentProperty.builder}
              </span>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                RERA Approved
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white">
              {currentProperty.name}
            </h1>
            <p className="text-sm sm:text-lg text-gray-400 mt-1 sm:mt-2 flex items-center gap-1.5">
              <span>📍</span> {currentProperty.location}
            </p>
          </div>

          <div className="md:text-right">
            <span className="text-xs text-gray-400 block uppercase tracking-wider">
              Starting Price
            </span>
            <p className="text-2xl sm:text-4xl text-yellow-400 font-black">
              {currentProperty.price}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Rate: {currentProperty.pricePerSqft}</p>
          </div>
        </div>

        {/* Action Buttons for Mobile & Desktop */}
        <div className="my-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => setOpenModal(true)}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-xl font-bold text-base transition transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <span>📅</span> Book Free Site Visit
          </button>

          <a
            href={`https://wa.me/919448567426?text=${encodeURIComponent(
              `Hi OSHN BLRREALTOR, I am interested in ${currentProperty.name}. Please share the negotiated cost sheet, master plan, and floor plans.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-base transition transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <span>💬</span> Request Cost Sheet on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => {
              if (!inCompare) addToCompare(currentProperty);
              setIsModalOpen(true);
            }}
            className="bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 px-6 py-4 rounded-xl font-bold text-base transition flex items-center justify-center gap-2"
          >
            <span>⚖️</span> Compare with Others
          </button>
        </div>

        {/* Key Highlights / Specs */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Project Overview &amp; Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {specs.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-xl"
              >
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            World-Class Amenities
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 sm:gap-4">
            {amenities.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex items-center gap-3 hover:border-yellow-400/30 transition"
              >
                <span className="text-2xl sm:text-3xl">{item.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-gray-200">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Developer Note */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 sm:p-8 rounded-2xl text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400">
              About This Property
            </h2>
            <p>
              Prestige Lakeside Habitat is a sprawling luxury enclave overlooking the picturesque Varthur Lake. Spread across 102 acres, this development presents an idyllic Disney-themed lifestyle designed for families seeking expansive green surroundings without compromising on proximity to Whitefield's prime IT corridors.
            </p>
            <p>
              Featuring an 80-acre open green expanse, multi-tier sports arenas, multiple swimming pools, and top-tier security systems, it stands as one of Bengaluru's most desirable residential landmarks.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                Developer Background
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-2">
                Prestige Group
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                South India's leading developer with 38+ years of legacy, 150+ Mn sq.ft delivered, and an impeccable track record of timely handovers.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-yellow-400 font-semibold mt-4">
              ✨ Zero Brokerage &amp; Direct Builder Pricing guaranteed through OSHN BLRREALTOR.
            </div>
          </div>
        </div>

        {/* Location Map */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
            Location &amp; Connectivity
          </h2>

          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0359118595225!2d77.5615622748205!3d13.033385113521186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17dfd797bcf1%3A0x6b17107fb55af7e8!2s490%2C%204th%20Cross%20Rd%2C%20AG's%20Layout%2C%20Mathikere%2C%20Bengaluru%2C%20Karnataka%20560054!5e0!3m2!1sen!2sin!4v1781537595863!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              className="w-full"
              title="Prestige Lakeside Habitat Location Map"
            ></iframe>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-yellow-400/20 border border-yellow-400/40 rounded-2xl p-6 sm:p-10 text-center">
          <h3 className="text-xl sm:text-3xl font-bold text-white mb-2">
            Interested in visiting this project?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-6 max-w-xl mx-auto">
            Book an accompanied site visit with our senior property consultant. Zero charges, zero brokerage.
          </p>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-lg"
          >
            Schedule Site Visit Now
          </button>
        </div>

        {/* Modal */}
        <SiteVisitModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </div>
  );
}