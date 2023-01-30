const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js");

//Desc: Get all Support Orders
//Route: GET/api/orders/ Support
//Access: Priate / Support
const getSupportOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "customer",
    "id firstName name deleted"
  );
  res.json(orders);
});

//Desc: Update Order to delivered
//Route: PUT/api/orders/:id/deliver
//Access: Private / Support
const updateOrderDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Order to dispatched
//Route: PUT/api/orders/:id/dispatch
//Access: Private / Support
const updateOrderDispatch = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isSent = true;
    order.sentAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Order to received back
//Route: PUT/api/orders/:id/receive
//Access: Private / Support
const updateOrderReceive = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isReceived = true;
    order.receivedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  getSupportOrders,
  updateOrderDeliver,
  updateOrderDispatch,
  updateOrderReceive,
};
