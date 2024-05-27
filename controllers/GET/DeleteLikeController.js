const Properties = require("../../models/Propertymodel");
const User = require("../../models/Usermodel");

const deletePropertyLike = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const userId = req.user.id;

    // Remove the property from the Properties collection
    const property = await Properties.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Removed from likes" });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { likes: propertyId },
    });
    // Remove the property reference from the user's myProperties array
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = deletePropertyLike;
