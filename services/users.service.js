const boom = require('boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);

    return newUser;
  }

  async find(limit, offset=0) {
    const users = await models.User.findAll({
      limit,
      offset
    });

    if (users.length === 0) {
      throw boom.notFound(`Not users`);
    }

    return users;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound(`User ${id} doesn't exists`)
    }

    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes, {
      where: { id }
    });

    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy({
      where: { id }
    });

    return user;
  }
}

module.exports = UsersService;
