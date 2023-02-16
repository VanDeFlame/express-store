const express = require('express');
const CategoriesService = require('../services/categories.service');

const validatorHandler = require('../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('../schemas/categories.schema');

const router = express.Router();
const categoriesService = new CategoriesService();

/* PRODUCTS */
router.get("/", async (req, res, next) => {
  try {
    const categories = await categoriesService.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
});

router.get("/:categoryId",
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await categoriesService.findOne(categoryId);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const category = await categoriesService.create(req.body);
      res.status(201).json({
        message: 'Created',
        data: category
      })
    } catch (err) {
      next(err);
    }
  }
);

router.patch('/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await categoriesService.update(categoryId, req.body)
      res.status(200).json({
        message: 'Updated',
        data: category
      })
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
   async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await categoriesService.delete(categoryId)
      res.status(200).json({
        message: 'Deleted',
        data: category
      })
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
