const express=require('express')
const router=express.Router()
const { requireSignIn, adminMiddleware } = require('../common-middleware')
// const { createCategory, getCategories } = require('../controller/category')
const multer=require('multer')
const path=require('path')
const shortid=require('shortid')
const { createProduct, getProductsBySlug, getProductDetailsById } = require('../controller/product')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload=multer({storage})

router.post('/product/create',requireSignIn,adminMiddleware,upload.array('productPictures'),createProduct)
router.get('/products/:slug',getProductsBySlug)
router.get('/:product/:productId',getProductDetailsById)
// router.get('/category/getcategory',getCategories)


module.exports=router