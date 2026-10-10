import { useEffect } from "react";
import { useCompare } from "../context/CompareContext";
import { propertiesData } from "../data/propertiesData";

export default function CompareModal() {
  const { compareList, removeFromCompare, addToCompare, isModalOpen, setIsModalOpen } = useCompare();

  // Lock scroll
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const quickAddCandidates = propertiesData
    .filter((p) => !compareList.some((c) => c.id === p.id))
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-6xl w-full my-auto max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-400 flex items-center gap-2">
              <span>⚖️</span> Project Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Side-by-side unbiased analysis of Bangalore's top residential developments
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 hover:text-white text-2xl p-2 rounded-xl transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {compareList.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-4xl block mb-3">🔍</span>
              <p className="text-gray-300 font-semibold text-lg">No projects selected for comparison yet.</p>
              <p className="text-gray-500 text-sm mt-1">Select projects by clicking the "+ Compare" button on any property card.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Suggestion banner if only 1 project is selected */}
              {compareList.length < 2 && (
                <div className="bg-yellow-400/10 border border-yellow-400/30 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                  <div className="text-yellow-300">
                    💡 <strong>Tip:</strong> Add at least one more project to see a direct comparison!
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickAddCandidates.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => addToCompare(c)}
                        className="bg-slate-800 hover:bg-yellow-400 hover:text-black text-gray-200 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition"
                      >
                        + Add {c.name.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  {/* Table Header: Project Cards */}
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-800">
                      <th className="p-4 w-40 sm:w-48 text-gray-400 font-semibold uppercase tracking-wider bg-slate-950/90 sticky left-0 z-10">
                        Feature / Metric
                      </th>
                      {compareList.map((p) => (
                        <th key={p.id} className="p-4 min-w-[240px] sm:min-w-[280px] align-top bg-slate-900/90">
                          <div className="relative rounded-xl overflow-hidden border border-slate-800 mb-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-32 sm:h-36 object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeFromCompare(p.id)}
                              className="absolute top-2 right-2 bg-black/70 hover:bg-rose-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition"
                              title="Remove project"
                            >
                              ✕
                            </button>
                            <span className="absolute bottom-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              {p.type}
                            </span>
                          </div>

                          <h3 className="font-bold text-white text-base sm:text-lg mb-1 leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-yellow-400 font-extrabold text-sm sm:text-base">
                            {p.price}
                          </p>
                          <p className="text-gray-400 text-xs mt-0.5">
                            {p.builder}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Rows */}
                  <tbody className="divide-y divide-slate-800 text-gray-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Approx Rate
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5 font-semibold text-yellow-300">
                          {p.pricePerSqft || "On Request"}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Location &amp; Zone
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <span className="font-medium text-white">{p.locality}</span>
                          <span className="text-gray-400 block text-xs">{p.zone}</span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Configurations
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5 font-medium text-white">
                          {p.bhk}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Built-up Size
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5">
                          {p.sqft}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Current Status
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                            p.status === "Ready to Move"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        RERA Registration
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5 text-xs font-mono text-gray-400">
                          {p.rera || "Approved"}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Key Highlights
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5 text-xs space-y-1">
                          {p.highlights?.map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                              <span className="text-yellow-400">✔</span>
                              <span>{h}</span>
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-slate-800/40">
                      <td className="p-3.5 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                        Major Amenities
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5 text-xs text-gray-300">
                          <div className="flex flex-wrap gap-1">
                            {p.amenities?.slice(0, 5).map((a, i) => (
                              <span key={i} className="bg-slate-800 px-2 py-0.5 rounded text-[11px]">
                                {a}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-slate-950">
                      <td className="p-4 font-bold text-white bg-slate-950 sticky left-0 z-10">
                        Take Action
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-4">
                          <a
                            href={`https://wa.me/919448567426?text=${encodeURIComponent(
                              `Hello OSHN BLRREALTOR, I compared ${p.name} on your website and would like the detailed price sheet and brochure.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black py-2.5 rounded-xl font-bold text-xs transition transform active:scale-95 shadow"
                          >
                            Get Best Price
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
