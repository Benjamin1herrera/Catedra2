const jwt = require('jsonwebtoken');

const obtainIdJWT = (token) => {
    const secret = process.env.JWT_SECRET;
    const {id} = jwt.verify(token, secret);
    return id;
}

module.exports = obtainIdJWT