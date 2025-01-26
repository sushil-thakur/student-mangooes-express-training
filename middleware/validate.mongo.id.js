import mongoose from "mongoose";
const validateMongoIdFromReqParams = (req, res, next) => {
    //extract id from req.params
    const productId = req.params.id;

    //check from mongo id validity
    const isValidId = mongoose.isValidObjectId(productId);

    //if not valid id, return 400 error
    if (!isValidId) {
        return res.status(400).send({ message: "invalid product id" });
    }
    next();
};
export  default {validateMongoIdFromReqParams};