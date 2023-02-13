const faker = require("faker");

const users = [];

for(let i = 0; i < 7; i++) {
  users.push({
    id: faker.datatype.uuid(),
    name: faker.name.findName()
  })
}

module.exports = users;
