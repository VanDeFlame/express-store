const express = require("express");
const CustomersService = require("../services/customers.service");

const validatorHandler = require('../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema, queryCustomerSchema } = require('../schemas/customers.schema');

const router = express.Router();
const customersService = new CustomersService();

/* USERS */
router.get("/",
  validatorHandler(queryCustomerSchema, 'query'),
  async (req, res, next) => {
    try {
      const customers = await customersService.find(req.query);
      res.status(200).json(customers);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:customerId",
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const customer = await customersService.findOne(customerId);
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const customer = await customersService.create(req.body)
      res.status(201).json({
        message: 'Created',
        data: customer
      })
    } catch (err) {
      next(err);
    }
  }
)

router.patch('/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const customer = await customersService.update(customerId, req.body)
      res.status(200).json({
        message: 'Updated',
        data: customer
      })
    } catch (err) {
      next(err);
    }
  }
)

router.delete('/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const customer = await customersService.delete(customerId)
      res.status(200).json({
        message: 'Deleted',
        data: customer
      })
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;
