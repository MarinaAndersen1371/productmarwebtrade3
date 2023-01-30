const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Customer = require("../models/customerModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.customer = await Customer.findById(decoded.id).select("-password");

      if (req.customer && req.customer.deleted) {
        res.status(401);
        throw new Error("Customer is not active any longer");
        return;
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.customer && req.customer.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

const manager = (req, res, next) => {
  if (req.customer && req.customer.isManager) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a manager");
  }
};

const support = (req, res, next) => {
  if (req.customer && req.customer.isSupport) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a support");
  }
};

const franchise = (req, res, next) => {
  if (req.customer && req.customer.isFranchise) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as a franchise");
  }
};

const photo = (req, res, next) => {
  if (req.customer && (req.customer.isAdmin || req.customer.isManager)) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized");
  }
};

module.exports = { protect, admin, manager, support, franchise, photo };
