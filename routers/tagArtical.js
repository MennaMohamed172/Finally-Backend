const express = require('express')
const tagArticalController = require('../controllers/tagArticalController')
const router = express.Router()
// router.get('/category/artical',ArticalCategoryController.getArticalForCategory)
router.get('/AllTag', tagArticalController.getAllTags)

module.exports = router