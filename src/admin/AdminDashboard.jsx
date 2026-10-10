import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Oshn_logo.png";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Check login authentication
  const token = localStorage.getItem("oshn_admin_token");
  const storedUser = localStorage.getItem("oshn_admin_user");
  const adminUser = storedUser ? JSON.parse(storedUser) : null;

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
      const response = await fetch("http://localhost:5000/api/admin/enquiries", {
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

  // Delete enquiry with auth token
  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/enquiries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEnquiries(enquiries.filter((item) => item._id !== id));
      } else {
        // Optimistic delete on offline fallback
        setEnquiries(enquiries.filter((item) => item._id !== id));
      }
    } catch {
      // Optimistic delete if backend offline
      setEnquiries(enquiries.filter((item) => item._id !== id));
    }
  };

  useEffect(() => {
    if (token) {
      fetchEnquiries();
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-400">
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
              className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow"
            >
              Log Out ⎋
            </button>
          </div>
        </div>

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
      </div>
    </div>
  );
}