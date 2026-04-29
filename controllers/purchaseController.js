const sequelize = require('../config/db');
const Purchase = require('../models/purchaseModel');
const PurchaseItem = require('../models/purchaseItemModel');
const Vendor = require('../models/vendorModel');

// ✅ Add Stock / Purchase
exports.addStock = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const {
      invoiceNumber,
      invoiceDate,
      expectedDelivery,
      vendorId,
      vendor, // new vendor object
      items,
      notes
    } = req.body;

    let finalVendorId = vendorId;

    // 🔹 If new vendor added
    if (!vendorId && vendor) {
      const newVendor = await Vendor.create(vendor, { transaction: t });
      finalVendorId = newVendor.id;
    }

    // 🔹 Create purchase
    const purchase = await Purchase.create({
      invoiceNumber,
      invoiceDate,
      expectedDelivery,
      vendorId: finalVendorId,
      notes
    }, { transaction: t });

    // 🔹 Add items
    for (let item of items) {
      const total = (item.quantity * item.price) - (item.discount || 0);

      await PurchaseItem.create({
        purchaseId: purchase.id,
        productId: item.productId,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        discount: item.discount || 0,
        total
      }, { transaction: t });

      // 🔥 Update product stock
      await sequelize.query(
        `UPDATE Products SET openingStock = openingStock + :qty WHERE id = :id`,
        {
          replacements: { qty: item.quantity, id: item.productId },
          transaction: t
        }
      );
    }

    await t.commit();

    res.json({
      message: "Stock added successfully",
      purchaseId: purchase.id
    });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};