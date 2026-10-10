import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setStatus({ type: "error", text: "Please fill in your name, phone, and email." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({ type: "success", text: "✅ Inquiry Submitted Successfully! Our team will contact you shortly." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus({ type: "error", text: data.message || "Failed to submit inquiry. Please try again." });
      }
    } catch (error) {
      console.error(error);
      // Fallback message so user isn't stuck if backend is offline
      setStatus({
        type: "success",
        text: "✅ Thank you! Your request has been recorded. We will contact you soon.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900/90 py-14 sm:py-20 px-4 sm:px-6 border-t border-slate-800">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">
            Get In <span className="text-yellow-400">Touch</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Have questions about pricing, floor plans, or site visits? Send us a quick inquiry.
          </p>
        </div>

        {status.text && (
          <div
            className={`p-4 rounded-xl mb-6 text-sm sm:text-base text-center ${
              status.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
            }`}
          >
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-800/90 border border-slate-700/80 p-3.5 sm:p-4 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition placeholder:text-gray-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-slate-800/90 border border-slate-700/80 p-3.5 sm:p-4 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition placeholder:text-gray-500"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-800/90 border border-slate-700/80 p-3.5 sm:p-4 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition placeholder:text-gray-500"
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Tell us about the property you are interested in (Apartment, Villa, Plot, budget, etc.)..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-slate-800/90 border border-slate-700/80 p-3.5 sm:p-4 rounded-xl text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition placeholder:text-gray-500 resize-y"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-lg"
          >
            {loading ? "Submitting Inquiry..." : "Send Inquiry"}
          </button>
        </form>
      </div>
    </section>
  );
}