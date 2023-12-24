const AppError = require("../../utils/AppError");
const { hashPassword } = require("../auth/auth.service");

const findAll = async (prisma, logged_user_id) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: logged_user_id
      }
    }
  });

  return users;
}

const findById = async (prisma, id) => {
  const user = await prisma.user.findUnique({ where: { id }, include: { role: true } });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

const findByPhone = async (prisma, phone) => {
  const user = await prisma.user.findUnique({ where: { phone } });
  return user;
}

const create = async (prisma, data, admin_id) => {
  const { role_id, ...rest } = data;
  const user = await findByPhone(prisma, data.phone);
  if (user) {
    throw new AppError("User already exists.", 400);
  }

  const created = await prisma.user.create({
    data: {
      ...rest,
      password: await hashPassword(rest.password),
      admin: { connect: { id: admin_id } },
      role: { connect: { id: role_id } }
    }
  })

  return created;
}

module.exports = {
  findAll,
  findByPhone,
  create,
  findById
}