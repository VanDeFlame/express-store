const faker = require("faker");
const products = require("../database/products.database");

class ProductsService {
  constructor() {
    this.products = products;
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      if (!data.name || !data.price || !data.image) {
        reject('Missing data');
      }

      const newProduct = {
        id: faker.datatype.uuid(),
        ...data
      };

      this.products.push(newProduct);

      resolve(newProduct);
    })
  }

  async find(limit, offset=0) {
    return new Promise((resolve, reject) => {
      if (this.products.length === 0) {
        reject(`Not products`)
      }

      if (limit) {
        const indexLast = Number(offset) + Number(limit);
        resolve(this.products.slice(offset, indexLast))
      }

      resolve(this.products);
    })
  }

  async findOne(id) {
    return new Promise((resolve, reject) => {
      const product = this.products.find(item => item.id === id);

      if (!product) {
        reject(`Product ${id} doesn't exists`)
      }

      resolve(product);
    })
  }

  async update(id, changes) {
    return new Promise((resolve, reject) => {
      const index = this.products.findIndex(item => item.id === id);

      if (index === -1) {
        reject(`Product ${id} doesn't exists`)
      }

      const newItem = {
        ...this.products[index],
        ...changes
      };

      this.products[index] = newItem;
      resolve(newItem);
    })
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.products.findIndex(item => item.id === id);

      if (index === -1) {
        reject(`Product ${id} doesn't exists`)
      }

      const productDeleted = this.products.splice(index, 1)[0];
      resolve(productDeleted);
    })
  }
}

module.exports = ProductsService;
