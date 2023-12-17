const roleService = require('../roles.service');

const getRoles = async (req, res) => {
    const prisma = req.prisma;
    try {
        const data = await roleService.findAll(prisma);
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getRoles;