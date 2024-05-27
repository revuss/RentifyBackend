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

router.use(cors({ credentials: true, origin: "http://localhost:4200" }));
router.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

router.post("/signup", SignUpUser);
router.post("/login", loginUser);
router.get("/check/author", checkAuthorize, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

router.post("/add-property", checkAuthorize, addProperty);
router.get("/allproperties", checkAuthorize, getAllProperties);
router.get("/trailProperties", getFirstFiveProperties);
router.get("/properties/:id", checkAuthorize, getPropertyById);
router.post("/users/like/:propertyId", checkAuthorize, addUserLike);
router.get("/users/myProperties", checkAuthorize, getUserProperties);

module.exports = router;
