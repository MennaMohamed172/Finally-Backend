const Page = require('../models/Page')
// Get All Elemnts
const getAllElement=async function(req,res){
    Page.find({}).then ((pages) =>{
        res.status(200).send(pages)
    }).catch((e) => {
        res.status(500).send(e)
    })
}

// Get elment by id

const getElmenetById= async function(req,res){
    const _id = req.params.id
    Page.findById(_id).then ((page) => {
        if(!page){
          return  res.status(404).send('UNABLE TO FIND')
        }
        res.status(200).send(page)
      }).catch ((e) => {
        res.status(500).send(e)
      })
}

// add new page

const addNewِPage = async function(req,res){
    console.log(req.body)

    const pages = new Page (req.body)

    pages.save()
    .then ((page) => {res.status(200).send(page)})
    .catch((e)=>{ res.status(400).send(e)})
}



// Put to update data by id 

const updateById =async function(req,res){

    try {
        const _id = req.params.id 
        const page = await Page.findByIdAndUpdate (_id , req.body , {
           new : true,
           runValidators : true
        })
        if(!page) {
           return res.status(404).send('No User Founded')
        }
        res.status(200).send(page)
     }
     catch(error) {
        res.status(400).send(error)
     }
}

// delete by id

const deletById = async function(req,res){
    try {
        const _id = req.params.id
        const page = await Page.findByIdAndDelete(_id)
        if(!page) {
           return res.status(404).send('UNABLE TO FIND USER')
        }
        res.status(200).send(page)
   }
   catch(e){
       res.status(400).send(e)
   }
}

module.exports = {
    getAllElement,
    addNewِPage,
    getElmenetById,
    updateById,
    deletById

}