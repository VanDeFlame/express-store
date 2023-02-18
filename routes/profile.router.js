const express = require('express');
const passport = require('passport');
const OrdersService = require('../services/orders.service');

const router = express.Router();
const ordersService = new OrdersService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await ordersService.findByUser(user.sub);
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
