const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");

//Desc: Create new order
//Route: POST/api/orders
//Access: Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    invoiceAddress,
    payment,
    primePrice,
    franchisePrice,
    shipping,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      customer: req.customer._id,
      shippingAddress,
      invoiceAddress,
      payment,
      primePrice,
      franchisePrice,
      shipping,
    });

    if (order && order.orderItems) {
      for (const index in order.orderItems) {
        const item = order.orderItems[index];
        const product = await Product.findById(item.product);
        if (product) {
          product.countInStock -= item.qty;
          if (+product.countInStock < 0) {
            throw new Error("One of the Items is out of stock");
            return;
          } else {
            await product.save();
          }
        }
      }

      order.cost = order.orderItems
        .reduce((acc, item) => acc + +item.qty * +item.pricePurchase, 0)
        .toFixed(2);

      order.itemsPrice = order.orderItems
        .reduce(
          (acc, item) =>
            acc +
            +item.qty * +item.price -
            +item.qty * +item.price * +item.discount +
            +item.qty * +item.price * +item.warranty +
            +item.gift +
            +item.qty * +item.extra1 +
            +item.qty * +item.extra2,
          0
        )
        .toFixed(2);

      order.extraPrice = order.orderItems
        .reduce(
          (acc, item) =>
            acc + +item.qty * +item.extra1 + +item.qty * +item.extra2,
          0
        )
        .toFixed(2);

      order.shippingPrice =
        order.shipping === "Fastest"
          ? 10
          : order.shipping === "Prime" || +order.itemsPrice > 800
          ? 0
          : 5;

      order.totalNetto = (
        +order.itemsPrice +
        +order.shippingPrice +
        +order.primePrice +
        +order.franchisePrice
      ).toFixed(2);

      order.taxPrice = (+order.totalNetto * 0.15).toFixed(2);

      order.totalPrice = (+order.totalNetto + +order.taxPrice).toFixed(2);
    }

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//Desc:Get order By Id
//Route: GET/api/orders/:id
//Access: Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "customer",
    "firstName name email phone"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update order to paid
//Route: PUT/api/orders/:id/pay
//Access: Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Update Customer Coupon
//Route: PUT/api/orders/:id/coupon
//Access: Private
const updateCustomerCoupon = asyncHandler(async (req, res) => {
  const voucherExists = await Order.findOne({
    voucher: req.body.voucher.trim(),
  });
  if (voucherExists) {
    res.status(400);
    throw new Error("This Voucher is already submitted!");
    return;
  }

  const order = await Order.findById(req.params.id);
  if (order) {
    order.voucher = req.body.voucher.trim();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//Desc: Get my Orders
//Route: GET/api/orders/myorders
//Access: Priate
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.customer._id });
  res.json(orders);
});

//Desc: Get all Admin Orders
//Route: GET/api/orders
//Access: Priate / Admin
const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate(
    "customer",
    "id firstName name deleted"
  );
  res.json(orders);
});

//Desc: Update Return to active
//Route: PUT/api/orders/:id/returnactive
//Access: Private
const updateReturnToActive = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order && order.orderItems) {
    order.returnActive = true;
    order.itemsPriceBack = order.orderItems.reduce(
      (acc, item) =>
        acc +
        (+item.qty * +item.price -
          +item.qty * +item.price * +item.discount +
          +item.qty * +item.price * +item.warranty +
          +item.qty * +item.extra1 +
          +item.qty * +item.extra2),
      0
    );
    order.shippingPriceBack = order.isSent ? 0 : order.shippingPrice;

    order.totalNettoBack =
      +order.itemsPriceBack +
      +order.shippingPriceBack -
      (order.voucherActive ? 10 : 0);

    order.taxPriceBack = +order.totalNettoBack * 0.15;

    order.totalPriceBack = +order.totalNettoBack + +order.taxPriceBack;

    for (const index in order.orderItems) {
      const item = order.orderItems[index];
      const product = await Product.findById(item.product);
      if (product) {
        product.countInStock += item.qty;
        await product.save();
      }
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAdminOrders,
  updateCustomerCoupon,
  updateReturnToActive,
};
