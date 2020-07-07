const express = require("express");
const router = express.Router();
const multer = require("multer"); // plugin for form parser
const chechAuth = require("../middleware/check-auth"); // middleware

const ProductsController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // destination folder to save image
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname); // set saved image filename
  },
});

const fileFilter = (req, file, cb) => {
  // reject file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); // accept upload file
  } else {
    cb(null, false); // reject upload file
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 55, // 5megabyte
  },
  fileFilter: fileFilter,
});

// use "/" because "/products" is already declared in app.js
router.get("/", ProductsController.products_get_all);

router.get("/:productId", ProductsController.products_get_product);

router.post(
  "/",
  chechAuth,
  upload.single("productImage"),
  ProductsController.products_create_product
);

router.patch(
  "/:productId",
  chechAuth,
  ProductsController.products_update_product
);

router.delete("/:productId", chechAuth, ProductsController.products_delete);

module.exports = router;
