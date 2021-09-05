const service = require('../service/service');

async function comparePasswords(userPassword) {
    return await service.compareEncryptedText(userPassword, this.password)
}

module.exports = {
    comparePasswords
}