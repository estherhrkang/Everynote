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
   return queryInterface.bulkInsert('Notebooks', [
     {
        title: 'Demo-Notebook1',
        userId: 1
      },
      {
        title: 'Demo-Notebook2',
        userId: 1
      },
      {
        title: 'Demo-Notebook3',
        userId: 1
      }
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
      title: { [Op.in]: ['Demo-Notebook1', 'Demo-Notebook2', 'Demo-Notebook3'] }
   });
  }
};
