const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// for logging (look at the terminal after request)
app.use(morgan("dev"));

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
