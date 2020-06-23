const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/products");

// use "/" because "/products" is already declared in app.js
router.get("/", (req, res, next) => {
  // dummy code
  // res.status(201).json({
  //   messages: "handling GET request in /products",
  // });

  // Bellow is query database for mongoose
  Product.find() // find all dabase data
    .exec()
    .then((docs) => {
      console.log("ini seluruh data dar database: " + docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  // Bellow is just dummy code, use after commented code
  // if (id === "special") {
  //   res.status(200).json({
  //     message: "Ini special ID broh",
  //     id: id,
  //   });
  // } else {
  //   res.status(200).json({
  //     message: "normal ID",
  //   });
  // }
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("iki soko database: " + doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry brooo!, nilaine ke => " + doc });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        messages: "handling POST request in /products",
        createdProduct: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
});

router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "UPDATED products with id " + id,
  });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "DELETED products with id " + id,
  });
});

module.exports = router;
