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
  }, {});

  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'userId' });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' });
  };

  Notebook.createNew = async function(title, userId) {
    const notebook = await Notebook.create({ title, userId });
    return await Notebook.findByPk(notebook.id);
  };

  Notebook.deleteOne = async function(id) {
    const notebook = await Notebook.findByPk(id);
    await Notebook.destroy({ where: { id: notebook.id }});
    return notebook.id;
  };

  // Notebook.updateOne = async function(notebook) {
  //   const id = notebook.id;
  //   await Notebook.update( notebook, { where: { id } });
  //   return await Notebook.findByPk(id);
  // };

  return Notebook;
};