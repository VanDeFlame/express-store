const faker = require("faker");

const products = [];

products.push({
  id: '1',
  name: 'Paraguas Azul',
  price: 400,
  image: faker.image.imageUrl(),
})

for(let i = 0; i < 100; i++) {
  products.push({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    image: faker.image.imageUrl(),
  })
}

module.exports = products;
