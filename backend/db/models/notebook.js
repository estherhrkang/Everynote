'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, 
  {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    }
  });
  Notebook.associate = function(models) {
    // associations can be defined here
  };
  return Notebook;
};