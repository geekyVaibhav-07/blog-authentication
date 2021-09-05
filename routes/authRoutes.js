const express = require('express');
const constants = require('../constants/constants');
const authController  =require('./../controller/authController');

const router = express.Router();

const sendAuthResponse = (req, res) => {
    res.status(200).json(new Response({
        message: constants.USER_AUTHENTICATED
    }))
}

router.route('/')
    .post(authController.isAuthenticated, sendAuthResponse);

module.exports = router;