const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, default: "+490000000000" },
    birthday: { type: String, required: true, default: "YYYY-MM-dd" },
    gender: { type: String, required: true, default: "Male" },
    purpose: { type: String, required: true, default: "Other" },
    test1: { type: String, required: true, default: " " },
    test2: { type: String, required: true, default: " " },
    test3: { type: String, required: true, default: " " },
    test4: { type: String, required: true, default: " " },
    test5: { type: String, required: true, default: " " },
    testPaid: { type: Boolean, required: true, default: false },
    testScore: { type: Number, required: true, default: 0 },
    isPrime: { type: Boolean, required: true, default: false },
    primeFrom: { type: Date },
    isFranchise: { type: Boolean, required: true, default: false },
    franchiseFrom: { type: Date },
    isManager: { type: Boolean, required: true, default: false },
    isSupport: { type: Boolean, required: true, default: false },
    isAdmin: { type: Boolean, required: true, default: false },
    coupon: { type: String, required: true, default: " " },
    image: { type: String, required: true, default: " " },
    deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

customerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
