import express from 'express';
import ProductTable from './product.model.js';
import  productValidationSchema  from './product.validation.js';

const router =express.Router();


//sdd product
router.post("/product/add",
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

export {router as productController};

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
router.get("/product/:id",async(req,res, next)=>{
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
    return res.status(200).send({message:"success",productDetails:product});
});
