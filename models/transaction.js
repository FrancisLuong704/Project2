module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    type: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   len: [1]
      // }
    }, 
    category: {
      type: DataTypes.TEXT,
      defaultValue: "Misc.",
    },
    date: {
      type: DataTypes.DATEONLY,
      // defaultValue: DataTypes.NOW,
      // allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return Transaction;
};
