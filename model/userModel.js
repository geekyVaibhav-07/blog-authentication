const mongoose = require('mongoose');
const userSchemaMethods = require('./../helper/userSchemaMethod');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
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

userSchema.methods = {
    ...userSchema,
    ...userSchemaMethods
}

const User = mongoose.model('User', userSchema, 'users');


module.exports = User;