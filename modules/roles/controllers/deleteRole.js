const roleService = require('../roles.service');

const deleteRole = async (req, res) => {
    const prisma = req.prisma;
    const role_id = req.params.role_id;

    try {
        const deleted = await roleService.deleteById(prisma, role_id);
        res.status(201).json({ success: true, message: 'Delete permanently.', deleted });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = deleteRole;