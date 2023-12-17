const AppError = require("../../../utils/AppError");
const userService = require("../../users/users.service");

const getUserDetails = async (req, res) => {
    const prisma = req.prisma;
    const { id, admin_id } = req.user;
    try {
        let data = null;
        if (id === admin_id) {
            let admin = await prisma.admin.findUnique({ where: { id } });
            data = admin;
            if (admin) data.role = 'admin';
        } else {
            let staff = await userService.findById(prisma, id);
            data = staff;
            if (staff) data.role = 'staff';
        }

        if (!data) {
            throw new AppError("Details not found", 404);
        }

        delete data.password;

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getUserDetails;