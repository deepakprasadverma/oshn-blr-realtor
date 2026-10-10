import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 tracking-tight leading-tight">
          Ready To Find Your Dream Property?
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-900 mb-6 sm:mb-8 font-medium max-w-xl mx-auto">
          Connect with our certified realty experts and schedule a free guided site visit today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          <Link to="/contact" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-black hover:bg-slate-900 text-white px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95 shadow-lg">
              Contact Us Today
            </button>
          </Link>

          <Link to="/apartments" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto border-2 border-black hover:bg-black hover:text-white px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition transform active:scale-95">
              Explore Properties
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}