const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
    Name : {
    type: String,
    maxlenght: 200,
    trim: true,
    required:true,
  },
  permalink  : {
    type: String,
    trim: true,
    required:true,
  },
  
  Description: {
    type: String,
    required: true,
    trim:true,
  },
    // id of Artical as foreign key(FK)
    tagArtical : {
      type:mongoose.Schema.Types.ObjectId,
      required:true,
      ref:'Artical'
    }
});

const Tags = mongoose.model("Tags", tagSchema);

module.exports = Tags;