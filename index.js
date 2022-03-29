const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Body Parser Config (get the info body of requests)
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// DB Connection

// Routes import
const authRoutes = require("./routes/auth.js");

// Middleware route
app.get("/", (request, result) => {
  result.json({
    status: true,
    message: "lets get it",
  });
});

app.get("api/user", authRoutes);

// Start server
const port = process.env.port || "3000";

app.listen(port, () => {
  console.log("Server on http://localhost:" + port + "/");
});
