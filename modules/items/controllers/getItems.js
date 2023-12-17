const itemService = require('../items.service');

const getItems = async (req, res) => {
    const prisma = req.prisma;
    try {
        const data = await itemService.findAll(prisma);
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getItems;