const faker = require("faker");
const categories = require("../database/categories.database");

class CategoriesService {
  constructor() {
    this.categories = categories;
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  async find(limit, offset=0) {
    if (limit) {
      const indexLast = Number(offset) + Number(limit);

      return categories.slice(offset, indexLast)
    }

    return this.categories;
  }

  async findOne(id) {
    return this.categories.find(item => item.id === id);
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id)
    const newItem = {
      ...this.categories[index],
      ...changes
    };

    this.categories[index] = newItem;
    return newItem;
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);

    return this.categories.splice(index, 1);
  }
}

module.exports = CategoriesService;
