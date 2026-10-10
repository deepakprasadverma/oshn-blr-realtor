const Property = require("../models/Property");

// Add Property
const addProperty = async (req, res) => {
  try {
    const { title, type, price, location, description, image } = req.body;

    if (!title || !type || !price || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const property = await Property.create({
      title,
      type,
      price,
      location,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Property Added Successfully",
      property,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get All Properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addProperty,
  getProperties,
};