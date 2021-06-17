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
   return queryInterface.bulkInsert('Tags', [
      {
        name: 'Demo-Tag1'
      },
      {
        name: 'Demo-Tag2'
      },
      {
        name: 'Demo-Tag3'
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
    return queryInterface.bulkDelete('Tags', {
      name: { [Op.in]: ['Demo-Tag1', 'Demo-Tag2', 'Demo-Tag3'] }
    });
  }
};
