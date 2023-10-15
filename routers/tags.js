const express = require('express')
const tagController = require('../controllers/tagController')
const router = express.Router()


router.post('/tags', tagController.addNewِtag)
router.get('/tags', tagController.getAllElement)
router.get('/tags/:id', tagController.getElmenetById)
router.put('/tags/:id', tagController.updateById)
router.delete('/tags/:id', tagController.deletById)

module.exports = router