const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');
const validatorHandler = require('../middlewares/validator.handler');
const { recoveryEmail, recoveryPassword } = require('../schemas/auth.schema');

const router = express.Router();
const authService = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const rta = authService.signToken(req.user);
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/recovery',
  validatorHandler(recoveryEmail, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await authService.sendRecoveryMail(email);
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/change-password',
  validatorHandler(recoveryPassword, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await authService.changePassword(token, newPassword);
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
