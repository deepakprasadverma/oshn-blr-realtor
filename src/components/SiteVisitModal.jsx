import { useState, useEffect } from "react";

export default function SiteVisitModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [property, setProperty] = useState("");
  const [date, setDate] = useState("");

  // Lock body scroll when modal is open
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

    if (!name.trim() || !phone.trim()) {
      alert("Please provide your name and phone number.");
      return;
    }

    const message = `Hello OSHN BLRREALTOR, I would like to book a site visit.

Name: ${name}
Phone: ${phone}
Email: ${email || "N/A"}
Property: ${property || "General Inquiry"}
Preferred Date: ${date || "Earliest available"}`;

    window.open(
      `https://wa.me/919448567426?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 p-5 sm:p-8 rounded-2xl w-full max-w-md my-auto max-h-[92vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 sm:mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
              Book Site Visit
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Free personalized pick-up & site walkthrough
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl p-1 rounded-lg transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="e.g. rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Property / Location of Interest
            </label>
            <input
              type="text"
              placeholder="e.g. Prestige Lakeside Habitat"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Preferred Date for Visit
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3.5 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-lg mt-2"
          >
            Confirm & Send on WhatsApp
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full border border-slate-700 hover:bg-slate-800 py-3 rounded-xl text-gray-300 text-sm transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}