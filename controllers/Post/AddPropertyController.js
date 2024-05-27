const Properties = require("../../models/Propertymodel");
const User = require("../../models/Usermodel");

const addProperty = async (req, res) => {
  try {
    const {
      propertyId,
      propertyArea,
      propertyDescription,
      propertyBedrooms,
      propertyBathrooms,
      hospitalsNearby,
      collegesNearby,
    } = req.body;
    if (
      !propertyId ||
      !propertyArea ||
      !propertyDescription ||
      !propertyBedrooms ||
      !propertyBathrooms ||
      !hospitalsNearby ||
      !collegesNearby
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newProperty = new Properties({
      propertyId,
      propertyArea,
      propertyDescription,
      propertyBedrooms,
      propertyBathrooms,
      hospitalsNearby,
      collegesNearby,
      createdBy: user._id,
    });

    const savedProperty = await newProperty.save();
    user.myProperties.push(savedProperty.id);
    await user.save();
    res.status(201).json({
      message: "Property added successfully",
      property: savedProperty,
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = addProperty;
