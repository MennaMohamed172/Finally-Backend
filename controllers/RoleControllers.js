
const Role = require('../models/Role')



////////////// post role ////////////
const setNewRole = async(req,res)=>{
    try{
       
        const role = new Role({...req.body , owner : req.user._id})
        await role.save()
        res.status(200).send(role)
    }
    catch(error){
        res.status(400).send(error.message)
    }

}
///////////////// get all roles /////////////////////
const getAllRoles =  async(req,res)=>{
    try{
       

        await req.user.populate('roles')
        res.status(200).send(req.user.roles)
    }
    catch(error){
        res.status(400).send(error.message)
    }
}
///////////// get role by id /////////////////////
const getRoleById =  async(req , res)=>{
    try{
    
        const _id = req.params.id
        const  role = await Role.findOne({_id, owner : req.user._id})
        if(!role){
            return res.status(404).send('this role is no owned for you ')
        }
        await role.populate('owner')
        res.send(role)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
////////////////////// patch role by using id ///////////
const updateRoleById =  async(req , res)=>{
    try{
        const _id = req.params.id
       
        const role= await Role.findOneAndUpdate({_id , owner : req.user._id}, req.body , {
            new : true,
            runValidators : true
        })
        if(!role){
            return res.status(404).send('no role')
        }
        res.send(role)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}
//////////////////// delete role by using id //////////////
const deleteRoleById = async(req , res)=>{
    try{
        const _id = req.params.id
   
             const role = await Role.findOneAndDelete({_id , owner : req.user._id})
        if(!role){
            res.status(404).send('No task is found')
        }
        res.status(200).send(role)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

module.exports={
    setNewRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
}