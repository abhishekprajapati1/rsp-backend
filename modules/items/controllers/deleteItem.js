const itemService = require("../items.service");

const deleteItem = async (req, res) => {
    const prisma = req.prisma;
    const item_id = req.params.item_id;
    try {
        const deletedItem = await itemService.deleteById(prisma, item_id);
        res.status(201).json({ success: true, message: 'Deleted permanently', data: deletedItem });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = deleteItem;