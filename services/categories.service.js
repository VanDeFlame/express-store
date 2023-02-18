const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoriesService {
  constructor() {}

  async create(data) {
    const newCategory = await models.Category.create(data);

    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();

    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });

    if (!category) {
      throw boom.notFound(`Category ${id} doesn't exists`)
    }

    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes, {
      where: { id }
    });

    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy({
      where: { id }
    });

    return category;
  }
}

module.exports = CategoriesService;
