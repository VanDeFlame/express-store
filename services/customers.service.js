const boom = require('boom');
const { models } = require('../libs/sequelize');

class CustomersService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });

    return newCustomer;
  }

  async find(query) {
    const options = {
      include: ['user']
    };

    if (query.limit) {
      options.limit = query.limit,
      options.offset = query.offset || 0
    }

    const customers = await models.Customer.findAll(options);

    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);

    if (!customer) {
      throw boom.notFound(`Customer ${id} doesn't exists`)
    }

    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes, {
      where: { id }
    });

    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy({
      where: { id }
    });

    return customer;
  }
}

module.exports = CustomersService;
