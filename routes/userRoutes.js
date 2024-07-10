const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for user operations
router.post('/register',  userController.registerUser);
router.post('/login',  userController.loginUser);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.deleteFriend);

module.exports = router;