const userService = require("../users.service");

const createUser = async (req, res) => {
    const prisma = req.prisma;
    const { admin_id } = req.user;
    const data = req.body;

    try {
        const user = await userService.create(prisma, data, admin_id);
        res.status(201).json({ success: true, message: 'User created successfully', data: user });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = createUser;