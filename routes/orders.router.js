const express = require("express");
const OrdersService = require("../services/orders.service");

const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/orders.schema');

const router = express.Router();
const ordersService = new OrdersService();

/* USERS */
router.get("/", async (req, res, next) => {
  try {
    const orders = await ordersService.find();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:orderId",
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await ordersService.findOne(orderId);
      res.status(200).json(order);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const order = await ordersService.create(req.body)
      res.status(201).json({
        message: 'Created',
        data: order
      })
    } catch (err) {
      next(err);
    }
  }
)

router.post('/add-item/',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const order = await ordersService.addItem(req.body)
      res.status(201).json({
        message: 'Added',
        data: order
      })
    } catch (err) {
      next(err);
    }
  }
)
/*
router.patch('/:orderId',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await ordersService.update(orderId, req.body)
      res.status(200).json({
        message: 'Updated',
        data: order
      })
    } catch (err) {
      next(err);
    }
  }
)*/

router.delete('/:orderId',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await ordersService.delete(orderId)
      res.status(200).json({
        message: 'Deleted',
        data: order
      })
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;
