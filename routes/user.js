const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { validateToken } = require('../configuration/token');


router
    .get('/user', validateToken, userController.getUser)

exports.routes = router;