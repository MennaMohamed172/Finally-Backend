const Admin = require('../models/formuser')
// add new user
const addNewformUser= async function(req,res){
    try {
        const user = new Admin(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).json({user , token})
    } catch (e) {
      console.log(e);
        res.status(400).send(e)
    }
}

// Get user by id
const getformUserById= async function(req,res){
  const _id = req.params.id
  Admin.findById(_id).then ((user) => {
      if(!user){
        return  res.status(404).send('UNABLE TO FIND')
      }
      res.status(200).send(user)
    }).catch ((e) => {
      res.status(500).send(e)
    })
}

// Get all user

const getAllformUsers=async function(req,res){
  Admin.find((err, users) => {
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

const updateformUserInfoById = async function(req,res){
    try{
  
        const updates = Object.keys (req.body)
        console.log(updates)

        const _id = req.params.id

        const user = await Admin.findById (_id)
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

// const deleteUserById =async function(req,res){
//     User.findByIdAndRemove(req.params.userId, (err, deletedUser) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send(`Error deleting user: ${err}`);
//         } else if (!deletedUser) {
//           res.status(404).send(`User with id ${req.params.userId} not found`);
//         } else {
//           console.log(`Deleted user with id ${deletedUser._id}`);
//           // res.send("deleted successfully")
//           res.status(204).end();
//         }
//       });
//     }
    
const deleteformUserById = async function(req,res){
  try {
      const _id = req.params.id
      const user = await Admin.findByIdAndDelete(_id)
      if(!user) {
         return res.status(404).send('UNABLE TO FIND USER')
      }
      res.status(200).send(user)
 }
 catch(e){
     res.status(400).send(e)
 }
}
module.exports={
  deleteformUserById,
  addNewformUser,
  getformUserById,
  updateformUserInfoById,
    getAllformUsers

}