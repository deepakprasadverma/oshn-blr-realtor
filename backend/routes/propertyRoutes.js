const express = require("express");
const router = express.Router();

const {
  addProperty,
  getProperties,
} = require("../controllers/propertyController");

// Add Property
router.post("/", addProperty);

// Get All Properties
router.get("/", getProperties);

module.exports = router;