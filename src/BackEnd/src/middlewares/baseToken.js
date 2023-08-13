const jwt = require('jsonwebtoken');

// create a new JWT based on the provided payload data
const parseToken = (data) => {
    // jwt.sign(): generates a new JWT
    // data: payload data that will be included in the token
    // bimat: the secret key used to sign the token
    //algorithm....10y: additional options for token, specifying the hashing algorithm 'HS256' and token's expiration time (10 years)
    let token = jwt.sign({ data }, "bimat", { algorithm: 'HS256', expiresIn: "10y" });
    return token;
}

//verify the validity of a given JWT
const checkToken = (token) => {
    try {
        let checkT = jwt.verify(token, "bimat");
        if (checkT) {
            return { checkData: true, messagse: "" };
        } else {
            return { checkData: false, messagse: "Token không hợp lệ" };
        }
    } catch (error) {
        return { checkData: false, message: error.message };
    }
}

// protect routes that require authentication. Verifies token and allows or denies access based on the result of verification 
const verifyToken = (req, res, next) => {
    const { token } = req.headers;
    const verifyToken = checkToken(token);
    if (verifyToken.checkData) {
        next();
    } else {
        res.status(401).send(verifyToken.message);
    }
}

const clearLocalStorage = (name) => {
    localStorage.removeItem(name);
}

module.exports = { parseToken, checkToken, verifyToken, clearLocalStorage }