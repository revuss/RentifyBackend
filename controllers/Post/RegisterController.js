const User = require("../../models/Usermodel");
const { HashPassword } = require("../../helper/hasingpassword");

const SignUpUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      phonenumber,
      password,
      email,
      confirmPassword,
    } = req.body;

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !firstname ||
      !lastname ||
      !phonenumber
    ) {
      return res.status(400).send("All fields are required");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    if (password.length < 8) {
      return res
        .status(400)
        .send("Password length should be at least 8 letters long");
    }

    const existingUser = await User.findOne({
      $or: [{ email: email }, { phonenumber: phonenumber }],
    });

    if (existingUser) {
      return res
        .status(400)
        .send("User with this email or phone number already exists");
    }

    const hashedPassword = await HashPassword(password);

    const user = new User({
      firstname,
      lastname,
      phonenumber,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: "Account Created" });
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(404).send("Internal Server Error");
  }
};

module.exports = SignUpUser;
