const express = require('express')
const Role = require('../models/Role')
const auth = require('../middleware/auth')
const router = express.Router()
const roleController = require("../controllers/RoleControllers")


router.post('/role', auth, async (req, res) => {
    await roleController.setNewRole(req, res);
});


router.post('/role',auth  ,async (req, res) => {
    await roleController.getAllRoles(req, res);
});

router.post('/role/:id',  auth,async (req, res) => {
    await roleController.getRoleById(req, res);
});

router.post('/role/:id',  auth,async (req, res) => {
    await roleController.updateRoleById(req, res);
});

router.post('/role/:id',  auth,async (req, res) => {
    await roleController.deleteRoleById(req, res);
});


module.exports = router 