const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Username Required"],
  },
  lastname: {
    type: String,
    required: [true, "Username Required"],
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Email NOT VALID"],
  },
  phonenumber: {
    type: Number,
    required: [true, "phone number required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  myProperties: [
    {
      type: Schema.Types.ObjectId,
      ref: "Properties",
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Properties",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
