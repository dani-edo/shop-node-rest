const express = require("express");
const router = express.Router();

// use "/" because "/products" is already declared in app.js
router.get("/", (req, res, next) => {
  res.status(200).json({
    messages: "handling GET request in /products",
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "Ini special ID broh",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "normal ID",
    });
  }
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    messages: "handling POST request in /products",
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
