const express = require('express')
const router = express.Router()

const { getCategoryById, createCategory, getAllCategory,getCategory, updateCategory,deleteCategory } = require('../controllers/category')
const { isAuthenticated, isAdmin, isSignedIn } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')

router.param('userId', getUserById)
router.param('categoryId', getCategoryById)

//create route
router.post('/category/create/:userId', 
isSignedIn, 
isAuthenticated, 
isAdmin, 
createCategory 
)

//read routes
router.get('/category/:catergoryId', getCategory)
router.get('/categories', getAllCategory)

//update route
router.put('/category/:categoryId/:userId', 
isSignedIn, 
isAuthenticated, 
isAdmin, 
updateCategory 
)

//delete route
router.delete('/category/:categoryId/:userId', 
isSignedIn, 
isAuthenticated, 
isAdmin, 
deleteCategory 
)

module.exports = router