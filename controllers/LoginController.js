const { ComparePassword } = require("../helper/hasingpassword");
const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("No user Found with the combination");
    }

    const match = await ComparePassword(password, user.password);

    if (!match) {
      return res.status(404).send("Wrong Password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        phonenumber: user.phonenumber,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true }).json(user);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};
module.exports = loginUser;
