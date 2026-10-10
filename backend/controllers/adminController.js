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

// Admin Login (Server-Side Verification)
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const expectedEmail = process.env.ADMIN_EMAIL || "admin@oshnblr.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (
      email.trim().toLowerCase() !== expectedEmail.toLowerCase() ||
      password !== expectedPassword
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin email or password.",
      });
    }

    const secretKey = process.env.JWT_SECRET || "oshn_admin_secret_2026";
    const token = Buffer.from(`${email}:${Date.now()}:${secretKey}`).toString("base64");

    return res.status(200).json({
      success: true,
      message: "Admin authentication successful",
      token,
      admin: {
        email: expectedEmail,
        name: "OSHN BLR Administrator",
        role: "superadmin",
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

// Delete enquiry (Protected)
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

module.exports = {
  adminLogin,
  getAllEnquiries,
  deleteEnquiry,
};