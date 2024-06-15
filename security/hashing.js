const bcrypt = require('bcrypt');
const saltRounds = 14;

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw error
    } 
};


const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (err) {
        throw err
    }
};

module.exports = { hashPassword, comparePassword };
