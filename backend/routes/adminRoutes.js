const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getAllEnquiries,
  deleteEnquiry,
  purgeAllEnquiries,
  getSystemStats,
} = require("../controllers/adminController");
const { protectAdmin, protectSuperAdmin } = require("../middleware/authMiddleware");

// Public: Admin & Super Admin Login
router.post("/login", adminLogin);

// Protected: Get all enquiries (Admin & Super Admin)
router.get("/enquiries", protectAdmin, getAllEnquiries);

// Protected: Delete single enquiry (Admin & Super Admin)
router.delete("/enquiries/:id", protectAdmin, deleteEnquiry);

// Super Admin Only: Purge all enquiries
router.delete("/purge-all", protectSuperAdmin, purgeAllEnquiries);

// Super Admin Only: System stats
router.get("/system-stats", protectSuperAdmin, getSystemStats);

module.exports = router;