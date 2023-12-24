const purchaseService = require("../purchase.service");

const getPurchases = async (req, res) => {
    const prisma = req.prisma;
    const { role } = req.user;
    try {
        const data = await purchaseService.findAll(prisma, role);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getPurchases;