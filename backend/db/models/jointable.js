'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinTable = sequelize.define('JoinTable', {
    noteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  JoinTable.associate = function(models) {
    // associations can be defined here
  };
  return JoinTable;
};