const boom = require('boom');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data);

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
