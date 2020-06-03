const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// for logging (look at the terminal after request)
app.use(morgan("dev"));

// For body parser for req body
app.use(bodyParser.urlencoded({ extended: false }));
// "extended: false" for simple urlencoded
app.use(bodyParser.json());
// json request

// For enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUST, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

// Routes (Middleware) wich should handle request
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Its executed if above was not executed
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Catch Error from above or another source on this application
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
