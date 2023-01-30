const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel.js");

//Desc: Fetch all products
//Route: GET/api/products
//Access: Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = +req.query.pageNumber || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ deleted: false, ...keyword });
  const products = await Product.find({ deleted: false, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//Desc: Fetch all Manager products
//Route: GET/api/products/manager
//Access: Private / Manager
const getManagerProducts = asyncHandler(async (req, res) => {
  const allproducts = await Product.find({ deleted: false });

  const pageSize = 8;
  const page = +req.query.pageNumber || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ deleted: false, ...keyword });
  const products = await Product.find({ deleted: false, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), allproducts });
});

//Desc: Fetch all Franchise products
//Route: GET/api/products/franchise
//Access: Private / Franchise
const getFranchiseProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = +req.query.pageNumber || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            category: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ deleted: false, ...keyword });
  const products = await Product.find({ deleted: false, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//Desc: Fetch a single product
//Route: GET/api/products/:id
//Access: Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Delete product
//Route: PUT/api/products/:id/delete
//Access: Private / Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.deleted = true;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Create product
//Route: POST/api/products
//Access: Private / Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    pricePurchase: 0,
    customer: req.customer._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    description: "Sample Description",
    countInStock: 0,
    extra: false,
    numReviews: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//Desc: Update product
//Route: PUT/api/products/:id
//Access: Private / Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    category,
    price,
    pricePurchase,
    image,
    countInStock,
    extra,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;
    product.extra = extra;
    product.description = description;
    product.price = price;
    product.pricePurchase = pricePurchase;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Update Manager product
//Route: PUT/api/products/:id/manager
//Access: Private / Manager
const updateManagerProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    description,
    category,
    price,
    pricePurchase,
    image,
    countInStock,
    extra,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.brand = brand;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;
    product.extra = extra;
    product.description = description;
    product.price = price;
    product.pricePurchase = pricePurchase;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.customer.toString() === req.customer._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.customer.name,
      rating: +rating,
      comment,
      customer: req.customer._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//Desc: Top rated products
//Route: GET/api/products/top
//Access: Public
const topRatedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.json(products);
});

module.exports = {
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
};
