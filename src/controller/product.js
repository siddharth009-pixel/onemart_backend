const slugify = require("slugify");
const Product = require("../models/product")


exports.createProduct=(req,res)=>{
    
    const {name,description,offer,quantity,category,price}=req.body;

    let productPictures=[] 
    if(req.files.length>0){
        productPictures=req.files.map(file=>{
            return { img : file.filename }
        })
    }
    
    const product=new Product({
        name,
        slug:slugify(name),
        price,
        description,
        offer,
        productPictures,
        quantity,
        category,
        createdBy:req.user._id
    })
    
    product.save((err,product)=>{
        if(err){
            return res.status(400).send(err)
        }
        if(product){
            return res.status(200).send(product)
        }
    })

}