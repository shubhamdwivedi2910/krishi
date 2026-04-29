const User = require('../models/userModel');

// Dummy models (later you will create real ones)
const Sales = []; 
const Purchases = [];
const Products = [];
const Transactions = [];

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    // 👤 Get user
    const user = await User.findByPk(userId);

    // 📅 Current month filter
    const currentMonth = new Date().getMonth();

    // 💰 Monthly Sales (dummy for now)
    const monthlySales = 50000;

    // 🛒 Monthly Purchase
    const monthlyPurchase = 30000;

    // 📦 Total Products
    const totalProducts = 120;

    // 🏷️ Stock Value
    const stockValue = 200000;

    // 📊 Weekly Sales Overview
    const weeklySales = [
      { day: "Mon", amount: 5000 },
      { day: "Tue", amount: 7000 },
      { day: "Wed", amount: 6000 },
      { day: "Thu", amount: 8000 },
      { day: "Fri", amount: 9000 },
      { day: "Sat", amount: 4000 },
      { day: "Sun", amount: 3000 }
    ];

    // 🧾 Recent Transactions
    const recentTransactions = [
      { id: 1, type: "sale", amount: 2000 },
      { id: 2, type: "purchase", amount: 1500 }
    ];

    res.json({
      user: {
        Shopname: user.shopName
      },
      summary: {
        monthlySales,
        monthlyPurchase,
        totalProducts,
        stockValue
      },
      weeklySales,
      recentTransactions
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};