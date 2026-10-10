import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Oshn_logo.png";
import { API_ENDPOINTS } from "../config/api";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [systemStats, setSystemStats] = useState(null);
  const navigate = useNavigate();

  // Check login authentication
  const token = localStorage.getItem("oshn_admin_token");
  const storedUser = localStorage.getItem("oshn_admin_user");
  const adminUser = storedUser ? JSON.parse(storedUser) : null;
  const isSuperAdmin = adminUser?.role === "superadmin";

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("oshn_admin_token");
    localStorage.removeItem("oshn_admin_user");
    navigate("/admin/login");
  };

  // Sample fallback data if backend is offline or DB empty
  const sampleEnquiries = [
    {
      _id: "demo-1",
      name: "Rajesh Kumar",
      email: "rajesh.k@gmail.com",
      phone: "+91 98450 12345",
      message: "Looking for 3 BHK apartment in Whitefield near ITPL. Budget around 1.2 Cr.",
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    {
      _id: "demo-2",
      name: "Sneha Reddy",
      email: "sneha.reddy@outlook.com",
      phone: "+91 97401 98765",
      message: "Interested in Prestige Golfshire Villa site visit this Saturday morning.",
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      _id: "demo-3",
      name: "Vikram Malhotra",
      email: "vikram.m@techcorp.com",
      phone: "+91 99001 54321",
      message: "Want to book 2400 sq.ft plot in Devanahalli for immediate investment.",
      createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    },
  ];

  // Fetch all enquiries with auth token header
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_ENQUIRIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      const data = await response.json();

      if (data.success && data.enquiries && data.enquiries.length > 0) {
        setEnquiries(data.enquiries);
      } else {
        setEnquiries(sampleEnquiries);
      }
    } catch (error) {
      console.log("Using preview sample enquiries:", error.message);
      setEnquiries(sampleEnquiries);
    } finally {
      setLoading(false);
    }
  };

  // Fetch system stats for super admin
  const fetchSystemStats = async () => {
    if (!isSuperAdmin) return;
    try {
      const response = await fetch(API_ENDPOINTS.ADMIN_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setSystemStats(data.stats);
      }
    } catch {
      setSystemStats({
        serverUptime: "Active",
        nodeVersion: "v20.x",
        memoryUsageMb: "48.2",
        developedBy: "Syntrixad",
        dbStatus: "Fallback Offline Mode",
      });
    }
  };

  // Delete single enquiry with auth token
  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmDelete) return;

    try {
      await fetch(`${API_ENDPOINTS.ADMIN_ENQUIRIES}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries(enquiries.filter((item) => item._id !== id));
    } catch {
      setEnquiries(enquiries.filter((item) => item._id !== id));
    }
  };

  // Super Admin: Purge All Leads
  const purgeAllLeads = async () => {
    if (!isSuperAdmin) return;
    const confirmPurge = window.confirm(
      "⚠️ WARNING (SUPER ADMIN ONLY):\nAre you sure you want to delete ALL inquiries? This action cannot be undone."
    );
    if (!confirmPurge) return;

    try {
      await fetch(API_ENDPOINTS.ADMIN_PURGE, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnquiries([]);
    } catch {
      setEnquiries([]);
    }
  };

  // Super Admin: Export Leads to CSV (Excel)
  const exportToCSV = () => {
    if (enquiries.length === 0) {
      alert("No inquiries available to export.");
      return;
    }

    const headers = ["ID", "Name", "Phone", "Email", "Message", "Date"];
    const rows = enquiries.map((e) => [
      `"${e._id}"`,
      `"${e.name || ""}"`,
      `"${e.phone || ""}"`,
      `"${e.email || ""}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString("en-IN")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `oshn_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (token) {
      fetchEnquiries();
      fetchSystemStats();
    }
  }, [token]);

  // Filter inquiries
  const filteredEnquiries = enquiries.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone?.includes(searchTerm) ||
      item.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Link to="/" title="View Public Website">
              <img src={logo} alt="OSHN Logo" className="h-10 w-auto hover:opacity-80 transition" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
                  Admin Dashboard
                </h1>
                {isSuperAdmin ? (
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                    👑 Super Admin
                  </span>
                ) : (
                  <span className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    🛡️ Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage client inquiries, site visit requests &amp; leads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block bg-slate-900 border border-slate-800 text-xs px-3 py-1.5 rounded-xl text-gray-300">
              👤 {adminUser?.email || "admin@oshnblr.com"}
            </span>
            <Link
              to="/"
              className="bg-slate-900 hover:bg-slate-800 text-gray-300 px-3.5 py-2 rounded-xl text-xs font-bold transition border border-slate-800"
            >
              Public Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow cursor-pointer active:scale-95"
            >
              Log Out ⎋
            </button>
          </div>
        </div>

        {/* Super Admin Special Master Controls */}
        {isSuperAdmin && (
          <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-slate-900 border border-amber-400/30 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-extrabold text-yellow-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>👑</span> Syntrixad Super Admin Command Center
                </span>
                <p className="text-xs text-gray-300 mt-1">
                  Master privileges active: Full lead management, CSV export, and database control.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={exportToCSV}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow"
                >
                  <span>📥</span> Export to CSV (Excel)
                </button>
                <button
                  type="button"
                  onClick={purgeAllLeads}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow"
                >
                  <span>🗑️</span> Purge All Leads
                </button>
              </div>
            </div>

            {systemStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-amber-400/20 text-[11px] text-gray-400">
                <div>
                  Uptime: <strong className="text-white">{systemStats.serverUptime}</strong>
                </div>
                <div>
                  Engine: <strong className="text-white">{systemStats.developedBy || "Syntrixad"}</strong>
                </div>
                <div>
                  RAM: <strong className="text-white">{systemStats.memoryUsageMb} MB</strong>
                </div>
                <div>
                  Status: <strong className="text-emerald-400">{systemStats.dbStatus}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stats and Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Inquiries</span>
            <p className="text-3xl font-black text-yellow-400 mt-1">{enquiries.length}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Filtered Results</span>
            <p className="text-3xl font-black text-white mt-1">{filteredEnquiries.length}</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Quick Action</span>
            <button
              onClick={fetchEnquiries}
              className="mt-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-xl text-xs transition"
            >
              🔄 Refresh Leads
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search inquiries by name, email, phone or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition"
          />
        </div>

        {/* Inquiries List */}
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm">
            <span className="inline-block animate-spin text-2xl mb-2">⏳</span>
            <p>Loading inquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 text-gray-400">
            <p className="text-lg font-bold text-white mb-1">No inquiries found</p>
            <p className="text-xs">No client requests match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEnquiries.map((enquiry) => (
              <div
                key={enquiry._id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div>
                      <h2 className="text-base font-bold text-white">{enquiry.name}</h2>
                      <span className="text-[11px] text-gray-400">
                        {new Date(enquiry.createdAt).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteEnquiry(enquiry._id)}
                      className="text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2.5 py-1 rounded-lg border border-rose-500/30 transition cursor-pointer"
                      title="Delete inquiry"
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-300 mb-4">
                    <p className="flex items-center gap-2">
                      <span className="text-gray-500">📞 Phone:</span>
                      <a href={`tel:${enquiry.phone}`} className="text-yellow-400 hover:underline font-mono">
                        {enquiry.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-gray-500">✉️ Email:</span>
                      <a href={`mailto:${enquiry.email}`} className="text-gray-300 hover:underline">
                        {enquiry.email}
                      </a>
                    </p>
                  </div>

                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs text-gray-300 italic leading-relaxed">
                    "{enquiry.message}"
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <a
                    href={`https://wa.me/${enquiry.phone?.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    💬 WhatsApp Client
                  </a>
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="text-yellow-400 hover:text-yellow-300 font-bold"
                  >
                    Direct Call ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Syntrixad Branding Footer */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-center text-xs text-gray-500">
          Designed &amp; Developed By{" "}
          <span className="text-yellow-400 font-bold">Syntrixad</span>
        </div>
      </div>
    </div>
  );
}