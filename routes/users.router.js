const express = require("express");
const passport = require("passport");
const UsersService = require("../services/users.service");

const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema, queryUserSchema } = require('../schemas/users.schema');
const { checkRoles } = require("../middlewares/auth.handler");

const router = express.Router();
const usersService = new UsersService();

router.get("/",
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(queryUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const users = await usersService.find(req.query);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/:userId",
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await usersService.findOne(userId);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await usersService.create(req.body)
      res.status(201).json({
        message: 'Created',
        data: user
      })
    } catch (err) {
      next(err);
    }
  }
)

router.patch('/:userId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await usersService.update(userId, req.body)
      res.status(200).json({
        message: 'Updated',
        data: user
      })
    } catch (err) {
      next(err);
    }
  }
)

router.delete('/:userId',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await usersService.delete(userId)
      res.status(200).json({
        message: 'Deleted',
        data: user
      })
    } catch (err) {
      next(err);
    }
  }
)

module.exports = router;
