const express = require('express')
const BookController = require('../controllers/BookController')
const auth = require('../middleware/auth')
const checkRole = require("../middleware/role.js")
const { PATIENT_ROLE } = require('../constants/roles')
const router = express.Router()
//routers for each function that found in BookControllers in controllers
// router.post('/Book',BookController.BookNow)
// router.get('/Book',BookController.getAllElement)
// router.get('/Book/:id', BookController.getElmenetById)
// router.put('/Book/:id',BookController.updateBookById)
// router.delete('/Book/:id', BookController.deletById)
// test 
router.post('/Book', auth,checkRole(PATIENT_ROLE),BookController.BookNow)
router.get('/Book', auth,BookController.getAllElement)
router.get('/Book/:id', auth, BookController.getElmenetById)
router.put('/Book/:id', auth, BookController.updateBookById)
router.delete('/Book/:id', auth, BookController.deletById)
module.exports = router