const express = require('express');
const { addUser, getUsers } = require('../controller/userController');
const router = express.Router();

router.route('/').post(addUser).get(getUsers);

module.exports = router;