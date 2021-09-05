const express = require('express');
const authController  =require('./../controller/authController');

const router = express.Router();

router.route('/')
    .post(authController.authenticateUser, authController.setAuthToken);

module.exports = router;
