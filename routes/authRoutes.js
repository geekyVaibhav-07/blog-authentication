const { Response } = require('@geekcorp/express-utils');
const express = require('express');
const constants = require('../constants/constants');
const authController  =require('./../controller/authController');

const router = express.Router();

const sendAuthResponse = (req, res) => {
    res.status(200).json(new Response({
        message: constants.USER_AUTHENTICATED,
        data: [ {
            _id: req.user._id
        } ]
    }))
}

router.route('/')
    .post(authController.isAuthenticated, sendAuthResponse);

module.exports = router;