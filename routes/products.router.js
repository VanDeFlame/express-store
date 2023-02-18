const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products.service');

const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/products.schema');
const { checkRoles } = require('../middlewares/auth.handler');

const router = express.Router();
const productsService = new ProductsService();

router.get("/",
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await productsService.find(req.query);
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:productId",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await productsService.findOne(productId);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const product = await productsService.create(req.body);
      res.status(201).json({
        message: 'Created',
        data: product
      })
    } catch (err) {
      next(err);
    }
  }
);

router.patch('/:productId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
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
  }
);

router.delete('/:productId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'seller'),
  validatorHandler(getProductSchema, 'params'),
   async (req, res, next) => {
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
  }
);

module.exports = router;
