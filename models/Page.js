const mongoose = require("mongoose");
const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlenght: 200,
    trim: true,
    required:true,
  },
   Phara: {
    type: String,
    required: true,
    trim:true,
  }
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;