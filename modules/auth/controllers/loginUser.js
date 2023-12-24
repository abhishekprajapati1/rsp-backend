const AppError = require("../../../utils/AppError");
const { login, generateToken, setCookie } = require("../auth.service");

const loginUser = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;

    try {
        const user = await login(prisma, data);
        if (!user) {
            throw new AppError("Invalid credentials.", 400);
        }

        let token = generateToken({
            id: user.id,
            email: user.email,
            phone: user.phone,
            admin_id: user.admin_id,
            role: typeof user.role === 'string' ? user.role : user.role.title,
        });

        setCookie(res, { data: token, name: "auth_token" });
        res.status(200).json({ success: true, message: 'Logged in successfully.', token });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = loginUser;