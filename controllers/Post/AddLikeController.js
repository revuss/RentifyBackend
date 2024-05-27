const User = require("../../models/Usermodel");
const Properties = require("../../models/Propertymodel");

const addUserLike = async (req, res) => {
  try {
    const userID = await User.findById(req.user.id);
    console.log(userID);
    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }
    const propertyId = req.params.propertyId;

    console.log(propertyId);
    const property = await Properties.findById(propertyId);
    console.log("property is ", property);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (userID.likes.includes(propertyId)) {
      return res.status(400).json({ message: "Property already liked" });
    }
    userID.likes.push(propertyId);
    await userID.save();

    res.status(200).json({ message: "Property added to likes", userID });
  } catch (error) {
    res.status(500).json({ message: "Server errorss", error });
  }
};

module.exports = addUserLike;
