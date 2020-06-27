const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // this is from other declarated schema that connected to this schema
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Order", orderSchema);
