'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notebookId: {
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
  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
    Note.belongsToMany(models.Tag, { through: 'JoinTable', otherKey: 'tagId', foreignKey: 'noteId' });
  };
  return Note;
};