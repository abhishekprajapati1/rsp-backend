const saleService = require("../sales.service");

const getSale = async (req, res) => {
    const prisma = req.prisma;
    const sale_id = req.params.sale_id;
    try {
        const sale = await saleService.findById(prisma, sale_id);
        res.status(200).json({ success: true, data: sale });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getSale;