const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAddress.address",
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            payablePrice:{
                type:Number,
                required:true
            },
            purchaseQuantity:{
                type:Number,
                required:true
            }

        }
    ],
    paymentStatus:{
        type:String,
        enum:['pending','completed','cancelled','refund'],
        required:true
    },
    orderStatus:[
        {
            type:{
                type:String,
                enum:['ordered','packed','shipped','delivered'],
                default:'ordered'               
            },
            date:{
                type:Date
            },
            isCompleted:{
                type:Boolean,
                default:false
            }
        }
    ]
},{timestamps:true})

module.exports=mongoose.model('Order',orderSchema)