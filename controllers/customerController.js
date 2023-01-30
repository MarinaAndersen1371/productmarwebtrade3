const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken.js");
const Customer = require("../models/customerModel.js");

//Desc: Auth customer and get token
//Route: POST/api/customers/login
//Access: Public
const authCustomer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });
  if (customer && (await customer.matchPassword(password))) {
    if (customer.deleted) {
      res.status(401);
      throw new Error("Customer is removed from the Customer List");
      return;
    }

    res.json({
      _id: customer._id,
      firstName: customer.firstName,
      name: customer.name,
      email: customer.email,
      isAdmin: customer.isAdmin,
      isManager: customer.isManager,
      isSupport: customer.isSupport,
      isPrime: customer.isPrime,
      isFranchise: customer.isFranchise,
      coupon: customer.coupon,
      token: generateToken(customer._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Desc: Register customer
//Route: POST/api/customers
//Access: Public
const registerCustomer = asyncHandler(async (req, res) => {
  const { firstName, name, email, password, phone, birthday, gender, purpose } =
    req.body;
  const customerExists = await Customer.findOne({ email });
  if (customerExists) {
    res.status(400);
    throw new Error("This Email is already registered");
  }

  const customer = await Customer.create({
    firstName,
    name,
    email,
    password,
    phone,
    birthday,
    gender,
    purpose,
  });
  if (customer) {
    res.json({
      _id: customer._id,
      firstName: customer.firstName,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      birthday: customer.birthday,
      gender: customer.gender,
      purpose: customer.purpose,
      isAdmin: customer.isAdmin,
      isManager: customer.isManager,
      isSupport: customer.isSupport,
      isPrime: customer.isPrime,
      isFranchise: customer.isFranchise,
      coupon: customer.coupon,
      deleted: customer.deleted,
      token: generateToken(customer._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid customer data");
  }
});

//Desc: Get customer Profile
//Route: GET/api/customers/profile
//Access: Private
const getCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer._id);

  if (customer) {
    res.json({
      _id: customer._id,
      firstName: customer.firstName,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      birthday: customer.birthday,
      gender: customer.gender,
      purpose: customer.purpose,
      test1: customer.test1,
      test2: customer.test2,
      test3: customer.test3,
      test4: customer.test4,
      test5: customer.test5,
      testPaid: customer.testPaid,
      testScore: customer.testScore,
      isPrime: customer.isPrime,
      primeFrom: customer.primeFrom,
      isFranchise: customer.isFranchise,
      franchiseFrom: customer.franchiseFrom,
      isAdmin: customer.isAdmin,
      isManager: customer.isManager,
      isSupport: customer.isSupport,
      coupon: customer.coupon,
      image: customer.image,
      deleted: customer.deleted,
    });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update customer Profile
//Route: PUT/api/customers/profile
//Access: Private
const updateCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer._id);

  if (customer) {
    customer.firstName = req.body.firstName || customer.firstName;
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.phone = req.body.phone || customer.phone;
    customer.birthday = req.body.birthday || customer.birthday;
    customer.gender = req.body.gender || customer.gender;
    customer.purpose = req.body.purpose || customer.purpose;
    req.body.password && (customer.password = req.body.password);

    const updatedCustomer = await customer.save();

    res.json({
      _id: updatedCustomer._id,
      firstName: updatedCustomer.firstName,
      name: updatedCustomer.name,
      email: updatedCustomer.email,
      phone: updatedCustomer.phone,
      birthday: updatedCustomer.birthday,
      gender: updatedCustomer.gender,
      purpose: updatedCustomer.purpose,
      isPrime: updatedCustomer.isPrime,
      isFranchise: updatedCustomer.isFranchise,
      isAdmin: updatedCustomer.isAdmin,
      isManager: updatedCustomer.isManager,
      isSupport: updatedCustomer.isSupport,
      coupon: updatedCustomer.coupon,
      token: generateToken(updatedCustomer._id),
    });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Get Admin Customer List
//Route: GET/api/customers
//Access: Private / Admin
const getAdminCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({ deleted: false });
  res.json(customers);
});

//Desc: Get customer By Id
//Route: GET/api/customers/:id
//Access: Private
const getCustomerDetails = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id).select("-password");
  if (customer) {
    res.json(customer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Delete customer By Id
//Route: PUT/api/customers/:id/cancel
//Access: Private / Admin
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    customer.deleted = true;
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update customer details
//Route: PUT/api/customers/:id/admin
//Access: Private / Admin
const updateAdminCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.firstName = req.body.firstName || customer.firstName;
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.phone = req.body.phone || customer.phone;
    customer.birthday = req.body.birthday || customer.birthday;
    customer.gender = req.body.gender || customer.gender;
    customer.purpose = req.body.purpose || customer.purpose;
    customer.image = req.body.image || customer.image;
    customer.testPaid = req.body.testPaid ?? customer.testPaid;
    customer.testScore = req.body.testScore || customer.testScore;
    customer.coupon = req.body.coupon || customer.coupon;
    customer.isPrime = req.body.isPrime ?? customer.isPrime;
    customer.isFranchise = req.body.isFranchise ?? customer.isFranchise;
    customer.isManager = req.body.isManager ?? customer.isManager;
    customer.isSupport = req.body.isSupport ?? customer.isSupport;
    customer.isAdmin = req.body.isAdmin ?? customer.isAdmin;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

//Desc: Update customer test
//Route: PUT/api/customers/:id/test
//Access: Private
const updateCustomerTest = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customer._id);

  if (customer) {
    customer.test1 = req.body.test1 || customer.test1;
    customer.test2 = req.body.test2 || customer.test2;
    customer.test3 = req.body.test3 || customer.test3;
    customer.test4 = req.body.test4 || customer.test4;
    customer.test5 = req.body.test5 || customer.test5;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

module.exports = {
  authCustomer,
  registerCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  getAdminCustomers,
  updateAdminCustomer,
  updateCustomerTest,
  getCustomerDetails,
  deleteCustomer,
};
