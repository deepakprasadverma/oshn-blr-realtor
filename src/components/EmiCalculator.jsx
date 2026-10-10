import { useState } from "react";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(7500000); // 75 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState(20); // 20 years default

  // Calculate Monthly EMI
  // Formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  };

  const { emi, totalInterest, totalPayment } = calculateEMI();

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Percentages for visual bar
  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <section className="py-14 sm:py-20 bg-slate-950 border-t border-slate-900 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-2">
            Financial Planning
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Home Loan <span className="text-yellow-400">EMI &amp; Costing Calculator</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Estimate your monthly installments and plan your dream home purchase with current interest rates.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders Input Area */}
          <div className="lg:col-span-7 space-y-6">
            {/* Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-300">
                  Loan Amount
                </label>
                <span className="text-sm sm:text-base font-extrabold text-yellow-400">
                  {formatINR(loanAmount)}
                </span>
              </div>
              <input
                type="range"
                min="1000000"
                max="30000000"
                step="500000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>₹10 Lakhs</span>
                <span>₹1.5 Cr</span>
                <span>₹3 Crores</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-300">
                  Interest Rate (% p.a.)
                </label>
                <span className="text-sm sm:text-base font-extrabold text-yellow-400">
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="7.0"
                max="12.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>7.0%</span>
                <span>8.5% (Avg)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-semibold text-gray-300">
                  Loan Tenure (Years)
                </label>
                <span className="text-sm sm:text-base font-extrabold text-yellow-400">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-yellow-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                <span>5 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-widest block mb-1">
                Estimated Monthly EMI
              </span>
              <p className="text-3xl sm:text-4xl font-black text-yellow-400 tracking-tight">
                {formatINR(emi)} <span className="text-xs font-normal text-gray-400">/ month</span>
              </p>
            </div>

            {/* Progress ratio bar */}
            <div>
              <div className="h-3 rounded-full overflow-hidden flex bg-slate-800">
                <div
                  style={{ width: `${principalPercent}%` }}
                  className="bg-yellow-400 transition-all duration-300"
                  title={`Principal: ${principalPercent}%`}
                ></div>
                <div
                  style={{ width: `${interestPercent}%` }}
                  className="bg-amber-600 transition-all duration-300"
                  title={`Interest: ${interestPercent}%`}
                ></div>
              </div>

              <div className="flex justify-between text-xs mt-2 text-gray-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span> Principal ({principalPercent}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Interest ({interestPercent}%)
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs sm:text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Principal Amount:</span>
                <span className="font-semibold text-white">{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Interest Payable:</span>
                <span className="font-semibold text-amber-300">{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Payment (Principal + Interest):</span>
                <span className="font-semibold text-yellow-400">{formatINR(totalPayment)}</span>
              </div>
            </div>

            <a
              href={`https://wa.me/919448567426?text=${encodeURIComponent(
                `Hello OSHN BLRREALTOR, I calculated an EMI of ${formatINR(
                  emi
                )}/month for a loan of ${formatINR(
                  loanAmount
                )}. Please share pre-approved bank loan options and zero-brokerage properties in this budget.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded-xl font-bold text-xs sm:text-sm transition transform active:scale-95 shadow-md"
            >
              Get Bank Loan Assistance
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
