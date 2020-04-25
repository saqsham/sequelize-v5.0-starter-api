module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    money: {
      type: DataTypes.INTEGER
    }
  }, 
  {

  });

  User.associate = (models) => {
    User.hasMany(models.Money, {
      foreignKey: 'userId',
      as: 'userMoney',
    });
  };

  User.auth = async function(username, money) {
    const user = await User.findOne({
      where: {
        username: username,
        money: money,
      }
    })
    if (!user) {
      console.log('error')
    }
    return user
  }

  return User;

};