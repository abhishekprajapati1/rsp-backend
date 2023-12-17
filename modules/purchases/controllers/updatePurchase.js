const purchaseService = require("../purchase.service");

const updatePurchase = async (req, res) => {
    const prisma = req.prisma;
    const purchase_id = req.params.purchase_id;
    const data = req.body;
    try {
        const updated = await purchaseService.update(prisma, data, purchase_id);
        res.status(200).json({ success: true, message: 'Purchase record updated successfully.', data: updated });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = updatePurchase;