const dayjs = require("dayjs");
const AppError = require("../../utils/AppError");

const findAll = async (prisma, role) => {
    const showAll = role === "employee" ? false : true;

    const today = dayjs().startOf('day');
    const tomorrow = dayjs().add(1, 'day').startOf('day');

    return await prisma.sale.findMany({
        orderBy: {
            date: 'desc'
        },
        where: {
            ...(!showAll && {
                date: {
                    gte: today.toDate(),
                    lt: tomorrow.toDate()
                }
            })
        },
        include: {
            item: true,
            user: { select: { name: true, role: { select: { title: true } } } },
            admin: { select: { name: true } },
        }
    });
}

const findById = async (prisma, id) => {
    const sale = await prisma.sale.findUnique({ where: { id } });
    if (!sale) {
        throw new AppError("Sale not found", 404);
    }
    return sale;
}

const create = async (prisma, data, user_id, admin_id) => {
    const { item_id, ...rest } = data;
    const created = await prisma.sale.create({
        data: {
            payment_mode: rest.payment_mode,
            total_price: Number(rest.total_price),
            quantity: Number(rest.quantity),
            item: { connect: { id: item_id } },
            admin: { connect: { id: admin_id } },
            ...(user_id !== admin_id && { user: { connect: { id: user_id } } })
        }
    });

    return created;
}

const update = async (prisma, data, id) => {
    const { item_id, ...rest } = data;
    await findById(prisma, id);
    const updated = await prisma.sale.update({
        where: { id },
        data: {
            is_updated: true,
            ...(item_id && { item: { connect: { id: item_id } } }),
            ...(rest.quantity && { quantity: Number(rest.quantity) }),
            ...(rest.total_price && { total_price: Number(rest.total_price) }),
            ...(rest.payment_mode && { payment_mode: rest.payment_mode }),
        }
    })

    return updated;
}

const deleteById = async (prisma, id) => {
    await findById(prisma, id);
    return await prisma.sale.delete({ where: { id } });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteById
}