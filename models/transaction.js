module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    type: {
      type:DataTypes.STRING,
      allowNull: false,
    }, 
    category: {
      type:DataTypes.TEXT
    }
  });
  return Example;
};
