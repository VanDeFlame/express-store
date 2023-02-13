const express = require("express");
const products = require("../database/products.database");

const router = express.Router();

/* CATEGORIES */
router.get("/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  const product = products[productId];

  res.json({
    categoryId,
    productId,
    ...product
  });
});

module.exports = router;
