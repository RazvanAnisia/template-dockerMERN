'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
