const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
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
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;