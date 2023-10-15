// const string = require("@hapi/joi/lib/types/string");
const mongoose = require("mongoose");
const validator = require ('validator')
const bookSchema = new mongoose.Schema({
  FullName: {
    type: String,
    trim: true,
    required:true,
  },
  PhoneNumber : {
    type: Number,
    trim: true,
    required:true,
  },
  
  SelectSpecialty:{
    type: String,
    required:true,
    enum:[" Vision correction","Cataract","Glaucoma (intraocular pressure)","Retina (retinal and laser injections)","Children's eyes","Strabismus","others"]
  },
  EnterDate :{
    type:Date,
    required:true,
  },
  Email : {
    type: String,
    required: true,
    trim: true,
    lowercase : true,
    unique:false,
    validate(val){
        if(!validator.isEmail(val)){
            throw new Error ('Email is INVALID')
        }
    }
},
Message:{
  type:String,
  trim:true,
}
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
