import mongoose from 'mongoose';

const validateMongoIdFromReqParams = (req, res, next) => {
  // extract id from req.params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidId = mongoose.isValidObjectId(productId);

  // if not valid id , throw error
  if (!isValidId) {
    return res.status(400).send({ message: 'Invalid product id.' });
  }
  next();
};

export { validateMongoIdFromReqParams };