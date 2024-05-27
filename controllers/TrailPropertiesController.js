const Properties = require("../models/Propertymodel");

const getFirstFiveProperties = async (req, res) => {
  try {
    const properties = await Properties.find().limit(5).exec();

    res.status(200).json({ properties });
  } catch (error) {
    // console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getFirstFiveProperties;
