const jwt = require("jsonwebtoken");
const { JWT_AUTH_TOKEN } = require("../config/env.config");

const protect =  async (req, res, next) => {
    try {
        const token = req.cookies.authentication_token;
        if (!token) {
            return res.status(401).json({message: "Not authorized"});
        }
        
        // verify token
        const decoded = jwt.verify(token, JWT_AUTH_TOKEN);
        
        // attach decoded to req.user
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Not authorized, token failed." });
    }
}

module.exports = { protect };
