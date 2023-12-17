const saleService = require("../sales.service");

const createSale = async (req, res) => {
    const prisma = req.prisma;
    const data = req.body;
    const { id, admin_id } = req.user;

    try {
        const created = await saleService.create(prisma, data, id, admin_id);
        res.status(201).json({ success: true, message: 'New sold item added successfully.', data: created });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = createSale;