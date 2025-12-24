const jwt = require("jsonwebtoken");
const { JWT_AUTH_TOKEN } = require("../config/env.config");

const protect =  async (req, res, next) => {
    try {
        const token = req.cookies.authentication_token;
        if (!token) {
            // redirect to login if no token
            return res.redirect("/login");
        }
        
        // verify token
        const decoded = jwt.verify(token, JWT_AUTH_TOKEN);
        
        // attach decoded to req.user
        req.user = decoded;
        next();
    } catch (err) {
        // redirect to login if failed to verify token
        return res.redirect("/login");
    }
}

module.exports = { protect };
