const itemService = require("../items.service");


const createItem = async (req, res) => {
    const prisma = req.prisma;
    const { admin_id } = req.user;
    const data = req.body;
    try {
        const item = await itemService.create(prisma, data, admin_id)
        res.status(201).json({ success: true, message: 'Item created successfully.', data: item });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = createItem;