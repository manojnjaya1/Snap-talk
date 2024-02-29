const jwt = require('jsonwebtoken');
const Secret_key = process.env.SECRET_KEY;

// function to generate web tokens that expires in 30 days
const generateWebToken = (id)=>{
    return jwt.sign({id}, Secret_key, {
        expiresIn: '30d'
    })
}

module.exports = generateWebToken;