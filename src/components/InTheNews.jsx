export default function InTheNews() {
  const mediaOutlets = [
    { name: "THE ECONOMIC TIMES", quote: "Pioneering transparent property advisory in South India" },
    { name: "THE TIMES OF INDIA", quote: "Helping buyers navigate Bengaluru's high-growth corridors" },
    { name: "CNBC TV18", quote: "Revolutionizing group negotiation in luxury real estate" },
    { name: "MINT", quote: "Unbiased ground audit and RERA verification leaders" },
    { name: "BUSINESS STANDARD", quote: "Trusted bridge between top developers and home buyers" },
  ];

  return (
    <section className="py-10 bg-slate-950 border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[11px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold mb-6">
          Featured &amp; Recognized In Major National Media
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          {mediaOutlets.map((item, idx) => (
            <div
              key={idx}
              className="px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-yellow-400/40 transition"
            >
              <span className="font-serif font-black tracking-wider text-xs sm:text-sm text-gray-300">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
