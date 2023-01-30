const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel.js");

//Desc: Get Manager Customer List
//Route: GET/api/customers/manager
//Access: Private / Manager
const getManagerCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({ deleted: false });
  res.json(customers);
});

//Desc: Update Customer to Prime
//Route: PUT/api/customers/:id/prime
//Access: Private / Manager
const updateToPrime = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.isPrime = true;
    customer.primeFrom = Date.now();
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update Customer to Franchise
//Route: PUT/api/customers/:id/franchise
//Access: Private / Manager
const updateToFranchise = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.isFranchise = true;
    customer.franchiseFrom = Date.now();
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update Test to paid
//Route: PUT/api/customers/:id/testpaid
//Access: Private / Manager
const updateTestToPaid = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.testPaid = true;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update Test Result
//Route: PUT/api/customers/:id/testresult
//Access: Private / Manager
const updateTestResult = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    let answer1, answer2, answer3, answer4, answer5;
    customer.test1 === "Yes" ? (answer1 = 20) : (answer1 = 1);
    customer.test2 === "No" ? (answer2 = 20) : (answer2 = 1);
    customer.test3 === "Yes" ? (answer3 = 20) : (answer3 = 1);
    customer.test4 === "No" ? (answer4 = 20) : (answer4 = 1);
    customer.test5 === "Yes" ? (answer5 = 20) : (answer5 = 1);

    customer.testScore = +answer1 + +answer2 + +answer3 + +answer4 + +answer5;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update Test Score
//Route: PUT/api/customers/:id/testscore
//Access: Private / Manager
const updateTestScore = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.testScore = req.body.testScore || customer.testScore;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update Customer Coupon
//Route: PUT/api/customers/:id/coupon
//Access: Private / Manager
const updateCustomerCoupon = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.coupon = req.body.coupon.trim() || customer.coupon;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

module.exports = {
  getManagerCustomers,
  updateToPrime,
  updateTestToPaid,
  updateToFranchise,
  updateTestResult,
  updateTestScore,
  updateCustomerCoupon,
};
