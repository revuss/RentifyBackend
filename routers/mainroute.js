const express = require("express");
const router = express.Router();
const cors = require("cors");
const checkAuthorize = require("../middlewares/CheckLogin");
const addProperty = require("../controllers/Post/AddPropertyController");
const getAllProperties = require("../controllers/GetProperties");
const loginUser = require("../controllers/LoginController");
const SignUpUser = require("../controllers/Post/RegisterController");
const getFirstFiveProperties = require("../controllers/TrailPropertiesController");
const getPropertyById = require("../controllers/SinglePropertyController");
const addUserLike = require("../controllers/Post/AddLikeController");
const getUserProperties = require("../controllers/UserMyPropertiesController");
const deleteProperty = require("../controllers/GET/DeleteController");
const LikedUserProperties = require("../controllers/GET/UserLikedProperties");
const deletePropertyLike = require("../controllers/GET/DeleteLikeController");

router.use(
  cors({
    credentials: true,
    origin: ["https://rentify-vfod.vercel.app"],
  })
);
router.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
}); // worked

router.post("/signup", SignUpUser); //worked
router.post("/login", loginUser); //worked
router.get("/check/author", checkAuthorize, (req, res) => {
  res.json({ authenticated: true, user: req.user });
}); // worked

router.post("/add-property", checkAuthorize, addProperty); // worked
router.get("/allproperties", checkAuthorize, getAllProperties); // worked
router.get("/trailProperties", getFirstFiveProperties); // worked
router.get("/properties/:id", checkAuthorize, getPropertyById); // worked
router.post("/users/like/:propertyId", checkAuthorize, addUserLike); // worked
router.get("/users/myProperties", checkAuthorize, getUserProperties); //worked
router.get("/users/likedproperties", checkAuthorize, LikedUserProperties); //worked
router.delete("/properties/:id", checkAuthorize, deleteProperty); //worked
router.delete("/properties/likes/:id", checkAuthorize, deletePropertyLike); //worked

module.exports = router;
