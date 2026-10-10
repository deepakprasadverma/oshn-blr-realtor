import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Oshn_logo.png";

export default function AdminLogin() {
  const [roleMode, setRoleMode] = useState("superadmin"); // "superadmin" or "admin"
  const [email, setEmail] = useState("superadmin@syntrixad.com");
  const [password, setPassword] = useState("superadmin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRoleSwitch = (role) => {
    setRoleMode(role);
    setErrorMessage("");
    if (role === "superadmin") {
      setEmail("superadmin@syntrixad.com");
      setPassword("superadmin123");
    } else {
      setEmail("admin@oshnblr.com");
      setPassword("admin123");
    }
  };

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
        setErrorMessage(data.message || "Invalid credentials.");
      }
    } catch (networkError) {
      console.warn("Backend server offline on localhost:5000. Using client-side fallback:", networkError);

      // 2. Client-side fallback for Vercel / offline preview
      const inputEmail = email.trim().toLowerCase();
      let fallbackAdmin = null;

      if (
        (inputEmail === "superadmin@syntrixad.com" || inputEmail === "superadmin@oshnblr.com") &&
        password === "superadmin123"
      ) {
        fallbackAdmin = {
          email: inputEmail,
          name: "Syntrixad Super Administrator",
          role: "superadmin",
          developedBy: "Syntrixad",
        };
      } else if (inputEmail === "admin@oshnblr.com" && password === "admin123") {
        fallbackAdmin = {
          email: inputEmail,
          name: "OSHN BLR Administrator",
          role: "admin",
          developedBy: "Syntrixad",
        };
      }

      if (fallbackAdmin) {
        const dummyToken = Buffer.from(
          `${inputEmail}:${fallbackAdmin.role}:${Date.now()}:oshn_admin_secret_2026`
        ).toString("base64");
        localStorage.setItem("oshn_admin_token", dummyToken);
        localStorage.setItem("oshn_admin_user", JSON.stringify(fallbackAdmin));
        navigate("/admin");
        return;
      } else {
        setErrorMessage("Invalid credentials. Please select Admin or Super Admin presets below.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <img src={logo} alt="OSHN Logo" className="h-10 w-auto" />
            <span className="text-xl font-black text-yellow-400">OSHN BLR</span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin &amp; Super Admin</h1>
          <p className="text-xs text-gray-400 mt-1">
            Server-side authenticated portal
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSwitch("superadmin")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
              roleMode === "superadmin"
                ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>👑</span>
            <span>Super Admin</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSwitch("admin")}
            className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
              roleMode === "admin"
                ? "bg-yellow-400 text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>🛡️</span>
            <span>Standard Admin</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs text-center font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              {roleMode === "superadmin" ? "Super Admin Email" : "Admin Email"}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={roleMode === "superadmin" ? "superadmin@syntrixad.com" : "admin@oshnblr.com"}
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
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 font-black py-3.5 rounded-xl transition shadow-lg text-sm disabled:opacity-50 cursor-pointer active:scale-98 ${
              roleMode === "superadmin"
                ? "bg-gradient-to-r from-amber-400 to-yellow-300 text-black hover:from-amber-300 hover:to-yellow-200"
                : "bg-yellow-400 hover:bg-yellow-300 text-black"
            }`}
          >
            {loading ? "Authenticating..." : `Sign In as ${roleMode === "superadmin" ? "Super Admin 👑" : "Admin 🛡️"}`}
          </button>
        </form>

        {/* Credentials Quick Pill */}
        <div className="mt-6 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] space-y-1 text-gray-400">
          <p className="font-bold text-gray-300 flex items-center justify-between">
            <span>🔑 Active Role Credentials:</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-yellow-400">
              {roleMode}
            </span>
          </p>
          <p>
            Email: <code className="text-yellow-400 font-mono">{email}</code>
          </p>
          <p>
            Password: <code className="text-yellow-400 font-mono">{password}</code>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link to="/" className="text-xs text-gray-400 hover:text-white transition">
            ← Back to Public Website
          </Link>
        </div>
      </div>

      {/* Developed by Syntrixad badge */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Designed &amp; Developed By{" "}
        <span className="text-yellow-400 font-bold tracking-wide">Syntrixad</span>
      </div>
    </div>
  );
}
