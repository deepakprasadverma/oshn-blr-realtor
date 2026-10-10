import { useState, useEffect } from "react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppPreformModal({ isOpen, onClose }) {
  const [phone, setPhone] = useState("");
  const [timeline, setTimeline] = useState("within 30 Days");
  const [config, setConfig] = useState("3 BHK - 1.5Cr - 2.5Cr");
  const [locality, setLocality] = useState("Whitefield & East Bangalore");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!phone.trim()) {
      alert("Please provide your WhatsApp phone number.");
      return;
    }

    const message = `Hello OSHN BLRREALTOR, I would like customized property options.

📱 Phone: ${phone}
📅 Buying Timeline: ${timeline}
🏡 Preferred Configuration: ${config}
📍 Preferred Area: ${locality}`;

    window.open(
      `https://wa.me/919448567426?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-md w-full shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
              <WhatsAppIcon className="w-6 h-6 fill-[#25D366]" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">Chat on WhatsApp</h3>
              <p className="text-xs text-gray-400">Get instant pricing sheets &amp; brochures</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl p-1"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Your WhatsApp Number *
            </label>
            <input
              type="tel"
              placeholder="+91 94485 67426"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Buying Timeline? *
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500"
            >
              <option value="within 30 Days">Immediate (within 30 Days)</option>
              <option value="within 90 Days">within 90 Days</option>
              <option value="in 3 - 6 Months">in 3 - 6 Months</option>
              <option value="Exploring for future">Exploring for future</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Preferred Configuration &amp; Budget? *
            </label>
            <select
              value={config}
              onChange={(e) => setConfig(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500"
            >
              <option value="1 & 2 BHK (₹60L - ₹1Cr)">1 &amp; 2 BHK (₹60L - ₹1Cr)</option>
              <option value="2 & 3 BHK (₹1Cr - ₹1.8Cr)">2 &amp; 3 BHK (₹1Cr - ₹1.8Cr)</option>
              <option value="3 & 4 BHK Luxury (₹1.8Cr - ₹3Cr)">3 &amp; 4 BHK Luxury (₹1.8Cr - ₹3Cr)</option>
              <option value="Ultra Luxury Villa (₹3Cr - ₹6Cr+)">Ultra Luxury Villa (₹3Cr - ₹6Cr+)</option>
              <option value="Investment Plot (₹35L - ₹80L)">Investment Plot (₹35L - ₹80L)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Preferred Locality / Zone? *
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500"
            >
              <option value="Whitefield & East Bangalore">Whitefield &amp; East Bangalore</option>
              <option value="Sarjapur Road Corridor">Sarjapur Road Corridor</option>
              <option value="North Bangalore / Airport / Devanahalli">North Bangalore / Airport / Devanahalli</option>
              <option value="Electronic City / South Bangalore">Electronic City / South Bangalore</option>
              <option value="Hebbal & Central Bangalore">Hebbal &amp; Central Bangalore</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 rounded-xl font-bold text-sm transition transform active:scale-95 shadow-lg mt-2 flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white" />
            <span>Start WhatsApp Chat</span>
          </button>
        </form>
      </div>
    </div>
  );
}
