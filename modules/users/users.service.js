const AppError = require("../../utils/AppError");
const { hashPassword } = require("../auth/auth.service");

const findAll = async (prisma) => {
  const users = await prisma.user.findMany();
  return users;
}

const findById = async (prisma, id) => {
  const user = await prisma.user.findUnique({ where: { id }, include: { role: true } });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
}

const findByEmail = async (prisma, email) => {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  return user;
}

const create = async (prisma, data, admin_id) => {
  const { role_id, ...rest } = data;
  const user = await findByEmail(prisma, data.email);
  if (user) {
    throw new AppError("User already exists.", 400);
  }

  const created = await prisma.user.create({
    data: {
      ...rest,
      password: await hashPassword(rest.password),
      email: data.email.toLowerCase(),
      admin: { connect: { id: admin_id } },
      role: { connect: { id: role_id } }
    }
  })

  return created;
}

module.exports = {
  findAll,
  findByEmail,
  create,
  findById
}