'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};