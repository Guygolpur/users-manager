const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const usersController = require('../controller/usersController')

router.post('/users-list', auth, usersController.addNewUser);
router.get('/users-list', auth, usersController.getUsers);
router.get('/users-list/:userID', auth, usersController.getUserByID);
router.put('/users-list/:userID', auth, usersController.updateUser);
router.delete('/users-list/:userID', auth, usersController.deleteUser);

module.exports = router