const express=require('express')
const router=express.Router()
const {requireSignIn, userMiddleware, adminMiddleware}=require('../common-middleware')
const { addItemToCart, getCartItems } = require('../controller/cart')

router.post('/user/cart/addtocart',requireSignIn,userMiddleware,addItemToCart)
router.get('/user/cart/getcartitems',requireSignIn,userMiddleware,getCartItems)


module.exports=router