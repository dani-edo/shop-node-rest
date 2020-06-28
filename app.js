const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

// connect with mongodd database
mongoose.connect(
  // "mongodb+srv://dani_edo:" +
  //   process.env.MONGO_ATLAS_PW +
  //   "@node-shop-api-cluster-2nreu.mongodb.net/test?retryWrites=true&w=majority",
  // upper this is wrong! use code below instead
  "mongodb://dani_edo:" +
    process.env.MONGO_ATLAS_PW +
    "@node-shop-api-cluster-shard-00-00-2nreu.mongodb.net:27017,node-shop-api-cluster-shard-00-01-2nreu.mongodb.net:27017,node-shop-api-cluster-shard-00-02-2nreu.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-api-cluster-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    //   useMongoClient: true
    // up this is depreciated, use below instead (not in tutorial, but in terminal)
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// hide depreciated notification in terminal
mongoose.Promise = global.Promise;

// for logging (look at the terminal after request)
app.use(morgan("dev"));

// make uploads folder available for public
app.use("/uploads", express.static("uploads"));

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
app.use("/user", userRoutes);

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
