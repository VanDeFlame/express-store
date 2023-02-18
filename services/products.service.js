const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };

    if (query.limit) {
      options.limit = query.limit,
      options.offset = query.offset || 0
    }

    if (query.price) {
      options.where.price = query.price;
    }

    if (query.price_min && query.price_max) {
      options.where.price = {
        [Op.gte]: query.price_min,
        [Op.lte]: query.price_max
      };
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });

    if (!product) {
      throw boom.notFound(`Product ${id} doesn't exists`)
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes, {
      where: { id }
    });

    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy({
      where: { id }
    });

    return product;
  }
}

module.exports = ProductsService;
