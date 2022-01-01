const { PrismaClient } = require('@prisma/client')
const { user } = new PrismaClient()

exports.create = async (req, res) => {
    const newUser = await user.create({
        data: {
            email: req.body.email,
            password: req.body.password
        }
    })
}
