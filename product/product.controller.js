import express from 'express';
import mongoose from 'mongoose';
import Yup from 'yup';
import isStudent from '../middleware/authentication.middleware.js';
import ProductTable from './product.model.js';
import { validateMongoIdFromReqParams } from '../middleware/validate.mongo.id.js';

const router = express.Router();

// add product
router.post(
  '/product/add',
  isStudent,
  async (req, res, next) => {
    // create schema
    const productValidationSchema = Yup.object({
      name: Yup.string().required().trim().max(155),
      brand: Yup.string().required().trim().max(155),
      price: Yup.number().required().min(0),
      quantity: Yup.number().required().min(1),
      category: Yup.string()
        .required()
        .trim()
        .oneOf([
          'grocery',
          'electronics',
          'electrical',
          'clothing',
          'kitchen',
          'kids',
          'laundry',
        ]),

      image: Yup.string().notRequired().trim(),
    });

    try {
      req.body = await productValidationSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async (req, res) => {
    // extract new product from req.body
    const newProduct = req.body;

    // add product
    await ProductTable.create(newProduct);

    return res.status(201).send({ message: 'Product is added successfully.' });
  }
);

// get product by id
router.get(
  '/product/detail/:id',
  isStudent,
  validateMongoIdFromReqParams,
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;

    // find product
    const product = await ProductTable.findOne({ _id: productId });

    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: 'Product does not exist.' });
    }

    return res
      .status(200)
      .send({ message: 'success', productDetails: product });
  }
);

// delete product by id

router.delete(
  '/product/delete/:id',
  isStudent,
  validateMongoIdFromReqParams,
  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;

    // find product
    // const product = await ProductTable.findOne({ _id: productId });
    const product = await ProductTable.findById(productId);

    if (!product) {
      return res.status(404).send({ message: 'Product does not exist.' });
    }

    await ProductTable.findByIdAndDelete(productId);
    // await ProductTable.deleteOne({ _id: productId });

    return res
      .status(200)
      .send({ message: 'Product is deleted successfully.' });
  }
);

// list products
router.post(
  '/product/list',
  isStudent,
  async (req, res, next) => {
    const paginationSchema = Yup.object({
      page: Yup.number().positive().integer().default(1),
      limit: Yup.number().positive().integer().default(10),
    });

    try {
      req.body = await paginationSchema.validate(req.body);
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
    next();
  },
  async (req, res) => {
    // extract page and limit from req.body
    const paginationData = req.body;

    const limit = paginationData.limit;
    const page = paginationData.page;

    const skip = (page - 1) * limit;

    const products = await ProductTable.aggregate([
      {
        $match: {},
      },

      { $skip: skip },
      { $limit: limit },
    ]);

    const totalItem = await ProductTable.find().countDocuments();

    const totalPage = Math.ceil(totalItem / limit);

    return res
      .status(200)
      .send({ message: 'success', productList: products, totalPage });
  }
);

router.put(
  '/product/edit/:id',
  isStudent,
  validateMongoIdFromReqParams,
  async (req, res, next) => {
    // create schema
    const productValidationSchema = Yup.object({
      name: Yup.string().required().trim().max(155),
      brand: Yup.string().required().trim().max(155),
      price: Yup.number().required().min(0),
      quantity: Yup.number().required().min(1),
      category: Yup.string()
        .required()
        .trim()
        .oneOf([
          'grocery',
          'electronics',
          'electrical',
          'clothing',
          'kitchen',
          'kids',
          'laundry',
        ]),

      image: Yup.string().notRequired().trim(),
    });

    try {
      req.body = await productValidationSchema.validate(req.body);
      next();
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },

  async (req, res) => {
    // extract product id from req.params
    const productId = req.params.id;

    // find product
    const product = await ProductTable.findOne({ _id: productId });

    // if not product, throw error
    if (!product) {
      return res.status(404).send({ message: 'Product does not exist.' });
    }

    // extract new values from req.body
    const newValues = req.body;

    await ProductTable.updateOne(
      { _id: productId },
      {
        $set: {
          name: newValues.name,
          brand: newValues.brand,
          price: newValues.price,
          quantity: newValues.quantity,
          category: newValues.category,
        },
      }
    );

    return res
      .status(200)
      .send({ message: 'Product is updated successfully.' });
  }
);

export { router as productController };