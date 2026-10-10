const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Property", propertySchema);
