const AppError = require("../../utils/AppError");

const findAll = async (prisma) => {
    const items = await prisma.item.findMany();
    return items;
}

const findById = async (prisma, id) => {
    return await prisma.item.findUnique({ where: { id } });
}

const findByName = async (prisma, name) => {
    return await prisma.item.findUnique({ where: { name } });
}

const update = async (prisma, data, id) => {
    const item = await findByName(prisma, data.name.toLowerCase());

    if (item && item.id !== id) {
        throw new AppError("Item already exists", 400)
    }

    const updated = await prisma.item.update({
        where: { id },
        data: {
            ...data,
            name: data.name.toLowerCase()
        }
    });

    return updated;
}

const deleteById = async (prisma, id) => {
    const item = await findById(prisma, id);
    if (!item) {
        throw new AppError("Item not found", 404);
    }
    return await prisma.item.delete({ where: { id } });
}

const create = async (prisma, data, admin_id) => {
    const item = await findByName(prisma, data.name.toLowerCase());

    if (item) {
        throw new AppError("Item already exists.", 400);
    }

    const created = await prisma.item.create({
        data: {
            ...data,
            name: data.name.toLowerCase(),
            admin: { connect: { id: admin_id } }
        }
    })

    return created;
}

module.exports = {
    findAll,
    findByName,
    findById,
    create,
    update,
    deleteById
}