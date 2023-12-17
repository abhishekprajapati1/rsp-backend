const purchaseService = require("../purchase.service");
const getPurchase = async (req, res) => {
    const prisma = req.prisma;
    const purchase_id = req.params.purchase_id;
    try {
        const purchase = await purchaseService.findById(prisma, purchase_id);
        res.status(200).json({ success: true, data: purchase });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getPurchase;