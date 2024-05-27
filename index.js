const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const ConnectDB = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const PORT = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:4200", // Your frontend domain
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
//Initilize Application
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
// connect to DataBase
ConnectDB();

// Middleware

app.use("/", require("./routers/mainroute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
