const express=require('express')
const router=express.Router()
const {requireSignIn, userMiddleware}=require('../common-middleware')
const { addItemToCart } = require('../controller/cart')

router.post('/user/cart/addtocart',requireSignIn,userMiddleware,addItemToCart)

module.exports=router