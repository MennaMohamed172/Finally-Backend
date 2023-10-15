const Category = require("../models/category")
// const Artical = require("../models/artical")

const getAllCategory =async (req , res) => {
    const Categories = await Category.find()
    res.status(200).json(Categories)
}

module.exports = {

    getAllCategory
}