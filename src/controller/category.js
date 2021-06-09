const Category = require('../models/category')
const slugify=require('slugify')

function sortCategories(categories,parentId=null){

    let categoryList=[]
    let category;
    if(parentId==null){
        category=categories.filter( cat => cat.parentId==undefined)
    }else{
        category=categories.filter( cat => cat.parentId==parentId)
    }

    for(let cate of category){
        categoryList.push({
            _id:cate._id,
            name:cate.name,
            slug:cate.slug,
            children:sortCategories(categories,cate._id)
        })
    }

    return categoryList;
}

exports.createCategory=(req,res)=>{

    const catObject={
        name:req.body.name,
        slug:slugify(req.body.name)
    }

    if(req.file){
        catObject.categoryImage=(process.env.API + '/public/' + req.file.filename)
    }

    if(req.body.parentId){
        catObject.parentId=req.body.parentId
    }

    const cat=Category(catObject)
    cat.save((err,category)=>{
        if(err){ return res.status(400).json(err)}
        if(category) {
            return res.status(201).json({category})
        }})
}

exports.getCategories=async (req,res)=>{

    await Category.find({})
        .then((category)=>{
            const categoryList=sortCategories(category);
            res.status(200).send({categoryList})
        })
        .catch((err)=>{
            res.send(err);
        })
}

// (err,categories)=>{
//     if(err) return res.status(400).send(err)
//     if(categories) return res.status(200).send(categories)
// }

