const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router
    .post("/sendOtp", authController.sendOtp)
    .post("/signUpWithOtp", authController.signUpWithOtp)
    .post("/loginWithOtp", authController.loginWithOtp)


exports.routes = router;