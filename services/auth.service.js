
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config')
const UsersService = require('./users.service');

const usersService = new UsersService();

class AuthService {
  constructor() {}

  async getUser(email, password) {
    const user = await usersService.findByEmail(email)
    if (!user) {
      throw boom.notFound();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);

    return {
      user,
      jwt: token
    };
  }

  async sendRecoveryMail(email) {
    const user = await usersService.findByEmail(email)
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: '10min'
    });

    await usersService.update(user.id, {
      recoveryToken: token
    })

    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Password Recovery | Express-Store',
      html: `<a href="${config.client}/recovery/change-password?token=${token}">Click here to change password</a>`
    }

    return await this.sendMail(mail);
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await usersService.findOneComplete(payload.sub);

      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }

      await usersService.update(user.id, {
        password: newPassword,
        recoveryToken: null
      })

      return {
        message: 'Password changed'
      }
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });

    await transporter.sendMail(infoMail)
    return {
      message: 'Mail sent'
    }
  }
}

module.exports = AuthService;
