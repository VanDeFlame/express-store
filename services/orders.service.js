const boom = require('@hapi/boom');
const sequelize = require('sequelize');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {}

  async create(userId) {
    const customer = await models.Customer.findOne({
      where: {
        userId
      }
    });

    const newOrder = await models.Order.create({
      customerId: customer.id
    });
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);

    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();

    return orders;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });

    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    if (!order) {
      throw boom.notFound(`Order ${id} doesn't exists`)
    }

    order.dataValues.total = order.items.reduce((total, item) => {
      return total + (item.price * item.OrderProduct.amount);
    }, 0)

    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes, {
      where: { id }
    });

    return rta;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy({
      where: { id }
    });

    return order;
  }
}

module.exports = OrdersService;
