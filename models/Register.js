// const mongoose=require("mongoose");
// const validator = require ('validator')
// const bcryptjs = require ('bcryptjs')
// const jwt = require ('jsonwebtoken');
// // const { string } = require("joi");
// const { PATIENT_ROLE, Receptionist_ROLE } = require("../constants/roles");
// const userSchema = new mongoose.Schema({
//   UserName: {
//     type: String,
//     required: true,
//     trim:true,

//   },
//     Email : {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase : true,
//       unique:false,
//       validate(val){
//           if(!validator.isEmail(val)){
//               throw new Error ('Email is INVALID')
//           }
//       }
//   },
//     Password: {
//       unique:true,
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//       validate(value){
//         let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
//         if(!password.test(value)){
//             throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
//         }
//       }
//     },
//     ConfirmPassword:{
//       unique:true,
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 8,
//       validate(value){
//         let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
//         if(!password.test(value)){
//             throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
//         }
//       }
//     },
//     tokens : [
//       {
//           type: String,
//           required : true
//       }
//     ],
//     role:{
//       type: String,
//       required:true,
//       default : PATIENT_ROLE,
//       enum:[PATIENT_ROLE,Receptionist_ROLE]
//     },
//     Gender:{
//       type: String,
//       // required:true,
//       enum:["Male","Female"]
//     },
//     tokens : [
//       {
//           type: String,
//           required : true
//       }
//     ]
//   })

// //////////////////////////////////////////////////////////////////////////////////////
// userSchema.pre ("save" , async function ()  {
//     const user = this   //  => Document 
  
//     if (user.isModified('Password')) {
     
//      user.Password = await bcryptjs.hash(user.Password, 8)
//      user.ConfirmPassword = await bcryptjs.hash(user.ConfirmPassword, 8)
     
//     }
//   })
// //////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////
// userSchema.methods.generateToken = async function () {
//   const user = this 
//   const token = jwt.sign ({_id:user._id.toString() } , "menna500")
//   user.tokens = user.tokens.concat(token)
//   await user.save()
//   return token
// }

// //////////////////////////////////////////////////////////////////////////////////////////
// //  hide private data 

// userSchema.methods.toJSON = function (){
//    const user = this 

//  //    convert doc to obj  = toObject 
//    const userObject = user.toObject()

//    delete userObject.Password
//   //  delete userObject.tokens
//    delete userObject.ConfirmPassword

//    return userObject 
// }

  
// const User = mongoose.model( 'User' , userSchema  )


// module.exports = User

const mongoose=require("mongoose");
const validator = require ('validator')
const bcryptjs = require ('bcryptjs')
const jwt = require ('jsonwebtoken')
const { PATIENT_ROLE,Receptionist_ROLE} = require("../constants/roles");
const userSchema = new mongoose.Schema({
  UserName: {
        type: String,
        required: true,
        trim:true,
    
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
        ConfirmPassword:{
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
        tokens : [
          {
              type: String,
              required : true
          }
        ],
        role:{
          type: String,
          required:true,
          default : PATIENT_ROLE,
          enum:[PATIENT_ROLE,Receptionist_ROLE]
        },
        Gender:{
          type: String,
          // required:true,
          enum:["Male","Female"]
        },
        tokens : [
          {
              type: String,
              required : true
          }
        ]
})

//////////////////////////////////////////////////////////////////////////////////////
userSchema.pre ("save" , async function ()  {
    const user = this   //  => Document 
  
    if (user.isModified('Password')) {
     
     user.Password = await bcryptjs.hash(user.Password, 8)
    }
  })


///////////////////////////////////////////////////////////////////////////

// Login 

userSchema.statics.findByCredentials = async (Email,Password) =>{
  
    const user = await User.findOne({Email:Email})
    if(!user){
        throw new Error('Unable to login')
    }
   
    const isMatch = await bcryptjs.compare(Password,user.Password)
  
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}



////////////////////////////////////////////////////////////////////////////////////////
userSchema.methods.generateToken = async function () {
  const user = this 
  const token = jwt.sign ({_id:user._id.toString() } , "drugfast105")
  user.tokens = user.tokens.concat(token)
  await user.save()
  return token
}

//////////////////////////////////////////////////////////////////////////////////////////
//  hide private data 

userSchema.methods.toJSON = function (){
   const user = this 

 //    convert doc to obj  = toObject 
   const userObject = user.toObject()

   delete userObject.Password
   delete userObject.tokens
  //  delete userObject.ConfirmPassword

   return userObject 
}

  
const User = mongoose.model( 'User' , userSchema  )


module.exports = User