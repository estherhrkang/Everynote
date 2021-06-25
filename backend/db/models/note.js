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
      type: DataTypes.INTEGER
    }
  },{});

  Note.associate = function(models) {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: 'userId' });
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' });
    Note.belongsToMany(models.Tag, { through: 'JoinTable', otherKey: 'tagId', foreignKey: 'noteId' });
  };

  Note.createNew = async function(title, content, userId, notebookId) {
    const note = await Note.create({ title, content, userId, notebookId });
    return await Note.findByPk(note.id);
  };

  Note.deleteOne = async function(id) {
    const note = await Note.findByPk(id);
    await Note.destroy({ where: { id: note.id }});
    return note.id;
  };

  Note.updateOne = async function(note) {
    // await Note.update( note, { where: { id } });
    // return await Note.findByPk(id);

    const id = note.id;
    delete note.id;

    await Note.update(
      note, {
        where: { id },
        returning: true,
        plain: true,
      }
    );
    return await Note.findByPk(id);
  };

  return Note;
};