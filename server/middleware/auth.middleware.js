const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.get("secretKey"));
        if (!token) {
            return res.status(401).json({ message: "Auth error" });
        }
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Auth error" });
    }
};
