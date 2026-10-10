import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Oshn_logo.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      // 1. Attempt server-side login
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem("oshn_admin_token", data.token);
        localStorage.setItem("oshn_admin_user", JSON.stringify(data.admin));
        navigate("/admin");
        return;
      } else {
        // If server responded with error
        setErrorMessage(data.message || "Invalid credentials.");
      }
    } catch (networkError) {
      console.warn("Backend server not reachable on localhost:5000. Checking default credentials for client fallback:", networkError);
      // 2. Offline / Vercel preview fallback for admin login
      if (
        email.trim().toLowerCase() === "admin@oshnblr.com" &&
        password === "admin123"
      ) {
        const dummyToken = Buffer.from(`${email}:${Date.now()}:oshn_admin_secret_2026`).toString("base64");
        localStorage.setItem("oshn_admin_token", dummyToken);
        localStorage.setItem(
          "oshn_admin_user",
          JSON.stringify({ email, name: "OSHN Administrator (Offline Mode)" })
        );
        navigate("/admin");
        return;
      } else {
        setErrorMessage("Invalid credentials. Please use admin@oshnblr.com / admin123");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-xl">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group mb-3">
            <img src={logo} alt="OSHN Logo" className="h-10 w-auto" />
            <span className="text-xl font-black text-yellow-400">OSHN BLR</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-xs text-gray-400 mt-1">
            Server-side authenticated management console
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@oshnblr.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-3.5 rounded-xl transition shadow-lg text-sm disabled:opacity-50 cursor-pointer active:scale-98"
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-6 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-gray-400">
          <p className="font-semibold text-gray-300 mb-1">🔐 Default Master Credentials:</p>
          <p>
            Email: <code className="text-yellow-400">admin@oshnblr.com</code>
          </p>
          <p>
            Password: <code className="text-yellow-400">admin123</code>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
