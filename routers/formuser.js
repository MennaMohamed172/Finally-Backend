const express = require('express')
const formuserControllers = require('../controllers/formuserControllers')

const router = express.Router()


router.post('/user', formuserControllers.addNewformUser)
router.get('/user', formuserControllers.getAllformUsers)
router.get('/user/:id', formuserControllers.getformUserById)
router.put('/user/:id', formuserControllers.updateformUserInfoById)
router.delete('/user/:id', formuserControllers.deleteformUserById)
module.exports = router