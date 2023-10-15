const Book = require('../models/Book')
const getAllElement=async function(req,res){
  Book.find({}).then ((books) =>{
        res.status(200).send(books)
    }).catch((e) => {
        res.status(500).send(e)
    })
}

const getElmenetById= async function(req,res){
    const _id = req.params.id
    Book.findById(_id).then ((book) => {
        if(!book){
          return  res.status(404).send('UNABLE TO FIND')
        }
        res.status(200).send(book)
      }).catch ((e) => {
        res.status(500).send(e)
      })
}

// Book Now

const BookNow= async function(req,res){
    console.log(req.body)
    const book = new Book (req.body)
    book.save()
    .then ((book) => {res.status(200).json({ message: 'Booked successfully', book})})
    .catch((e)=>{ res.status(400).send(e)})
}
const updateBookById =async function(req,res){
  try {
      const _id = req.params.id 
      const book = await Book.findByIdAndUpdate (_id , req.body , {
         new : true,
         runValidators : true
      })
      if(!book) {
         return res.status(404).send('No User Founded')
      }
      res.status(200).send(book)
   }
   catch(error) {
      res.status(400).send(error)
   }
}
const deletById = async function(req,res){
  try {
      const _id = req.params.id
      const book = await Book.findByIdAndDelete(_id)
      if(!book) {
         return res.status(404).send('UNABLE TO FIND USER')
      }
      res.status(200).send(book)
 }
 catch(e){
     res.status(400).send(e)
 }
}

module.exports = {
    getAllElement,
    BookNow,
    getElmenetById,
    updateBookById,
    deletById,
}