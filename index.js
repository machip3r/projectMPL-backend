const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/auth.js");
const dashboardRoutes = require("./routes/dashboard.js");
const tokenValidation = require("./routes/tokenValidation.js");

const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

const port = process.env.PORT || "3000";

dotenv.config();

// DB Connection
/* const uri =
  "mongodb+srv://" +
  process.env.USER +
  ":" +
  process.env.PASSWORD +
  "@cluster0.dfv7t.mongodb.net/" +
  process.env.DBNAME +
  "?retryWrites=true&w=majority"; */
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.dfv7t.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
// const options = {userNewUrlParser: true, userUnifiedTopology: true};

mongoose
  /* .connect(uri, options) */
  .connect(uri)
  .then(() => console.log("DB Connected!"))
  .catch((error) => console.log("Error: " + error));

// Body Parser Config (get the info body of requests)
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(cors(corsOptions));

// Middleware route
app.get("/", (request, result) =>
  result.json({
    status: true,
    message: "lets get it",
  })
);

// Routes import
app.use("/api/user", authRoutes);
app.use("/api/dashboard", tokenValidation, dashboardRoutes);

// Start server
app.listen(port, () =>
  console.log(
    "Server on http://localhost:" +
      port +
      "/ or https://projectmpl-backend.herokuapp.com:" +
      port +
      "/"
  )
);
