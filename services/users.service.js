const faker = require('faker');
const boom = require('boom');
const users = require('../database/users.database');

class UsersService {
  constructor() {
    this.users = users;
  }

  async create(data) {
    return new Promise((resolve, reject) => {
      if (!data.name || !data.image) {
        reject(
          boom.badData('Missing data')
        );
      }

      const newUser = {
        id: faker.datatype.uuid(),
        ...data
      };

      this.users.push(newUser);

      resolve(newUser);
    })
  }

  async find(limit, offset=0) {
    return new Promise((resolve, reject) => {
      if (this.users.length === 0) {
        reject(
          boom.notFound(`Not users`)
        )
      }

      if (limit) {
        const indexLast = Number(offset) + Number(limit);
        resolve(this.users.slice(offset, indexLast))
      }

      resolve(this.users);
    })
  }

  async findOne(id) {
    return new Promise((resolve, reject) => {
      const user = this.users.find(item => item.id === id);

      if (!user) {
        reject(
          boom.notFound(`User ${id} doesn't exists`)
        )
      }

      resolve(user);
    })
  }

  async update(id, changes) {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(item => item.id === id);

      if (index === -1) {
        reject(
          boom.notFound(`User ${id} doesn't exists`)
        )
      }

      const newItem = {
        ...this.users[index],
        ...changes
      };

      this.users[index] = newItem;
      resolve(newItem);
    })
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      const index = this.users.findIndex(item => item.id === id);

      if (index === -1) {
        reject(
          boom.notFound(`User ${id} doesn't exists`)
        )
      }

      const userDeleted = this.users.splice(index, 1)[0];
      resolve(userDeleted);
    })
  }
}

module.exports = UsersService;
