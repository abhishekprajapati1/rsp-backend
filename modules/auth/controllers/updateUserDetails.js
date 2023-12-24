const authService = require("../auth.service");

const updateUserDetails = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;
    const { id, role } = req.user;


    try {
        await authService.updateDetails(prisma, data, id, role);
        res.status(201).json({ success: true, message: 'Profile details updated successfully.' });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    }

}

module.exports = updateUserDetails;