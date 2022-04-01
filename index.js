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
const uri =
  "mongodb+srv://" +
  process.env.USER +
  ":" +
  process.env.PASSWORD +
  "@cluster0.dfv7t.mongodb.net/" +
  process.env.DBNAME +
  "?retryWrites=true&w=majority";
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dfv7t.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
// const options = {userNewUrlParser: true, userUnifiedTopology: true};

mongoose
  /* .connect(uri, options) */
  .connect(uri)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("Error: + " + error));

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
