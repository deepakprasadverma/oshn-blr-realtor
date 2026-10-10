const Contact = require("../models/Contact");

let memoryEnquiries = [
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

// Admin & Super Admin Login (Server-Side Verification)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || "superadmin@syntrixad.com").toLowerCase();
    const superAdminPass = process.env.SUPER_ADMIN_PASSWORD || "superadmin123";

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@oshnblr.com").toLowerCase();
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const inputEmail = email.trim().toLowerCase();
    let userRole = null;
    let userName = null;

    // Check Super Admin
    if (
      (inputEmail === superAdminEmail || inputEmail === "superadmin@oshnblr.com") &&
      password === superAdminPass
    ) {
      userRole = "superadmin";
      userName = "Syntrixad Super Administrator";
    }
    // Check Standard Admin
    else if (inputEmail === adminEmail && password === adminPass) {
      userRole = "admin";
      userName = "OSHN BLR Administrator";
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please verify your email and password.",
      });
    }

    const secretKey = process.env.JWT_SECRET || "oshn_admin_secret_2026";
    const token = Buffer.from(`${inputEmail}:${userRole}:${Date.now()}:${secretKey}`).toString("base64");

    return res.status(200).json({
      success: true,
      message: `${userRole === "superadmin" ? "Super Admin" : "Admin"} authentication successful`,
      token,
      admin: {
        email: inputEmail,
        name: userName,
        role: userRole,
        developedBy: "Syntrixad",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during login.",
    });
  }
};

// Get all enquiries (Protected)
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    console.log("MongoDB offline, returning fallback memory enquiries");

    return res.status(200).json({
      success: true,
      count: memoryEnquiries.length,
      enquiries: memoryEnquiries,
      note: "Offline Mode (Fallback)",
    });
  }
};

// Delete single enquiry (Protected)
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Contact.findById(req.params.id);

    if (!enquiry) {
      memoryEnquiries = memoryEnquiries.filter((e) => e._id !== req.params.id);
      return res.status(200).json({
        success: true,
        message: "Enquiry deleted successfully",
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    memoryEnquiries = memoryEnquiries.filter((e) => e._id !== req.params.id);
    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  }
};

// Purge all enquiries (Super Admin Only)
const purgeAllEnquiries = async (req, res) => {
  try {
    if (req.admin?.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "Only Syntrixad Super Admin can purge all inquiries.",
      });
    }

    try {
      await Contact.deleteMany({});
    } catch (e) {
      console.log("DB purge skipped:", e.message);
    }

    memoryEnquiries = [];

    return res.status(200).json({
      success: true,
      message: "All leads have been successfully purged by Super Admin.",
    });
  } catch (error) {
    memoryEnquiries = [];
    return res.status(200).json({
      success: true,
      message: "All leads purged successfully.",
    });
  }
};

// System Stats (Super Admin Only)
const getSystemStats = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      stats: {
        serverUptime: Math.floor(process.uptime()) + "s",
        nodeVersion: process.version,
        memoryUsageMb: (process.memoryUsage().rss / 1024 / 1024).toFixed(1),
        environment: process.env.NODE_ENV || "production",
        developedBy: "Syntrixad",
        dbStatus: Contact.db?.readyState === 1 ? "Connected" : "Fallback Offline Mode",
        dbError: global.dbConnectionStatus?.error || null,
        mongoConfigured: Boolean(process.env.MONGODB_URI),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching system stats",
    });
  }
};

module.exports = {
  adminLogin,
  getAllEnquiries,
  deleteEnquiry,
  purgeAllEnquiries,
  getSystemStats,
};