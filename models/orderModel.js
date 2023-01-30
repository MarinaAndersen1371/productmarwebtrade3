const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        warranty: { type: Number, required: true },
        gift: { type: Number, required: true },
        extra1: { type: Number, required: true },
        extra2: { type: Number, required: true },
        discount: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        pricePurchase: { type: Number, required: true },
        deleted: { type: Boolean, default: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    invoiceAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      method: { type: String, required: true },
      account: { type: String, required: true },
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPricePurchase: { type: Number, required: true, default: 0.0 },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    itemsPriceBack: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    taxPriceBack: { type: Number, required: true, default: 0.0 },
    shipping: { type: String, required: true, default: " " },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    shippingPriceBack: { type: Number, required: true, default: 0.0 },
    extraPrice: { type: Number, required: true, default: 0.0 },
    primePrice: { type: Number, required: true, default: 0.0 },
    franchisePrice: { type: Number, required: true, default: 0.0 },
    cost: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    totalNetto: { type: Number, required: false, default: 0.0 },
    totalNettoBack: { type: Number, required: false, default: 0.0 },
    totalPriceBack: { type: Number, required: false, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isSent: { type: Boolean, required: true, default: false },
    sentAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    invoiceSent: { type: Boolean, required: true, default: false },
    invoiceAt: { type: Date },
    isExtra: { type: Boolean, required: true, default: false },
    isReceived: { type: Boolean, required: true, default: false },
    receivedAt: { type: Date },
    extraFrom: { type: Date },
    voucher: { type: String, required: true, default: " " },
    voucherActive: { type: Boolean, required: true, default: false },
    returnActive: { type: Boolean, required: true, default: false },
    returnClosed: { type: Boolean, required: true, default: false },
    refund: { type: Boolean, required: true, default: false },
    refundAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
