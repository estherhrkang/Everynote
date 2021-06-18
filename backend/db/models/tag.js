'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(50),
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
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Note, { through: 'JoinTable', otherKey: 'noteId', foreignKey: 'tagId' });
  };
  return Tag;
};