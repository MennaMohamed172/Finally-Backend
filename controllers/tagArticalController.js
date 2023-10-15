// const Artical = require("../models/artical")
// const Tags = require("../models/tag")

// const getTagForArtical = async (req , res ) => {
//     // we want to get the donations for the current logged in association
//     // the association is a normal user so we can get the asscciation like so
//     const total = req.user
//     const { _id } = total

//     const tag = await Tags.where({total: _id})

//     res.json(tag)
// }

// module.exports = {
//     getTagForArtical
// }

const Tags = require("../models/tag")
// const Artical = require("../models/artical")

const getAllTags =async (req , res) => {
    const tags = await Tags.find()
    res.status(200).json(tags)
}

module.exports = {

    getAllTags
}

