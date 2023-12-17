const AppError = require("../../../utils/AppError");
const itemService = require("../items.service");

const getItem = async (req, res) => {
    const prisma = req.prisma;
    const item_id = req.params.item_id;
    try {
        const item = await itemService.findById(prisma, item_id);
        if (!item) {
            throw new AppError("Item not found.", 404);
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = getItem;