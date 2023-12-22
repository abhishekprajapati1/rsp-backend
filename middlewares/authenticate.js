const { verifyToken } = require("../modules/auth/auth.service");

async function authenticate(req, res, next) {
    const token = req?.cookies?.token || req.headers["authorization"];
    if (!token)
        return res
            .status(400)
            .json({ success: false, message: "Unauthorized access !!" });

    try {
        const data = verifyToken(token);
        if (!data) throw new Error("Unauthorized access");
        req.user = data;
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: err.message, error: err });
    }
}
module.exports = authenticate;