const saleService = require("../sales.service");

const deleteSale = async (req, res) => {
    const prisma = req.prisma;
    const sale_id = req.params.sale_id;
    try {
        const deletedSale = await saleService.deleteById(prisma, sale_id);
        res.status(201).json({ success: true, message: 'Sale record deleted permanently.', data: deletedSale });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = deleteSale;