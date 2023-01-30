const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    quest: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true, default: "New" },
    commentManager: { type: String, required: true, default: "No Comment" },
    timeManager: { type: Number, required: true, default: 0 },
    commentSupport: { type: String, required: true, default: "No Comment" },
    timeSupport: { type: Number, required: true, default: 0 },
    open: { type: Boolean, required: true, default: false },
    mark: { type: String, required: true, default: " " },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
