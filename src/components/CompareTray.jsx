import { useCompare } from "../context/CompareContext";
import { Link } from "react-router-dom";

export default function CompareTray() {
  const { compareList, removeFromCompare, clearCompare, setIsModalOpen } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-yellow-400/40 shadow-2xl px-4 py-3 text-white animate-fadeIn">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left items list */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider whitespace-nowrap bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/30">
            Compare ({compareList.length}/3)
          </span>

          {compareList.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 rounded-full pl-2 pr-1.5 py-1 text-xs whitespace-nowrap shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-medium text-gray-200 max-w-[120px] sm:max-w-[160px] truncate">
                {item.name}
              </span>
              <button
                type="button"
                onClick={() => removeFromCompare(item.id)}
                className="w-4 h-4 rounded-full bg-slate-700 hover:bg-rose-600 text-gray-300 hover:text-white flex items-center justify-center text-[10px] transition"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={clearCompare}
            className="text-xs text-gray-400 hover:text-white underline transition px-2 py-1"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition transform active:scale-95 shadow-md flex items-center justify-center gap-1.5"
          >
            <span>⚖️</span> Compare Side-by-Side
          </button>
        </div>
      </div>
    </div>
  );
}
