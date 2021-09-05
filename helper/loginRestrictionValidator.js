const getNewRestrictionTimer = ({ isBlocked, wrongPasswordAttempts }) => {
    if (wrongPasswordAttempts > 3) {
        // for every wrong password attemp or early retry, increase the restriction for the next 5 minutes
        return (isBlocked && isBlocked.getTime() || Date.now()) + 5*60*1000;
    }
    return null;
}

const checkIfLoginIsAllowed = ({ isBlocked }) => {
    if (isBlocked && isBlocked > Date.now()) {
        return false;
    }
    return true;
}

module.exports = { 
    getNewRestrictionTimer,
    checkIfLoginIsAllowed
};