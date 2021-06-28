'use strict';
const faker = require('faker');

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
   return queryInterface.bulkInsert('Notebooks', [
      { 
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
      {
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
            { 
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
      { 
        title: faker.random.word(),
        userId: 1
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete('Notebooks', {
      // title: { [Op.in]: ['To-Do List', 'Recipes', 'Foods', 'Places', 'Journals', 'Books', 'Inspirational Quotes'] }
   });
  }
};
