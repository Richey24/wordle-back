const jwt = require("jsonwebtoken");
const { promisify } = require("util")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "rich");

        // console.log(decoded )
        req.userData = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid token" })
    }
}; 