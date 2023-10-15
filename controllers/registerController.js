// const User = require('../models/Register')
// // add new user
// const addNewUser= async function(req,res){
//   if(req.body.Password!=req.body.ConfirmPassword){
//     return res.status(400).json({message:"invalid password"})
//   }
//     try {
//         const user = new User(req.body)
//         const token = await user.generateToken()
//         await user.save()
//         res.status(200).json({user , token})
//     } catch (e) {
//       console.log(e);
//         res.status(400).send(e)
//     }
    
// }

// // Get user by id
// const getUserById= async function(req,res){
//   const _id = req.params.id
//   User.findById(_id).then ((user) => {
//       if(!user){
//         return  res.status(404).send('UNABLE TO FIND')
//       }
//       res.status(200).send(user)
//     }).catch ((e) => {
//       res.status(500).send(e)
//     })
// }

// // Get all user

// const getAllUsers=async function(req,res){
//     User.find((err, users) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(`Error fetching users: ${err}`);
//         } else {
//           console.log(`Found ${users.length} users`);
//           res.status(200).json(users);
//         }
//       });
// }

// // update user info by id

// const updateUserInfoById = async function(req,res){
//     try{
  
//         const updates = Object.keys (req.body)
//         console.log(updates)

//         const _id = req.params.id

//         const user = await User.findById (_id)
//         if(!user){
//             return res.status(404).send('No user is found')
//         }

//         updates.forEach((ele) => (user[ele] = req.body[ele]))

      
//        await user.save()


//         res.status(200).send(user)
//     }
//     catch(error){
//         res.status(400).send(error)
//     }
// }
// // delted user by id
    
// const deleteUserById = async function(req,res){
//   try {
//       const _id = req.params.id
//       const user = await User.findByIdAndDelete(_id)
//       if(!user) {
//          return res.status(404).send('UNABLE TO FIND USER')
//       }
//       res.status(200).send(user)
//  }
//  catch(e){
//      res.status(400).send(e)
//  }
// }
// module.exports={
//     deleteUserById,
//     addNewUser,
//     updateUserInfoById,
//     getAllUsers,
//     getUserById

// }

const User = require('../models/Register')
// add new user
const addNewUser= async function(req,res){
    try {
        const user = new User(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).json({user , token})
    } catch (e) {
      console.log(e);
        res.status(400).send(e)
    }
}

// Get user by id

const getUserById =async function(req,res){
    User.findById(req.params.userId, (err, user) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error fetching user: ${err}`);
        } else if (!user) {
          res.status(404).send(`User with id ${req.params.userId} not found`);
        } else {
          console.log(`Found user: ${user}`);
          res.status(200).json(user);
        }
      });
}

// Get all user

const getAllUsers=async function(req,res){
    User.find((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error fetching users: ${err}`);
        } else {
          console.log(`Found ${users.length} users`);
          res.status(200).json(users);
        }
      });
}

// update user info by id

const updateUserInfoById = async function(req,res){
    try{
  
        const updates = Object.keys (req.body)
        console.log(updates)

        const _id = req.params.id

        const user = await User.findById (_id)
        if(!user){
            return res.status(404).send('No user is found')
        }

        updates.forEach((ele) => (user[ele] = req.body[ele]))

      
       await user.save()


        res.status(200).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
}

// delete user by id

const deleteUserById =async function(req,res){
    User.findByIdAndRemove(req.params.userId, (err, deletedUser) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error deleting user: ${err}`);
        } else if (!deletedUser) {
          res.status(404).send(`User with id ${req.params.userId} not found`);
        } else {
          console.log(`Deleted user with id ${deletedUser._id}`);
          // res.send("deleted successfully")
          res.status(204).end();
        }
      });
    }

// login 

const adduserRegisteralready= async function(req,res){
    try{
        const user = await User.findByCredentials(req.body.Email,req.body.Password)
        const token = await user.generateToken()
        user.status="Online"
        user.save()
        res.status(200).send({user,token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

// logout

const deleteUser =async function(req,res){
    try {
        //take the token and  verify it 
        const {_id}=req.params
        // const {_id}=jwt.verify(token,"islam500")
        console.log(_id)
         const findUser=await User.findByIdAndUpdate(_id,{status:"Offline"},{new:true})
           res.status(200).send({findUser})
      } catch (e) {
          res.status(400).send(e)
      }
}
      

module.exports={
    deleteUserById,
    addNewUser,
    deleteUser,
    adduserRegisteralready,
    updateUserInfoById,
    getAllUsers,
    getUserById

}