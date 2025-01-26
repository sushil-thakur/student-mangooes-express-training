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

    router.post(
        '/product/list',
        isUser,
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
              return res.status(200).send({ message: 'success', products, totalItem });
            }
        );
      

//edit
    router.put("/product/edit/:id", isStudent,validateMongoIdFromReqParams,(req, res, next)=>{
        //create schema
         const productValidationSchema = Yup.object({
            name: Yup.string().required().max(160),
            price: Yup.number().required().min(0),
            brand: Yup.string().required().max(150),
            category: Yup.string().required().oneOf(["grocery", "beauty", "electronics", "fashion", "toys", "shoes", "sports", "books", "furniture", "kitchen", "appliances", "others"]),
            image: Yup.string().notRequired(),
            quantity: Yup.number().required().min(1),
        });
    async (req, res, next) => {
        try {
            req.body = await productValidationSchema.validate(req.body);
            next();
        } catch (error) {
            return res.status(400).send({message: error.message});
        }
    },
    async(req, res)=>{
        //extract product fromm req params
        const productId = req.params.id;
        //find product
        const product = await ProductTable.findOne({_id:productId});

        //if not product , throw error
        if(!product){
            return res.status(404).send({message:"product does not exist"});
        }
        //extract new value from req body
        const newValues = req.body;
        await ProductTable.updateOne(
            {_id:productId},
            {
                $set:{
                    name:newValues.name,
                    brand:newValues.brand,
                    price:newValues.price,
                    quantity:newValues.quantity,
                    category:newValues.category
                },
            }
        );
        return res.status(200)
        .send({message:"product is upsate sucessfully"})
    }
    
    }
);

export {router as productController};


export {router as productController};