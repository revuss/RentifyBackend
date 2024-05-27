const jwt = require("jsonwebtoken");

const checkAuthorize = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = checkAuthorize;
