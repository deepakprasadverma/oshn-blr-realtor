export default function CallButton() {
  return (
    <a
      href="tel:+919448567426"
      aria-label="Call OSHN BLRREALTOR Expert"
      title="Call Expert"
      className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 hover:bg-amber-400 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 z-40 border-2 border-slate-900 group"
    >
      <span className="group-hover:rotate-12 transition-transform">📞</span>
      <span className="hidden lg:group-hover:block absolute right-16 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap shadow-md border border-slate-800">
        Call Expert
      </span>
    </a>
  );
}