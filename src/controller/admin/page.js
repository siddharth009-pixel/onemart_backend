const Page = require("../../models/page");
const Category = require("../../models/category");


exports.createPage = async (req, res) => {
    try {
        let { banners, products } = req.files;
        const { title, description, category, type } = req.body;
        if (banners && banners.length > 0) {
            req.body.banners = banners.map((banner, index) => {
                return ({
                    img: `${process.env.API}/public/${banner.filename}`,
                    navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
                })
            })
        } else {
            return []
        }

        if (products && products.length > 0) {
            req.body.products = products.map((product, index) => {
                return ({
                    img: `${process.env.API}/public/${product.filename}`,
                    navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
                })
            })
        } else {
            return []
        }
        const createdBy = req.user._id;

        const pageObject = {
            title,
            description,
            category,
            type,
            banners: req.body.banners,
            products: req.body.products,
            createdBy
        }

        const cate = await Page.findOne({ category: category })
        if (cate) {

            Page.findOneAndUpdate({ category: category }, pageObject, { new: true })
                .exec((err, page) => {

                    if (err) {
                        return res.status(400).send('error')
                    }
                    if (page) {
                        return res.status(201).send({ page: page })
                    }
                })
        } else {

            const page = new Page(pageObject)
            page.save((err, page) => {
                if (err) {
                    return res.status(400).send({ error: err })
                }
                if (page) {
                    return res.status(201).send({ page: page })
                }
            })

        }
    } catch (err) {
        console.log(err);
    }

}

exports.getPage = (req, res) => {
    const { category, type } = req.params
    console.log(category);
    if (type == "page") {
        Page.findOne({ category: category })
            .exec((error, page) => {
                if (error) {
                    return res.status(400).send({ error: error })
                }
                if (page) {
                    return res.status(200).send({ page: page })
                }
            })
    }
}