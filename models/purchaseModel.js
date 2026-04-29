const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Purchase = sequelize.define('Purchase', {
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invoiceDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expectedDelivery: {
    type: DataTypes.DATE
  },
  vendorId: {
    type: DataTypes.INTEGER
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = Purchase;