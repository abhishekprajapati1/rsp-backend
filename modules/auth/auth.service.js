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
    try {
        const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
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
        user = await prisma.admin.findUnique({ where: { email: data.email } });
        if (user) user.admin_id = user.id;
    } else {
        user = await prisma.user.findUnique({ where: { email: data.email } });
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

module.exports = {
    login,
    hashPassword,
    comparePasswords,
    generateToken,
    verifyToken,
    setCookie,
    removeCookie
}