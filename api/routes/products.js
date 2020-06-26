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
    .select("name price")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:14045/products/" + doc._id,
            },
          };
        }),
      };
      // if (docs.length > 0) {
      res.status(200).json(response);
      // } else {
      //   res.status(404).json({
      //     message: "No entries found broo",
      //   });
      // }
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
    .select("name price _id")
    .exec()
    .then((doc) => {
      console.log("iki soko database: " + doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:14045/products/" + doc._id,
          },
        });
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
        messages: "Created products successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:14045/products/" + result._id,
          },
        },
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
  // res.status(200).json({
  //   message: "UPDATED products with id " + id,
  // });
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:14045/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:14045/products/",
          body: {
            name: "String",
            price: "Number",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
