const Order = require("../models/Order");

async function createOrder(req, res) {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.city ||
      !shippingAddress.address
    ) {
      return res.status(400).json({ message: "Complete shipping address is required" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Total amount must be greater than 0" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      totalAmount,
      status: "Pending"
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to place order",
      error: error.message
    });
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch all orders",
      error: error.message
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);
    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message
    });
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};