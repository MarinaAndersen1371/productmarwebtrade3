const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel.js");

//Desc: Create new ticket
//Route: POST/api/tickets
//Access: Private
const createTicket = asyncHandler(async (req, res) => {
  const { quest, type } = req.body;
  const ticket = new Ticket({
    quest,
    type,
    customer: req.customer._id,
  });
  const createdTicket = await ticket.save();
  res.status(201).json(createdTicket);
});

//Desc:Get Ticket By Id
//Route: GET/api/tickets/:id
//Access: Private
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "customer",
    "firstName name email phone"
  );
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc:Get  My Tickets
//Route: GET/api/tickets
//Access: Private
const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ customer: req.customer._id });
  res.json(tickets);
});

//Desc: Delete Admin Ticket
//Route: DELETE/api/tickets/:id
//Access: Private / Admin
const deleteAdminTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (ticket) {
    await ticket.remove();
    res.json({ message: "Ticket has been removed" });
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc:Get Admin Tickets
//Route: GET/api/tickets/admin
//Access: Private / Admin
const getAdminTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().populate(
    "customer",
    "firstName name email phone deleted"
  );
  res.json(tickets);
});

//Desc: Update Manager ticket
//Route: PUT/api/tickets/:id/manager
//Access: Private / Manager
const updateManagerTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.commentManager = req.body.commentManager || ticket.commentManager;
    ticket.status = req.body.status || ticket.status;
    ticket.mark = req.body.mark || ticket.mark;
    ticket.timeManager =
      +ticket.timeManager + +req.body.timeManager || ticket.timeManager;
    ticket.open = false;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc:Get  Manager Tickets
//Route: GET/api/tickets/manager
//Access: Private / Manager
const getManagerTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().populate(
    "customer",
    "firstName name email phone deleted"
  );
  res.json(tickets);
});

//Desc: Open   ticket
//Route: PUT/api/tickets/:id
//Access: Private
const openTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.open = true;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});

//Desc: Update Support ticket
//Route: PUT/api/tickets/:id/support
//Access: Private / Support
const updateSupportTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (ticket) {
    ticket.commentSupport = req.body.commentSupport || ticket.commentSupport;
    ticket.status = req.body.status || ticket.status;
    ticket.mark = req.body.mark || ticket.mark;
    ticket.timeSupport =
      +ticket.timeSupport + +req.body.timeSupport || ticket.timeSupport;
    ticket.open = false;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } else {
    res.status(404);
    throw new Error("Ticket not found");
  }
});
//Desc: Get Support Tickets
//Route: GET/api/tickets/support
//Access: Private / Support
const getSupportTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().populate(
    "customer",
    "firstName name email phone deleted"
  );
  res.json(tickets);
});

module.exports = {
  createTicket,
  getTicketById,
  deleteAdminTicket,
  updateManagerTicket,
  getMyTickets,
  getManagerTickets,
  getAdminTickets,
  openTicket,
  getSupportTickets,
  updateSupportTicket,
};
