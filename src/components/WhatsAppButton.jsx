import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919448567426?text=Hi%20OSHN%20BLRREALTOR,%20I%20am%20interested%20in%20Bangalore%20properties."
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp with OSHN BLRREALTOR"
      title="Chat on WhatsApp"
      className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 border-2 border-slate-900 flex items-center gap-2 group ring-4 ring-[#25D366]/20"
    >
      <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white transition-transform group-hover:scale-110" />
      <span className="hidden sm:inline font-bold text-sm tracking-wide">WhatsApp</span>
    </a>
  );
}