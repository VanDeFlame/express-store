const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);

    return this._removePassword(newUser);
  }

  async find(query) {
    const options = {
      include: ['customer'],
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    };

    if (query.limit) {
      options.limit = query.limit,
      options.offset = query.offset || 0
    }

    const users = await models.User.findAll(options);

    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      attributes: {
        exclude: ['password', 'recoveryToken']
      }
    });

    if (!user) {
      throw boom.notFound(`User ${id} doesn't exists`)
    }

    return user;
  }

  async findOneComplete(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound(`User ${id} doesn't exists`)
    }

    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email: email.toLowerCase()
      }
    });

    return user;
  }

  async update(id, changes) {
    const user = await this.findOneComplete(id);
    const rta = await user.update(changes, {
      where: { id }
    });

    return this._removePassword(rta);
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy({
      where: { id }
    });

    return user;
  }

  _removePassword(user) {
    delete user.dataValues.password;
    return user;
  }
}

module.exports = UsersService;
