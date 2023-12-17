const AppError = require("../../utils/AppError");

const findAll = async (prisma) => {
    return await prisma.purchase.findMany();
}

const findById = async (prisma, id) => {
    const purchase = await prisma.purchase.findUnique({ where: { id } });
    if (!purchase) {
        throw new AppError("Purchase not found", 404);
    }
    return purchase;
}

const create = async (prisma, data, user_id, admin_id) => {
    const created = await prisma.purchase.create({
        data: {
            price: Number(data.price),
            amount: data.amount,
            name: data.name,
            admin: { connect: { id: admin_id } },
            ...(user_id !== admin_id && { user: { connect: { id: user_id } } })
        }
    });

    return created;
}

const update = async (prisma, data, id) => {
    await findById(prisma, id);
    const updated = await prisma.purchase.update({
        where: { id },
        data: {
            is_updated: true,
            ...(data.price && { price: Number(data.price) }),
            ...(data.name && { name: data.name }),
            ...(data.amount && { amount: data.amount }),
        }
    })

    return updated;
}

const deleteById = async (prisma, id) => {
    await findById(prisma, id);
    return await prisma.purchase.delete({ where: { id } });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById
}