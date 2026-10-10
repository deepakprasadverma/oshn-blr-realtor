import { useCompare } from "../context/CompareContext";
import { propertiesData } from "../data/propertiesData";
import { Link } from "react-router-dom";

export default function Compare() {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useCompare();

  const otherProjects = propertiesData.filter(
    (p) => !compareList.some((c) => c.id === p.id)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            Objective Decision Engine
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 mb-3 sm:mb-4">
            Compare Bangalore Real Estate Projects
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300">
            Evaluate price per sq.ft, carpet areas, RERA certificates, and builder track records side-by-side.
          </p>
        </div>

        {/* Add Project Selector Bar */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-300 uppercase">
              Add Project To Compare:
            </span>
            <select
              onChange={(e) => {
                const found = propertiesData.find((p) => p.id === e.target.value);
                if (found) addToCompare(found);
                e.target.value = "";
              }}
              defaultValue=""
              className="bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm p-2.5 rounded-xl outline-none focus:border-yellow-400 flex-1 sm:flex-none"
            >
              <option value="" disabled>
                -- Select a Project to Add ({compareList.length}/3) --
              </option>
              {otherProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.locality} - {p.price})
                </option>
              ))}
            </select>
          </div>

          {compareList.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs text-rose-400 hover:text-rose-300 underline"
            >
              Clear Comparison
            </button>
          )}
        </div>

        {compareList.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 p-12 text-center rounded-3xl max-w-xl mx-auto">
            <span className="text-5xl block mb-4">⚖️</span>
            <h3 className="text-xl font-bold text-white mb-2">No projects selected yet</h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
              Select projects using the dropdown above or click the "+ Compare" button on any property card to start side-by-side evaluation.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {propertiesData.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => addToCompare(p)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-xl text-xs font-bold transition"
                >
                  + Add {p.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800">
                  <th className="p-5 w-44 sm:w-56 text-gray-400 font-semibold uppercase tracking-wider bg-slate-950 sticky left-0 z-10">
                    Project Matrix
                  </th>
                  {compareList.map((p) => (
                    <th key={p.id} className="p-5 min-w-[260px] align-top">
                      <div className="relative rounded-2xl overflow-hidden border border-slate-800 mb-3 shadow">
                        <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="absolute top-2 right-2 bg-black/70 hover:bg-rose-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs transition"
                          title="Remove"
                        >
                          ✕
                        </button>
                        <span className="absolute bottom-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          {p.type}
                        </span>
                      </div>
                      <h2 className="font-bold text-white text-lg mb-1 leading-tight">{p.name}</h2>
                      <p className="text-yellow-400 font-black text-base">{p.price}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{p.builder}</p>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800 text-gray-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Per Sq.ft Rate
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 font-bold text-yellow-300">
                      {p.pricePerSqft}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Location &amp; Micro-Market
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      <span className="font-semibold text-white">{p.locality}</span>
                      <span className="text-gray-400 block text-xs">{p.zone}</span>
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Configurations
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 font-medium text-white">
                      {p.bhk}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Unit Dimensions
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.sqft}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    RERA Number
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-xs font-mono text-gray-400">
                      {p.rera}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Possession Status
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold">
                        {p.status}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Project Size &amp; Units
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-xs">
                      {p.totalUnits}
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-white bg-slate-950/80 sticky left-0 z-10">
                    Key Highlights
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4 text-xs space-y-1">
                      {p.highlights?.map((h, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <span className="text-yellow-400">✔</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                <tr className="bg-slate-950">
                  <td className="p-4 font-bold text-white bg-slate-950 sticky left-0 z-10">
                    Next Step
                  </td>
                  {compareList.map((p) => (
                    <td key={p.id} className="p-4">
                      <a
                        href={`https://wa.me/919448567426?text=${encodeURIComponent(
                          `Hello OSHN BLRREALTOR, I compared ${p.name} on the compare page. Please send me the negotiated costing sheet.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-xs transition"
                      >
                        Request Costing Sheet
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
