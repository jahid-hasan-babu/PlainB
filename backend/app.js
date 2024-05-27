const express = require("express");

const app = express();
const router = require("./src/routes/api");
const path = require("path");
require("dotenv").config();

const URL =
  "mongodb+srv://jahidhasan:jahid246578@cluster0.u5gekv5.mongodb.net/MERN_ECOMMERZ";

const cookieParser = require("cookie-parser");

//security middleware
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitizer = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");

//Database
const mongoose = require("mongoose");

//Security middleware implement

app.use(
  cors({
    origin: ["https://plain-b-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // If you're using cookies or sessions
  })
);

app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitizer());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Rata limiter
const limiter = rateLimit({
  windowMs: 24 * 60 * 1000,
  max: 1000,
});

app.use(limiter);

//Database connection
mongoose
  .connect(URL)
  .then((res) => {
    console.log("Database Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//api call
app.use("/api/v1", router);

//Front end Tagging

app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "not found" });
});

module.exports = app;
