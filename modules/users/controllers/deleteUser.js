const deleteUser = async (req, res) => {
    const prisma = req.prisma;
    const user_id = req.params.user_id;

    try {
        const deleted = await prisma.user.delete({ where: { id: user_id } });
        res.status(201).json({ success: true, message: 'User deleted permanently', deleted });
    } catch (error) {
        res.status(error.statusCode || 500).json({ success: false, message: error.message, error: error });
    } finally {
        prisma.$disconnect();
    }

}

module.exports = deleteUser;