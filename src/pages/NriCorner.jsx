import { useState } from "react";

export default function NriCorner() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "USA / Canada",
    budget: "$150,000 - $300,000 (₹1.25 Cr - ₹2.5 Cr)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello OSHN BLRREALTOR, NRI Desk Inquiry:

Name: ${formData.name}
Country: ${formData.country}
Phone/WhatsApp: ${formData.phone}
Email: ${formData.email}
Target Budget: ${formData.budget}
Requirement: ${formData.message || "Looking for prime Bangalore real estate"}`;

    window.open(
      `https://wa.me/919448567426?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  const nriServices = [
    {
      title: "Virtual 3D Video Walkthroughs",
      desc: "Live video walkthroughs of construction progress, sample flats, and neighborhood road infrastructure without traveling.",
      icon: "🎥",
    },
    {
      title: "RBI & FEMA Legal Guidance",
      desc: "Comprehensive advice on foreign inward remittances, NRE / NRO banking regulations, and tax treaties (DTAA).",
      icon: "⚖️",
    },
    {
      title: "Power of Attorney (PoA) Assistance",
      desc: "Seamless legal drafting and consular stamping assistance for executing property purchase and registration remotely.",
      icon: "📜",
    },
    {
      title: "End-to-End Tenant & Rental Management",
      desc: "Tenant sourcing, rental agreement execution, and interior fit-out oversight so your asset generates passive income immediately.",
      icon: "🔑",
    },
    {
      title: "High Capital Yield Corridors",
      desc: "Data-backed investment selections in Bangalore's Airport Corridor (Devanahalli) and Whitefield yielding 12-18% annualized returns.",
      icon: "📈",
    },
    {
      title: "Repatriation of Sale Proceeds",
      desc: "Advisory on Form 15CA/CB documentation for smooth repatriation of funds back to your country of residence.",
      icon: "🌐",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            Dedicated Global Desk
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            NRI Real Estate Advisory Services
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            Helping Non-Resident Indians across the USA, UK, UAE, Singapore, and Australia invest safely in Bangalore's highest-performing residential developments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {nriServices.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-yellow-400/40 transition shadow-lg"
            >
              <div>
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* NRI Consultation Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 text-center mb-2">
              Connect With Our Senior NRI Desk
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 text-center mb-8">
              Schedule a personalized video consultation at your preferred time zone.
            </p>

            {submitted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center text-sm mb-6">
                ✅ Thank you! Our NRI Desk manager will reach out via WhatsApp/Email shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Country of Residence *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-yellow-400"
                  >
                    <option value="USA / Canada">USA / Canada</option>
                    <option value="United Kingdom / Europe">United Kingdom / Europe</option>
                    <option value="UAE / Saudi Arabia / Middle East">UAE / Middle East</option>
                    <option value="Singapore / Malaysia">Singapore / Malaysia</option>
                    <option value="Australia / New Zealand">Australia / New Zealand</option>
                    <option value="Other">Other Countries</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 408 555 1234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Target Investment Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-yellow-400"
                >
                  <option value="Below $120,000 (₹60L - ₹1 Cr)">Below $120,000 (₹60L - ₹1 Cr)</option>
                  <option value="$120,000 - $250,000 (₹1 Cr - ₹2 Cr)">$120,000 - $250,000 (₹1 Cr - ₹2 Cr)</option>
                  <option value="$250,000 - $500,000 (₹2 Cr - ₹4 Cr)">$250,000 - $500,000 (₹2 Cr - ₹4 Cr)</option>
                  <option value="Above $500,000 (₹4 Cr+ Luxury Villa / Penthouse)">Above $500,000 (₹4 Cr+ Luxury)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-1">Specific Requirements / Preferred Locations</label>
                <textarea
                  rows="3"
                  placeholder="Tell us if you want rental income, capital appreciation, or a retirement home..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-yellow-400 resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <span>🌍</span> Book NRI Video Consultation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
