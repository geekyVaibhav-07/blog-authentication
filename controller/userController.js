const { errorCatcher } = require('@geekcorp/express-utils');
const User = require('./../model/userModel');
const QueryBuilder = require('./../helper/queryBuilder');

const getUserById = async (_id) => {
    const queryBuilder = new QueryBuilder(User.find({ _id })).query;
    return await queryBuilder;
    
}

const updateUser = async (req) => {
    const { _id, isBlocked, wrongPasswordAttempts } = req.user || {};
    const response = await User.updateOne({ _id }, { isBlocked, wrongPasswordAttempts });
    return response;

}

module.exports = {
    updateUser: errorCatcher(updateUser),
    getUserById: errorCatcher(getUserById),
}