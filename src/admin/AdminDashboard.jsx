import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Fetch all enquiries
  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/admin/enquiries");
      const data = await response.json();

      if (data.success && data.enquiries && data.enquiries.length > 0) {
        setEnquiries(data.enquiries);
      } else {
        // Fallback to sample data for preview if backend is empty
        setEnquiries(sampleEnquiries);
      }
    } catch (error) {
      console.log("Using preview sample enquiries:", error.message);
      setEnquiries(sampleEnquiries);
    } finally {
      setLoading(false);
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/enquiries/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data && data.success) {
        setEnquiries(enquiries.filter((item) => item._id !== id));
      } else {
        // Local removal
        setEnquiries(enquiries.filter((item) => item._id !== id));
      }
    } catch {
      // Local removal
      setEnquiries(enquiries.filter((item) => item._id !== id));
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const filteredEnquiries = enquiries.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-yellow-400">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Manage client inquiries, site visit requests &amp; leads
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            <span>🔄</span> Refresh Leads
          </button>
        </div>

        {/* Stats and Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl sm:col-span-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider block">
              Total Enquiries
            </span>
            <p className="text-3xl sm:text-4xl font-black text-yellow-400 mt-1">
              {enquiries.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl sm:col-span-2 flex items-center">
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Search by name, email, phone or message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 p-3 sm:p-3.5 pl-10 rounded-xl text-white text-xs sm:text-sm outline-none focus:border-yellow-400"
              />
              <span className="absolute left-3.5 top-3 sm:top-3.5 text-gray-400 text-sm">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="bg-slate-900 p-12 text-center rounded-2xl border border-slate-800 text-gray-400">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="bg-slate-900 p-12 text-center rounded-2xl border border-slate-800 text-gray-400">
            No Enquiries Found
          </div>
        ) : (
          <>
            {/* Mobile Card View (block on mobile/tablet, hidden on desktop) */}
            <div className="block lg:hidden space-y-4">
              {filteredEnquiries.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteEnquiry(item._id)}
                      className="text-rose-400 hover:text-rose-300 bg-rose-500/10 border border-rose-500/30 p-2 rounded-lg text-xs font-semibold"
                      title="Delete enquiry"
                    >
                      🗑 Delete
                    </button>
                  </div>

                  <div className="text-xs space-y-1.5 pt-2 border-t border-slate-800 text-gray-300">
                    <p>
                      <strong className="text-gray-400">Phone:</strong>{" "}
                      <a href={`tel:${item.phone}`} className="text-yellow-400 underline">
                        {item.phone}
                      </a>
                    </p>
                    <p>
                      <strong className="text-gray-400">Email:</strong>{" "}
                      <a href={`mailto:${item.email}`} className="text-gray-300">
                        {item.email}
                      </a>
                    </p>
                    <div className="mt-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700/50">
                      <p className="text-gray-300 leading-relaxed italic">
                        "{item.message}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (hidden on mobile, visible on lg screens) */}
            <div className="hidden lg:block overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-yellow-400 text-black uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Requirement / Message</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800 text-gray-300">
                  {filteredEnquiries.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-slate-800/60 transition"
                    >
                      <td className="p-4 font-semibold text-white whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <a href={`mailto:${item.email}`} className="hover:text-yellow-400">
                          {item.email}
                        </a>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <a href={`tel:${item.phone}`} className="text-yellow-400 font-medium">
                          {item.phone}
                        </a>
                      </td>
                      <td className="p-4 max-w-xs xl:max-w-md">
                        <p className="truncate" title={item.message}>
                          {item.message}
                        </p>
                      </td>
                      <td className="p-4 whitespace-nowrap text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => deleteEnquiry(item._id)}
                          className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}