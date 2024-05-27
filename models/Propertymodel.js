const mongoose = require("mongoose");
const { Schema } = mongoose;

const propertySchema = new Schema({
  propertyId: {
    type: String,
    required: true,
    unique: true,
  },
  propertyArea: {
    type: String,
    required: true,
  },
  propertyDescription: {
    type: String,
    required: true,
  },
  propertyBedrooms: {
    type: Number,
    required: true,
  },
  propertyBathrooms: { type: Number, required: true },
  hospitalsNearby: { type: String, required: true },
  collegesNearby: { type: String, required: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Properties = mongoose.model("Properties", propertySchema);
module.exports = Properties;
