const slugify = require("slugify");
const Product = require('../models/product')


let count = 0;
const logicFunc=async(data,cateId)=>{

    for(let i=0; i<9; i++){
        let prod=data[i];
        let newProd = {
            category: cateId,
            name: prod.name,
            description: prod.features?prod.features:prod.description,
            price: prod.oldPrice,
            slug: slugify(prod.name),
            productPictures:[{
                img: prod.imgSrc,
            }],
            quantity: 15,
            createdBy: '612cf9eb352d0071a8eb83c9'
        }
        const product = new Product(newProd)
        product.save((error,product) => {
            if(error){
                console.log('error occured');
            }       
            count++;
            if(product){
                console.log(`${count} product added`);
            }
            
            if(count==9){
                console.log('complete whole task');
            }
        });

    }

    // data.forEach(prod => {
    //     let newProd = {
    //         category: '60d4b76b71f09d5b60964835',
    //         name: prod.name,
    //         description: prod.description,
    //         price: prod.price,
    //         slug: slugify(prod.name),
    //         productPictures:[{
    //             img: prod.imageSrc
    //         }],
    //         quantity: 15,
    //         createdBy: '612cf9eb352d0071a8eb83c9'
    //     }
    //     const product = new Product(newProd)
    //     product.save((error,product) => {
    //         if(error){
    //             console.log('error occured');
    //         }       
    //         count++;
    //         if(count===data.length){
    //             console.log('complete task');
    //         }
    //     });
    // });
    
}

module.exports=logicFunc;