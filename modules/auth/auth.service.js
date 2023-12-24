const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const AppError = require("../../utils/AppError");
require('dotenv').config();

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.APP_SECRET_KEY); // Adjust expiration as needed
}

const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
    return decoded;
}

const setCookie = (response, { data, age, name }) => {
    response.cookie(name, data, {
        // domain.com
        maxAge: age || 12 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    })
}

const removeCookie = (response, name) => {
    response.clearCookie(name, {
        // domain: ".hospotribe.com",
    })
}

const login = async (prisma, data) => {
    let user = null;

    if (data.role === 'admin') {
        user = await prisma.admin.findUnique({ where: { phone: data.phone } });
        if (user) {
            user.admin_id = user.id;
            user.role = "admin";
        }
    } else {
        user = await prisma.user.findUnique({ where: { phone: data.phone }, include: { role: { select: { title: true } } } });
    }

    if (!user) {
        throw new AppError("Invalid credentials", 400);
    }

    let isCorrectPassword = await comparePasswords(data.password, user.password);

    if (!isCorrectPassword) {
        throw new AppError("Invalid credentials", 400);
    }

    delete user.password;

    return user;
}

const updatePassword = async (prisma, data, id, role) => {
    if (role === "admin") {
        const admin = await prisma.admin.findUnique({ where: { id }, select: { password: true } })
        if (!admin) {
            throw new AppError("Invalid user.", 400);
        }

        let isCorrectPassword = await comparePasswords(data.current_password, admin.password);
        if (!isCorrectPassword) {
            throw new AppError("Current password is incorrect.")
        }

        await prisma.admin.update({
            where: { id },
            data: {
                password: await hashPassword(data.new_password),
            }
        })
    } else {
        const user = await prisma.user.findUnique({ where: { id }, select: { password: true } })
        if (!user) {
            throw new AppError("Invalid user", 400)
        }

        let isCorrectPassword = await comparePasswords(data.current_password, user.password);
        if (!isCorrectPassword) {
            throw new AppError("Current password is incorrect", 400);
        }

        await prisma.user.update({
            where: { id },
            data: {
                password: await hashPassword(data.new_password),
            }
        })
    }
}


const updateDetails = async (prisma, data, id, role) => {
    if (role === "admin") {
        const admin = await prisma.admin.findUnique({ where: { id }, select: { password: true } })
        if (!admin) {
            throw new AppError("Invalid user.", 400);
        }

        await prisma.admin.update({
            where: { id },
            data
        })
    } else {
        const user = await prisma.user.findUnique({ where: { id }, select: { password: true } })
        if (!user) {
            throw new AppError("Invalid user", 400)
        }

        await prisma.user.update({
            where: { id },
            data
        })
    }
}

module.exports = {
    login,
    hashPassword,
    comparePasswords,
    generateToken,
    verifyToken,
    setCookie,
    removeCookie,
    updatePassword,
    updateDetails
}