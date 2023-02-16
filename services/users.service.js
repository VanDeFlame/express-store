const boom = require('boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);

    return newUser;
  }

  async find(query) {
    const options = {
      include: ['costumer']
    };

    if (query.limit) {
      options.limit = query.limit,
      options.offset = query.offset || 0
    }

    const users = await models.User.findAll(options);

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
