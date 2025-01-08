const express = require('express');
const { addUser } = require('../controller/userController');
const router = express.Router();

router.route('/').post(addUser);

module.exports = router;