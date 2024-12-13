const express = require("express");
const {
  getProducts,
  createProduct,
  getOne,
} = require("../controllers/product.controller");

const router = express.Router();

// Routes
router.get("/", getProducts);
router.get("/:id", getOne);
router.post("/create", createProduct);

module.exports = router;
