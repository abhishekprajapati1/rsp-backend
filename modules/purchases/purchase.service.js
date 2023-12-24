const dayjs = require("dayjs");
const AppError = require("../../utils/AppError");

const findAll = async (prisma, role) => {

    const showAll = role === "employee" ? false : true;

    const today = dayjs().startOf('day');
    const tomorrow = dayjs().add(1, 'day').startOf('day');


    return await prisma.purchase.findMany({
        orderBy: {
            date: 'desc'
        },
        where: {
            date: {
                gte: today.toDate(),
                lt: tomorrow.toDate()
            }
        },
        include: {
            //include user that is not null i.e user_id is not null
            // admin that is not null i.e admin_id is not null
            user: {
                select: {
                    name: true,
                    role: {
                        select: {
                            title: true
                        }
                    }
                }
            },

            admin: {
                select: {
                    name: true
                }
            }

        }
    });
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
            quantity: data.quantity,
            name: data.name,
            payment_mode: data.payment_mode,
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