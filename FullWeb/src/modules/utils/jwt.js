const jwt = require('jsonwebtoken');
const config = require('../../config/config.app');

module.exports = () => {

    function sign(user) {
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            password: user.password
        }, config.jwt.privatekey, {
            expiresIn: config.jwt.expiresIn
        });

        return token;
    }

    function verify(token){
        const decoded = jwt.verify(token, config.jwt.privatekey);
        return decoded;
    }

    return {
        sign,
        verify
    }
}