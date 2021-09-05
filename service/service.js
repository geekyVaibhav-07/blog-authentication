const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY || 'savgdusa$%%467dsadsa';

const  encryptText = async (password) => {
    const encryption_salt = parseInt(process.env.SALT_ROUNDS) || 12;
    return await bcrypt.hash(password, encryption_salt);
};

const compareEncryptedText = async (plainText, hashedText) => {
    return await bcrypt.compare(plainText, hashedText);
};

const getAuthToken = async ({ _id }) => {
    const expiresIn = process.env.JWT_EXPIRES_IN || '90d';
    return await jwt.sign({ _id }, privateKey, { expiresIn });
}

const verifyAuthToken = async (token) => {
    return await jwt.verify(token, privateKey);
}

module.exports = {
    encryptText,
    compareEncryptedText,
    getAuthToken,
    verifyAuthToken
}



        