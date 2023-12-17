const roleService = require('../roles.service');

const updateRole = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;
    const role_id = req.params.role_id;
    try {
        const updatedRole = await roleService.update(prisma, data, role_id);
        res.status(201).json({ success: true, message: 'Role updated successfully', data: updatedRole });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = updateRole;