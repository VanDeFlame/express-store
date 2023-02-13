const faker = require("faker");

const users = [];

users.push({
  id: '1',
  name: 'VanDeFlame',
  image: faker.image.imageUrl()
})

for(let i = 0; i < 30; i++) {
  users.push({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    image: faker.image.imageUrl()
  })
}

module.exports = users;
