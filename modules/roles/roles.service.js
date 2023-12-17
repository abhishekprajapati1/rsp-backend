const AppError = require("../../utils/AppError");

const findAll = async (prisma) => {
    const roles = await prisma.role.findMany();
    return roles;
}

const findByTitle = async (prisma, title) => {
    return await prisma.role.findUnique({ where: { title } });
}
const findById = async (prisma, id) => {
    return await prisma.role.findUnique({ where: { id } });
}

const create = async (prisma, data, admin_id) => {
    const role = await findByTitle(prisma, data.title.toLowerCase());

    if (role) {
        throw new AppError("Role already exists.", 400);
    }

    const created = await prisma.role.create({
        data: {
            ...data,
            title: data.title.toLowerCase(),
            admin: { connect: { id: admin_id } }
        }
    });

    return created;
}


const update = async (prisma, data, id) => {
    const role = await findByTitle(prisma, data.title.toLowerCase());

    if (role && role.id !== id) {
        throw new AppError("Role already exists.", 409);
    }

    const updated = await prisma.role.update({
        where: { id },
        data: {
            ...data,
            title: data.title.toLowerCase()
        }
    })

    return updated;
}

const deleteById = async (prisma, id) => {
    const role = await findById(prisma, id);

    if (!role) {
        throw new AppError("Role not found", 404);
    }

    const deleted = await prisma.role.delete({ where: { id } });

    return deleted;
}


module.exports = {
    findAll,
    findById,
    findByTitle,
    create,
    update,
    deleteById
}