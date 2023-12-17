const AppError = require('../../../utils/AppError');
const roleService = require('../roles.service');

const getRole = async (req, res) => {
    const prisma = req.prisma;
    const role_id = req.params.role_id;
    try {
        const role = await roleService.findById(prisma, role_id);
        if (!role) {
            throw new AppError("Role not found", 404);
        }
        res.status(200).json({ success: true, data: role });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getRole;