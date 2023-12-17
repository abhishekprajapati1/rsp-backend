const saleService = require("../sales.service");

const updateSale = async (req, res) => {
    const prisma = req.prisma;
    const sale_id = req.params.sale_id;
    const data = req.body;
    try {
        const updated = await saleService.update(prisma, data, sale_id)
        res.status(201).json({ success: true, message: 'Sold item updated successfully.', data: updated });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = updateSale;