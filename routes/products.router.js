const express = require('express');
const ProductsService = require('../services/products.service');

const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schema');

const router = express.Router();
const productsService = new ProductsService();

/* PRODUCTS */
router.get("/", async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const products = await productsService.find(limit, offset);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  validatorHandler(getProductSchema, 'params');

  try {
    const { productId } = req.params;
    const product = await productsService.findOne(productId);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  validatorHandler(createProductSchema, 'body');

  try {
    const product = await productsService.create(req.body);
    res.status(201).json({
      message: 'Created',
      data: product
    })
  } catch (err) {
    next(err);
  }
})

router.patch('/:productId', async (req, res, next) => {
  validatorHandler(getProductSchema, 'params');
  validatorHandler(updateProductSchema, 'body');

  try {
    const { productId } = req.params;
    const product = await productsService.update(productId, req.body)
    res.status(200).json({
      message: 'Updated',
      data: product
    })
  } catch (err) {
    next(err);
  }
})

router.delete('/:productId', async (req, res, next) => {
  validatorHandler(getProductSchema, 'params');

  try {
    const { productId } = req.params;
    const product = await productsService.delete(productId)
    res.status(200).json({
      message: 'Deleted',
      data: product
    })
  } catch (err) {
    next(err);
  }
})

module.exports = router;
