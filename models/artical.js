const mongoose = require("mongoose");
const articalSchema = new mongoose.Schema({
  Title: {
    type: String,
    trim: true,
    required:true,
  },
  subtitle : {
    type: String,
    trim: true,
    required:true,
  },
  
  Phara: {
    type: String,
    trim:true,
  },
  // id of category as foreign key(FK)
  categoryArtical : {
    type:mongoose.Schema.Types.ObjectId,
    // required:true,
    ref:'Category'
  },
  isDraft:{
    type: Boolean,
  },
  deletedAt:{
    type:Date
  },
  isTrashed:{
    type:Boolean
  } ,
});

const Artical = mongoose.model("Artical", articalSchema);

module.exports = Artical;
