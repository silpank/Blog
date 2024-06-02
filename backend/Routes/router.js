const express = require('express')

const userController = require('../Controllers/userController')

const contentSchema =require('../Controllers/contentController')

const jwtMiddleware = require('../Middlewares/jwtMiddleware')

//create a router object of express to define a path
const router = new express.Router()

const multer = require('../Middlewares/mult')

//register API path
router.post('/register', userController.register)

//login API path
router.post('/login', userController.login)


//New post API path
router.post('/newPost',jwtMiddleware, multer.upload.single('image'), contentSchema.newPost)

//New Comment path
router.post('/:postId/newComment',jwtMiddleware,contentSchema.newComment)

//All Post path
router.get('/allPosts',jwtMiddleware,contentSchema.getAllPosts)

router.get('/getPost/:postId', jwtMiddleware, contentSchema.getPost)

//Add Like
router.post('/:postId/addLike',jwtMiddleware,contentSchema.addLike)

router.post('/:postId/removeLike', jwtMiddleware, contentSchema.removeLike)

router.patch('/addUserDetails', jwtMiddleware, multer.upload.single('image'), userController.addDetails)

module.exports = router 