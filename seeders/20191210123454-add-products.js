'use strict';
const faker = require('faker');
console.log(faker);

// faker.setLocale('es');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const products = [];
    for (let index = 0; index < 100; index++) {
      products.push({
        name: faker.commerce.productName(),
        stock: faker.random.number(),
        price: faker.commerce.price(),
        description: faker.lorem.paragraph(),
        imageUrl: faker.image.imageUrl(),
        rating: Math.ceil(Math.random() * 5),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
