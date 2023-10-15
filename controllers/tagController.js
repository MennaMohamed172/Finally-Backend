const Tags = require('../models/tag')

// Get All Elemnts
const getAllElement= async function(req,res){
    Tags.find({}).then ((tags) =>{
        res.status(200).send(tags)
    }).catch((e) => {
        res.status(500).send(e)
    })
}

// Get elment by id

const getElmenetById= async function(req,res){
    const _id = req.params.id
    Tags.findById(_id).then ((tag) => {
        if(!tag){
          return  res.status(404).send('UNABLE TO FIND')
        }
        res.status(200).send(tag)
      }).catch ((e) => {
        res.status(500).send(e)
      })
}

// add new tag

const addNewِtag = async function(req,res){
console.log(req.body)

    const tag = new Tags (req.body)

    tag.save()
    .then ((tag) => {res.status(200).send(tag)})
    .catch((e)=>{ res.status(400).send(e)})
}



// Put to update data by id 

const updateById =async function(req,res){

    try {
        const _id = req.params.id 
        const tag = await Tags.findByIdAndUpdate (_id , req.body , {
           new : true,
           runValidators : true
        })
        if(!tag) {
           return res.status(404).send('No User Founded')
        }
        res.status(200).send(tag)
     }
     catch(error) {
        res.status(400).send(error)
     }
}

// delete by id

const deletById = async function(req,res){
    try {
        const _id = req.params.id
        const tag = await Tags.findByIdAndDelete(_id)
        if(!tag) {
           return res.status(404).send('UNABLE TO FIND USER')
        }
        res.status(200).send(tag)
   }
   catch(e){
       res.status(400).send(e)
   }
}

module.exports = {
    getAllElement,
    addNewِtag,
    getElmenetById,
    updateById,
    deletById

}