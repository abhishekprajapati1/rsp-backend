const { updatePassword } = require("../auth.service");

const changePassword = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;
    const { id, role } = req.user;

    try {
        await updatePassword(prisma, data, id, role);
        res.status(201).json({ success: true, data, message: 'Password updated successfully.' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    }

}

module.exports = changePassword;