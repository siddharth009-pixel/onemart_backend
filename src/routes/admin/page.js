const express=require('express')
const { requireSignIn, adminMiddleware } = require('../../common-middleware')
const { createPage, getPage } = require('../../controller/admin/page')
const router=express.Router()
const {upload}=require('../../common-middleware/index')


router.post('/page/create',requireSignIn,adminMiddleware,upload.fields([
    {name:'banners'},
    {name:'products'}
]),createPage)

router.get('/page/:category/:type',getPage)

module.exports=router