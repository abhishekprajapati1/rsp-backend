const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {

    const password = await bcrypt.hash("Abhishek@123", 10);

    const admin = await prisma.admin.create({
        data: {
            email: "admin@gmail.com",
            name: "Abhishek Prajapati",
            password
        }
    })


    delete admin.password;
    console.log("see this", admin);
}


main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})