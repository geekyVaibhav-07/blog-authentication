const filterUndefined = (dataObject) => {
    const filterdObject = {
        ...dataObject
    };
    Object.keys(filterdObject).forEach((key) => {
        if (filterdObject[key] === undefined) {
            delete filterdObject[key];
        }
    });
    return filterdObject;
}

module.exports = {
    filterUndefined
}