import mongoose from "mongoose";

//set schema/rule/structure
const productSchema = new mongoose.Schema({
    name:
    {
    type:String,
    required:true,
    trim:true,
    maxlenght:160,
    },
    price:{type:Number,
    required:true,
    min:0,
    },
    brand:
    {type:String,
    required:true,
    trim:true,
    maxlenght:150,
    },
    category:{
        type:String,
        required:true,
        trim:true,
        enum:["grocery","beauty","electronics","fashion","toys","shoes","sports","books","furniture","kitchen","appliances","others"],
        
    },
    image:{
        type:String,
        required:false,
        trim:true,
    
    },

    quantity:{
        type:Number,
        required:true,
        min:1,
    },

},
{
    timestamps:true,
})

//create model/tabel/collection
const ProductTable = mongoose.model("product", productSchema);
export default ProductTable;

//product
//_name
//name
//price
//brand
//image
//category
//quantity
//created_at
