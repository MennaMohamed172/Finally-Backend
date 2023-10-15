const express = require('express')
const categoryControllers = require('../controllers/categoryControllers')

const router = express.Router()


router.post('/category', categoryControllers.addNewِCategory)
router.get('/category', categoryControllers.getAllElement)
router.get('/category/:id', categoryControllers.getElmenetById)
router.put('/category/:id', categoryControllers.updateById)
router.delete('/category/:id', categoryControllers.deletById)

module.exports = router