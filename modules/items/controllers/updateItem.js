const itemService = require('../items.service');

const updateItem = async (req, res) => {
    const prisma = req.prisma;
    const item_id = req.params.item_id;
    const data = req.body;
    try {
        const updatedItem = await itemService.update(prisma, data, item_id);
        res.status(200).json({ success: true, message: 'Updated successfully.', data: updatedItem });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = updateItem;