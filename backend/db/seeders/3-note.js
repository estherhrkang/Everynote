'use strict';

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
        title: 'By Sunday, 6-27',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        userId: 1,
        notebookId: 1
      },
     {
        title: 'Hiking Trails',
        content: 'Nullam tempor congue magna.',
        userId: 1,
        notebookId: 4
      },
     {
        title: 'Keto Recipes',
        content: 'Mauris blandit arcu ut odio vehicula ullamcorper.',
        userId: 1,
        notebookId: 2
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
      title: { [Op.in]: ['By Sunday, 6-27', 'Hiking Trails', 'Keto Recipes'] }
   });
  }
};
