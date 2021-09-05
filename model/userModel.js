const mongoose = require('mongoose');
const schemaValidator = require('../helper/userSchemaValidator');
const constants = require('./../constants/constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: schemaValidator.validEmail,
            message: constants.EMAIL_INVALID
        },
        required: [ true, constants.EMAIL_REQUIRED ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, constants.PASSWORD_REQUIRED ],
        validate: {
            validator: schemaValidator.validatePasswordComplexity,
            message: constants.PASSWORD_COMPLEXITY
        },
        select: false
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    wrongPasswordAttemps: {
        type: Number,
        select: false,
        default: 0,
    },
    isBlocked: {
        type: Date,
        default: null,
        select: false
    }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;