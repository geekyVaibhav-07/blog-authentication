const User = require('./../model/userModel');
const errorCatcher = require('./../helper/errorCatcher');
const Response = require('./../helper/response');
const constants = require('../constants/constants');
const QueryBuilder = require('./../helper/queryBuilder');
const service = require('./../service/service');
const AppError = require('./../helper/appError');
const userController = require('./userController');
const loginRestrictionValidator = require('./../helper/loginRestrictionValidator');

const invalidAttempt = async (req, res, key) => {
    const {
        wrongPasswordAttempts,
        isBlocked
    } = req.user;

    req.user.wrongPasswordAttempts = wrongPasswordAttempts + 1;
    req.user.isBlocked = loginRestrictionValidator.getNewRestrictionTimer({
        isBlocked,
        wrongPasswordAttempts: wrongPasswordAttempts + 1
    });
    await updateUserLoginStatus(req);
    res.status(200).json(new Response({
        status: 0,
        message: key
    }));
}

const updateUserLoginStatus = (req) => {
    userController.updateUser(req);
}

const setAuthToken = async (req, res, next) => {
    const { user: { _id } = {} } = req;
    const token = await service.getAuthToken({ _id });
    if (!token) {
        next(new AppError({
            error: constants.AUTHTOKEN_ERROR,
            statusCode: 500 
        }))
    }
    res.cookie('authToken', token, { expires: new Date(Date.now() + 90*24*60*60*1000), httpOnly: true });
    res.status(200).json(new Response({
        message: constants.USER_AUTHENTICATED,
        data: [ {
            _id: req.user._id
        } ]
    }));
}

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body || {};
    const query = { email };
    const queryBuilder = new QueryBuilder(User.find(), query).filter().select([ 'password', 'wrongPasswordAttempts', 'isBlocked' ]).query;
    const user = await queryBuilder;
    if (user.length !== 1) {
        res.status(200).json(new Response({
            status: 0,
            message: constants.USER_NOTFOUND
        }))
    } else {
        req.user = user[0];
        if (await user[0].comparePasswords(password)) {
            if (loginRestrictionValidator.checkIfLoginIsAllowed(req.user)) {
                req.user.wrongPasswordAttempts = 0;
                req.user.isBlocked = null;
                updateUserLoginStatus(req);
                req.user = user[0];
                next();
            } else {
                await invalidAttempt(req, res, constants.EARLY_ATTEMPT)
            }
            
        } else {
            await invalidAttempt(req, res, constants.PASSWORD_INCORRECT)
        }
    }
}

const isAuthenticated = async (req, res, next) => {
    const { authToken } = req.cookies;
    const decodedToken = await service.verifyAuthToken(authToken);
    const user = await userController.getUserById(decodedToken._id);
    if (user.length !== 1) {
        res.status(401).json(new Response({
            status: 0,
            message: constants.USER_NOTFOUND
        }))
    } else {
        req.user = user[0];
        next();
    }
    
}

module.exports = {
    authenticateUser: errorCatcher(authenticateUser),
    setAuthToken: errorCatcher(setAuthToken),
    isAuthenticated: errorCatcher(isAuthenticated)
}