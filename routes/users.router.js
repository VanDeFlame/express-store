const express = require("express");
const UsersService = require("../services/users.service");

const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/users.schema');

const router = express.Router();
const usersService = new UsersService();

/* USERS */
router.get("/", async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const users = await usersService.find(limit, offset);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  validatorHandler(getUserSchema, 'params');

  try {
    const { userId } = req.params;
    const user = await usersService.findOne(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  validatorHandler(createUserSchema, 'body');

  try {
    const user = await usersService.create(req.body)
    res.status(201).json({
      message: 'Created',
      data: user
    })
  } catch (err) {
    next(err);
  }
})

router.patch('/:userId', async (req, res, next) => {
  validatorHandler(getUserSchema, 'params');
  validatorHandler(updateUserSchema, 'body');

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
})

router.delete('/:userId', async (req, res, next) => {
  validatorHandler(getUserSchema, 'params');

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
})

module.exports = router;
