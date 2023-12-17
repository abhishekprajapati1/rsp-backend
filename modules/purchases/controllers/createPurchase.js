const purchaseService = require("../purchase.service");

const createPurchase = async (req, res) => {
    const prisma = req.prisma;
    const { id, admin_id } = req.user;
    const data = req.body;
    try {
        const created = await purchaseService.create(prisma, data, id, admin_id);
        res.status(201).json({ success: true, message: 'New purchase record added.', data: created });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = createPurchase;