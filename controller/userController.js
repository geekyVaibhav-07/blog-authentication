const User = require('./../model/userModel');
const errorCatcher = require('./../helper/errorCatcher');;
const QueryBuilder = require('./../helper/queryBuilder');

const getUserById = async (_id) => {
    const queryBuilder = new QueryBuilder(User.find({ _id })).query;
    return await queryBuilder;
    
}

const updatedUser = async (req) => {
    const { _id, isBlocked, wrongPasswordAttemps } = req.user || {};
    const response = await User.updateOne({ _id }, { isBlocked, wrongPasswordAttemps });
    return response;

}

module.exports = {
    updatedUser: errorCatcher(updatedUser),
    getUserById: errorCatcher(getUserById),
}