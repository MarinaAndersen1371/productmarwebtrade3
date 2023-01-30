const express = require("express");
const router = express.Router();
const {
  protect,
  admin,
  manager,
  support,
} = require("../middleware/authMiddleware.js");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAdminOrders,
  updateCustomerCoupon,
  updateReturnToActive,
} = require("../controllers/orderController.js");
const {
  getManagerOrders,
  updateInvoiceSend,
  updateOrderCover,
  updateOrderVoucher,
  updateRefundPaid,
  updateReturnClosed,
} = require("../controllers/orderManagerController.js");
const {
  getSupportOrders,
  updateOrderDeliver,
  updateOrderDispatch,
  updateOrderReceive,
} = require("../controllers/orderSupportController.js");

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAdminOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/manager").get(protect, manager, getManagerOrders);
router.route("/support").get(protect, support, getSupportOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, support, updateOrderDeliver);
router.route("/:id/dispatch").put(protect, support, updateOrderDispatch);
router.route("/:id/receive").put(protect, support, updateOrderReceive);
router.route("/:id/send").put(protect, manager, updateInvoiceSend);
router.route("/:id/cover").put(protect, manager, updateOrderCover);
router.route("/:id/voucher").put(protect, manager, updateOrderVoucher);
router.route("/:id/refund").put(protect, manager, updateRefundPaid);
router.route("/:id/returnclosed").put(protect, manager, updateReturnClosed);
router.route("/:id/coupon").put(protect, updateCustomerCoupon);
router.route("/:id/returnactive").put(protect, updateReturnToActive);

module.exports = router;
