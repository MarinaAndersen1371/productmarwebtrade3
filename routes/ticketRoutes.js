const express = require("express");
const router = express.Router();
const {
  protect,
  admin,
  manager,
  support,
} = require("../middleware/authMiddleware.js");
const {
  createTicket,
  getTicketById,
  getMyTickets,
  deleteAdminTicket,
  getAdminTickets,
  updateManagerTicket,
  getManagerTickets,
  openTicket,
  updateSupportTicket,
  getSupportTickets,
} = require("../controllers/ticketController.js");

router.route("/").post(protect, createTicket).get(protect, getMyTickets);
router.route("/manager").get(protect, manager, getManagerTickets);
router.route("/admin").get(protect, admin, getAdminTickets);
router.route("/support").get(protect, support, getSupportTickets);
router
  .route("/:id")
  .get(protect, getTicketById)
  .put(protect, openTicket)
  .delete(protect, admin, deleteAdminTicket);
router.route("/:id/manager").put(protect, manager, updateManagerTicket);
router.route("/:id/support").put(protect, support, updateSupportTicket);

module.exports = router;
