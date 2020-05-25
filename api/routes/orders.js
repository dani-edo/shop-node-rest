const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Order where fetched",
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order detail " + req.params.orderId,
    id: req.params.orderId,
  });
});

router.post("/", (req, res, next) => {
  res.status(201).json({
    message: "Order was created",
  });
});

router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
    id: req.params.orderId,
  });
});

module.exports = router;
