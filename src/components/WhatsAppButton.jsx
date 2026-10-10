export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919448567426"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp with OSHN BLRREALTOR"
      title="Chat on WhatsApp"
      className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:px-5 sm:py-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 z-40 border-2 border-slate-900 flex items-center gap-2 group"
    >
      <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform">💬</span>
      <span className="hidden sm:inline font-bold text-sm">WhatsApp</span>
    </a>
  );
}