const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true        
    },
    price:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        trim:true        
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    quantity:{
        type:Number,
        required:true
    },
    productPictures:[
        {img:{
            type:String
        }}
    ],
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            review:String
        }
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    updatedAt:{type:Date}
},{timestamps:true})


const Product =mongoose.model('Product',productSchema)

module.exports=Product