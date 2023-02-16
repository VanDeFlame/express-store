'use strict';

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description);
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
    await queryInterface.changeColumn(PRODUCT_TABLE, 'image', ProductSchema.image);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
    await queryInterface.changeColumn(PRODUCT_TABLE, 'image', {
      ...ProductSchema.image,
      unique: true
    });
    await queryInterface.dropTable(CATEGORY_TABLE, CategorySchema);
  }
};
