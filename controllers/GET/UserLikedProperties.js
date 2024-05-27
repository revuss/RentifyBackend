const User = require("../../models/Usermodel");

const LikedUserProperties = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("likes");

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedproperties = user.likes;
    console.log(likedproperties);
    res.status(200).json({ likedproperties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = LikedUserProperties;
