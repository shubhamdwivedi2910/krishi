const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PurchaseItem = sequelize.define('PurchaseItem', {
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  total: {
    type: DataTypes.FLOAT
  }
});

module.exports = PurchaseItem;