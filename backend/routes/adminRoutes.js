const express = require("express");
const router = express.Router();

const {
  getAllEnquiries,
  deleteEnquiry,
} = require("../controllers/adminController");

// Get all enquiries
router.get("/enquiries", getAllEnquiries);

// Delete enquiry
router.delete("/enquiries/:id", deleteEnquiry);

module.exports = router;