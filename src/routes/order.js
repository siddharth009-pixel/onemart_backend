const express= require('express')
const { requireSignIn, userMiddleware } = require('../common-middleware')
const { addOrder, getOrders } = require('../controller/order')
const router=express.Router()

router.post('/addOrder',requireSignIn,userMiddleware,addOrder)
router.get('/getOrders',requireSignIn,userMiddleware,getOrders)

module.exports=router