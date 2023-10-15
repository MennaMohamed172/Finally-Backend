const Category = require('../models/category')

// Get All Elemnts
const getAllElement= async function(req,res){
    Category.find({}).then ((category) =>{
        res.status(200).send(category)
    }).catch((e) => {
        res.status(500).send(e)
    })
}

// Get elment by id

const getElmenetById= async function(req,res){
    const _id = req.params.id
    Category.findById(_id).then ((category) => {
        if(!category){
          return  res.status(404).send('UNABLE TO FIND')
        }
        res.status(200).send(category)
      }).catch ((e) => {
        res.status(500).send(e)
      })
}

// add new category
const addNewِCategory= async function(req,res){
console.log(req.body)

    const category = new Category (req.body)

    category.save()
    .then ((category) => {res.status(200).send(category)})
    .catch((e)=>{ res.status(400).send(e)})
}

// Put to update data by id 

const updateById =async function(req,res){

    try {
        const _id = req.params.id 
        const category = await Category.findByIdAndUpdate (_id , req.body , {
           new : true,
           runValidators : true
        })
        if(!category) {
           return res.status(404).send('No User Founded')
        }
        res.status(200).send(category)
     }
     catch(error) {
        res.status(400).send(error)
     }
}

// delete by id

const deletById = async function(req,res){
    try {
        const _id = req.params.id
        const category = await Category.findByIdAndDelete(_id)
        if(!category) {
           return res.status(404).send('UNABLE TO FIND USER')
        }
        res.status(200).send(category)
   }
   catch(e){
       res.status(400).send(e)
   }
}

module.exports = {
    getAllElement,
    addNewِCategory,
    getElmenetById,
    updateById,
    deletById

}