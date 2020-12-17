const express = require('express');
const router = express.Router();

const adminsController = require('../controller/adminsController')

router.post('/signup', adminsController.signUp);
router.post('/login', adminsController.logIn);

module.exports = router