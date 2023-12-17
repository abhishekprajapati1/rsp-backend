const saleService = require('../sales.service');

const getSales = async (req, res) => {
    const prisma = req.prisma;
    try {
        const sales = await saleService.findAll(prisma);
        res.status(200).json({ success: true, data: sales });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getSales;