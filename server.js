const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // <-- make sure this exists
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes); // <-- mount user routes here

module.exports = app;
