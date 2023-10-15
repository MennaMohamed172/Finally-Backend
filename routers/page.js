const express = require('express')
const pageControllers = require('../controllers/pageControllers')

const router = express.Router()

router.post('/page', pageControllers.addNewِPage)
router.get('/page', pageControllers.getAllElement)
router.get('/page/:id', pageControllers.getElmenetById)
router.put('/page/:id', pageControllers.updateById)
router.delete('/page/:id', pageControllers.deletById)

module.exports = router