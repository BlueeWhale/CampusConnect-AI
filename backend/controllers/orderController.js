const Order = require("../models/Order");

// =========================
// CREATE ORDER
// =========================
exports.createOrder = async (req, res) => {

  try {

    const { foodName, price } = req.body;

    const order = await Order.create({
      foodName,
      price,
      status: "Pending"
    });

    res.json({
      success: true,
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// GET ORDERS
// =========================
exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// UPDATE STATUS
// =========================
exports.updateOrderStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      order
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};