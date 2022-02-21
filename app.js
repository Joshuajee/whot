/**
 * @author Joshua Emmanuel Evuetapha
 * @copyright (C) 2021 Joshua Evuetapha
 * @twitter  evuetaphajoshua
 * @github   Joshuajee
 * @license MIT This program is distributed under the MIT license
 */

const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const path = require('path');
const apiRoutes = require("./routes/apiRoutes");

// Start express app
const app = express();

app.enable("trust proxy");

app.use(cors());
app.options("*", cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100000,
  message: "Too many requests from this IP, please try again in an hour!"
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true, limit: "1000kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price"
    ]
  })
);

app.use(compression());


//3) ROUTES
app.use("/api/v1/", apiRoutes);


//serve static asset
app.use(express.static(path.join(__dirname, 'game_ui/build')));

//handle any route that is missing from the Server
app.get('/', (req, res) =>{  
  res.sendFile(path.resolve(__dirname, "game_ui", "build", "index.html"))
  console.log(path.resolve(__dirname, "game_ui", "build", "index.html"))
})

app.get('/*', (req, res) =>{  
  res.sendFile(path.resolve(__dirname, "game_ui", "build", "index.html"))
  console.log(path.resolve(__dirname, "game_ui", "build", "index.html"))
})



 //app.use(globalErrorHandler);

// app.use((err, req, res, next) => res.send(err) )
 
module.exports = app;
 