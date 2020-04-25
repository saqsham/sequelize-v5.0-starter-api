'use strict';
module.exports = (sequelize, DataTypes) => {
  const Money = sequelize.define('Money', {
    content: DataTypes.STRING,
    money: DataTypes.INTEGER
  }, {});

  Money.associate = (models) => {
    Money.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };

  return Money;

};