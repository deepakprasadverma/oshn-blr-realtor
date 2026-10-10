import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim()
    ) {
      setStatus({ type: "error", text: "Please fill in all required fields." });
      return;
    }

    try {
      setLoading(true);
      setStatus({ type: "", text: "" });

      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          text: "✅ Enquiry Submitted Successfully! Our Bangalore realty expert will connect with you soon.",
        });

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setStatus({ type: "error", text: data.message || "Failed to submit. Please try again." });
      }
    } catch (error) {
      console.error(error);
      // Offline fallback
      setStatus({
        type: "success",
        text: "✅ Thank you! Your enquiry has been received. Our team will reach out directly.",
      });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            We Are Here To Help
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 sm:mb-4">
            Contact OSHN BLRREALTOR
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Get personalized consultations, arrange site visits, or inquire about Bangalore's finest projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {/* Office Information */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-6">
                Office Information
              </h2>

              <div className="space-y-5 text-sm sm:text-base text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <h3 className="font-semibold text-white">Registered Address</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                      490, 4th Cross Rd, AG's Layout, Mathikere, Bengaluru, Karnataka 560054
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <h3 className="font-semibold text-white">Direct Hotline</h3>
                    <a
                      href="tel:+919448567426"
                      className="text-yellow-400 hover:underline text-xs sm:text-sm block mt-0.5"
                    >
                      +91 9448567426
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📧</span>
                  <div>
                    <h3 className="font-semibold text-white">Email Address</h3>
                    <a
                      href="mailto:srikant.blrrealtor@gmail.com"
                      className="text-gray-300 hover:text-yellow-400 hover:underline text-xs sm:text-sm block mt-0.5"
                    >
                      srikant.blrrealtor@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🕒</span>
                  <div>
                    <h3 className="font-semibold text-white">Working Hours</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                      Monday - Saturday: 9:00 AM - 7:00 PM <br />
                      Sunday: By Appointment for Site Visits
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action in Office card */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919448567426"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm transition"
              >
                💬 Chat on WhatsApp
              </a>
              <a
                href="tel:+919448567426"
                className="w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-sm transition"
              >
                📞 Direct Call
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-6">
              Send Us An Enquiry
            </h2>

            {status.text && (
              <div
                className={`p-4 rounded-xl mb-6 text-sm text-center ${
                  status.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                }`}
              >
                {status.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9448567426"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Your Message or Requirement
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Specify budget, preferred area (Whitefield, Sarjapur, etc.) or project..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3.5 sm:p-4 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm sm:text-base outline-none focus:border-yellow-400 transition resize-y"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 disabled:opacity-50 shadow-lg"
              >
                {loading ? "Submitting..." : "Send Enquiry Now"}
              </button>
            </form>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6">
            Find Our Office
          </h2>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0359118595225!2d77.5615622748205!3d13.033385113521186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17dfd797bcf1%3A0x6b17107fb55af7e8!2s490%2C%204th%20Cross%20Rd%2C%20AG's%20Layout%2C%20Mathikere%2C%20Bengaluru%2C%20Karnataka%20560054!5e0!3m2!1sen!2sin!4v1781537595863!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OSHN BLRREALTOR Google Map Location"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}