const User = require("../models/Usermodel");

const getUserProperties = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("myProperties");

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const myProperties = user.myProperties;
    // console.log(myProperties);
    res.status(200).json({ myProperties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = getUserProperties;
