const roleService = require("../roles.service");

const createRole = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;
    const { admin_id } = req.user;

    try {
        const role = await roleService.create(prisma, data, admin_id);
        res.status(201).json({ success: true, message: '', data: role });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = createRole;