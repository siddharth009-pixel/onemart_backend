const express=require('express')
const { requireSignIn, userMiddleware } = require('../common-middleware')
const { addAddress, getAddress } = require('../controller/address')
const router=express.Router()


router.post('/user/address/create',requireSignIn,userMiddleware,addAddress)
router.get('/user/address/getAddress',requireSignIn,userMiddleware,getAddress)

module.exports=router