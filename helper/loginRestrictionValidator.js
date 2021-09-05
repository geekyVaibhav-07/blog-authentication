const getNewRestrictionTimer = ({ isBlocked, wrongPasswordAttemps }) => {
    if (wrongPasswordAttemps > 3) {
        // for every wrong password attemp or early retry, increase the restriction for the next 5 minutes
        return 5*60 + isBlocked;
    }
    return null;;
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