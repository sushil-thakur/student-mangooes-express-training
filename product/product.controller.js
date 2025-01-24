import express from 'express';
import ProductTable from './product.model.js';
import  productValidationSchema  from './product.validation.js';
import isStudent from '../middleware/authentication.middleware.js';
import  validateMongoIdFromReqParams from '../middleware/validate.mongo.id.js';

const router =express.Router();


//sdd product
router.post("/product/add", isStudent,
    async(req, res, next)=>{
      

        try{
            req.body = await productValidationSchema.validate(req.body);
            next();
        }catch(error){
            return res.status(400).send({message:error.message});
        }
        //validate data
    
    },
    async(req,res)=>{
        //extract new product from req.body
        const newProduct = req.body;

        //add product to database
        await ProductTable.create(newProduct);
    return res.status(201).send({message:"product adding...."})
})


//delete product by id
// router.delete("/product/delete/:id",async(req,res)=>{
//     try{
//         const productId = req.params.id;
//         //check if the id is a valid mongodb object id
//         if(!mongoose.isValidObjectId(productId)){
//             return res.status(400).send({message:"invalid product id"});
//         }
//         //find the product by id
//         const product = await ProductTable.findById(productId);
//         //if product not found, return 404 error
//         if(!product){
//             return res.status(404).send({message:"product not found"});
//         }
//         //delete the product
//         await ProductTable.findByIdAndDelete(productId);
//         return res.status(200).send({message:"product deleted"});
//     }catch(error){
//         return res.status(500).send({message:"error during deletion",error:error.message});
//     }
// });

//get product by id
router.get("/product/:id",
    isStudent,
    validateMongoIdFromReqParams,
    async(req,res, next)=>{
    //extract product id from req.params
    const productId = req.params.id;
    const productIDIsvalid = mongoose.isValidObjectId(productId);
    if(!productIDIsvalid){
        return res.status(400).send({message:"invalid product id"});
    }
    next();
},
async(req,res)=>{
    //extract product id from req.params
    const productId = req.params.id;
    //find product by id
    const product = await ProductTable.findOne({_id:productId});
    //if product not found, return 404 error
    if(!product){
        return res.status(404).send({message:"product not found"});
    }
    await ProductTable
    return res.status(200).send({message:"success",productDetails:product});
});



//delete
router.delete("/product/delete/:id",isStudent, (req,res,next)=>{
    //extract id from req.params
    const productId = req.params.id;

    //check if the id is a valid mongodb object id
    const isValidId = mongoose.isValidObjectId(productId);
    //if not valid id, return 400 error
    if(!isValidId){
        return res.status(400).send({message:"invalid product id"});
    }
    next();
},
async(req,res)=>{
    //extract id from req.params
    const productId = req.params.id;
    //find product 
    //const product = await ProductTable.findOne({_id:productId});
    const product = await ProductTable.findById(productId);

    if(!product){
        return res.status(404).send({message:"product not found"});
    }

    await ProductTable.findByIdAndDelete(productId);
        //await ProductTable.deleteOne({_id:productId});
        return res.status(200).send({message:"product deleted"});
    });

    return res.status(200).send({message:"success",productDetails:product});

export {router as productController};
