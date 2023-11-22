const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const { tryCatch } = require('../utils/tryCatch');

router
    .post("/sendOtp", tryCatch(authController.sendOtp))
    .post("/signUpWithOtp", tryCatch(authController.signUpWithOtp))
    .post("/loginWithOtp", tryCatch(authController.loginWithOtp))


exports.routes = router;