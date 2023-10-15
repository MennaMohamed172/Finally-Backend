const mongoose=require("mongoose");
const validator = require ('validator')
const bcryptjs = require ('bcryptjs')
const jwt = require ('jsonwebtoken');
// const { string } = require("joi");
// const { USER_ROLE, ASSOCIATION_ROLE } = require("../constants/roles");
const adminSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    trim:true,

  },FirstName: {
      type: String,
      required: true
    },
    LastName: {
      type: String,
      required: true
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
    Password: {
      unique:true,
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value){
        let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        if(!password.test(value)){
            throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
        }
      }
    },
    Website:{
      type:String,
      trim:true,
          },
          Roles:{
            type: String,
            required:true,
            default : "users",
            enum:["users","Admin"]
          },
    tokens : [
      {
          type: String,
          required : true
      }
  ],

  })

//////////////////////////////////////////////////////////////////////////////////////
adminSchema.pre ("save" , async function ()  {
    const user = this   //  => Document 
  
    if (user.isModified('Password')) {
     
     user.Password = await bcryptjs.hash(user.Password, 8)
    //  user.ConfirmPassword = await bcryptjs.hash(user.ConfirmPassword, 8)
     
    }
  })

////////////////////////////////////////////////////////////////////////////////////////
adminSchema.methods.generateToken = async function () {
  const user = this 
  const token = jwt.sign ({_id:user._id.toString() } , "menna500")
  user.tokens = user.tokens.concat(token)
  await user.save()
  return token
}

//////////////////////////////////////////////////////////////////////////////////////////
//  hide private data 

adminSchema.methods.toJSON = function (){
   const user = this 

 //    convert doc to obj  = toObject 
   const userObject = user.toObject()

   delete userObject.Password
  //  delete userObject.tokens
   delete userObject.ConfirmPassword

   return userObject 
}

  
const Admin = mongoose.model( 'Admin' , adminSchema  )


module.exports = Admin
