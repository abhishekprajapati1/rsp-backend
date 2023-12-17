const { login, generateToken, setCookie } = require("../auth.service");

const loginUser = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;

    try {
        const user = await login(prisma, data);
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        let token = generateToken({ id: user.id, email: user.email, admin_id: user.admin_id });

        setCookie(res, { data: token, name: "auth_token" });
        res.status(200).json({ success: true, message: 'Logged in successfully.', token });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = loginUser;