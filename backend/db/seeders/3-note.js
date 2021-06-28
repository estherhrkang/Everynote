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
   return queryInterface.bulkInsert('Notes', [
     {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
     {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
     {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 1
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 2
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 3
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 3
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 4
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 4
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 4
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 4
      },
      {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        userId: 1, 
        notebookId: 5
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
   return queryInterface.bulkDelete('Notes', {
      // title: { [Op.in]: ['By Sunday, 6-27', 'Hiking Trails', 'Keto Recipes'] }
   });
  }
};
