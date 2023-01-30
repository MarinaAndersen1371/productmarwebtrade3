const express = require("express");
const router = express.Router();
const {
  protect,
  admin,
  manager,
  franchise,
} = require("../middleware/authMiddleware.js");
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getManagerProducts,
  getFranchiseProducts,
  updateManagerProduct,
  topRatedProducts,
  createProductReview,
} = require("../controllers/productController.js");

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/manager").get(protect, manager, getManagerProducts);
router.route("/franchise").get(protect, franchise, getFranchiseProducts);
router.route("/top").get(topRatedProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);
router.route("/:id/cancel").put(protect, admin, deleteProduct);
router.route("/:id/manager").put(protect, manager, updateManagerProduct);

module.exports = router;
