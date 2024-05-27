const Properties = require("../../models/Propertymodel");
const User = require("../../models/Usermodel");

const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.id;

    // Remove the property from the Properties collection
    const property = await Properties.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.createdBy.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this property" });
    }

    await Properties.findByIdAndDelete(propertyId);

    await User.findByIdAndUpdate(userId, {
      $pull: { myProperties: propertyId },
    });
    // Remove the property reference from the user's myProperties array
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = deleteProperty;
