const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {

    const password = await bcrypt.hash("Admin@123", 10);

    const admin = await prisma.admin.create({
        data: {
            phone: "8850593776",
            name: "Abhishek Prajapati",
            password
        }
    })


    delete admin.password;
}


main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})