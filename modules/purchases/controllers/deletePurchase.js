const purchaseService = require("../purchase.service");

const deletePurchase = async (req, res) => {
    const prisma = req.prisma;
    const purchase_id = req.params.purchase_id;
    try {
        const deleted = await purchaseService.deleteById(prisma, purchase_id);
        res.status(200).json({ success: true, message: 'Purchase record deleted permanently.', data: deleted });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = deletePurchase;