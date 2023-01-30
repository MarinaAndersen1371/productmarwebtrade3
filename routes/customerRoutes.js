const express = require("express");
const router = express.Router();
const { protect, admin, manager } = require("../middleware/authMiddleware.js");
const {
  authCustomer,
  registerCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  getAdminCustomers,
  getCustomerDetails,
  updateCustomerTest,
  updateAdminCustomer,
  deleteCustomer,
} = require("../controllers/customerController.js");
const {
  getManagerCustomers,
  updateToPrime,
  updateToFranchise,
  updateTestToPaid,
  updateTestResult,
  updateTestScore,
  updateCustomerCoupon,
} = require("../controllers/customerManagerController.js");

router.route("/").post(registerCustomer).get(protect, admin, getAdminCustomers);
router.route("/manager").get(protect, manager, getManagerCustomers);
router.route("/login").post(authCustomer);
router
  .route("/profile")
  .get(protect, getCustomerProfile)
  .put(protect, updateCustomerProfile);
router.route("/:id").get(protect, getCustomerDetails);
router.route("/:id/test").put(protect, updateCustomerTest);
router.route("/:id/prime").put(protect, manager, updateToPrime);
router.route("/:id/testpaid").put(protect, manager, updateTestToPaid);
router.route("/:id/franchise").put(protect, manager, updateToFranchise);
router.route("/:id/testresult").put(protect, manager, updateTestResult);
router.route("/:id/testscore").put(protect, manager, updateTestScore);
router.route("/:id/coupon").put(protect, manager, updateCustomerCoupon);
router.route("/:id/admin").put(protect, admin, updateAdminCustomer);
router.route("/:id/cancel").put(protect, admin, deleteCustomer);

module.exports = router;
