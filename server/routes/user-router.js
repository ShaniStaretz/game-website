const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

//all the CRUD operations for the REST endpoints
router.post('/user', UserCtrl.createUser)
router.put('/user/:id', UserCtrl.updateUser)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/getuser/:email', UserCtrl.getUserByName)
router.get('/users', UserCtrl.getUsers)
router.get('/addimg/:email/:imgName', UserCtrl.addImageToUser)
router.get('/addfavorite/:email/:favoritId', UserCtrl.addToUserFavorites)
router.get('/removefavorite/:email/:favoritId', UserCtrl.removeFromUserFavorites)
router.get('/getfavorites/:email', UserCtrl.getUserFavorites)
router.get('/updateUserName/:email/:name', UserCtrl.updateUserName)

module.exports = router