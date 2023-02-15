const boom = require('boom');
const { models } = require('../libs/sequelize');
class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(limit, offset=0) {
    const products = await models.Product.findAll({
      limit,
      offset
    });

    if (products.length === 0) {
      throw boom.notFound(`Not products`);
    }

    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);

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
