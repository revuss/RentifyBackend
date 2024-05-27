const Properties = require("../models/Propertymodel");

const getAllProperties = async (req, res) => {
  try {
    const properties = await Properties.find().exec();
    res.status(200).json({ properties });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllProperties;
