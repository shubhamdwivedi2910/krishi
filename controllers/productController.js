const Product = require('../models/productModel');

// ✅ Add Product
exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      sku,
      category,
      unit,
      supplierName,
      buyPrice,
      sellPrice,
      openingStock,
      manufacturingDate,
      expiryDate
    } = req.body;

    // 🔴 Validation
    if (!productName || !sku || !category || !unit || !buyPrice || !sellPrice) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // 🔴 Check duplicate SKU
    const existing = await Product.findOne({ where: { sku } });
    if (existing) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    // 🔴 Price validation
    if (sellPrice < buyPrice) {
      return res.status(400).json({ message: "Sell price cannot be less than buy price" });
    }

    const product = await Product.create({
      productName,
      sku,
      category,
      unit,
      supplierName,
      buyPrice,
      sellPrice,
      openingStock,
      manufacturingDate,
      expiryDate
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};