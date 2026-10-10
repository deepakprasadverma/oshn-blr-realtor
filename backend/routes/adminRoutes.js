const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getAllEnquiries,
  deleteEnquiry,
} = require("../controllers/adminController");
const { protectAdmin } = require("../middleware/authMiddleware");

// Public: Admin Login
router.post("/login", adminLogin);

// Protected: Get all enquiries
router.get("/enquiries", protectAdmin, getAllEnquiries);

// Protected: Delete enquiry
router.delete("/enquiries/:id", protectAdmin, deleteEnquiry);

module.exports = router;