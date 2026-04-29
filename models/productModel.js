const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('fertilizer', 'pesticide', 'seeds', 'tools', 'other'),
    allowNull: false
  },
  unit: {
    type: DataTypes.ENUM('kg', 'g', 'l', 'ml', 'piece', 'bag', 'box'),
    allowNull: false
  },
  supplierName: {
    type: DataTypes.STRING
  },
  buyPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sellPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  openingStock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  manufacturingDate: {
    type: DataTypes.DATE
  },
  expiryDate: {
    type: DataTypes.DATE
  }
});

module.exports = Product;