const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const { user } = new PrismaClient()

exports.register = async (data) => {
    const hash = await bcrypt.hash(data.password, 10)

    const newUser = await user.create({
        data: {
            email: data.email,
            password: hash
        }
    })
}

exports.login = async (data) => {
    const currentUser = await user.findUnique({
        where: {
            email: data.email
        }
    })

    if(!await bcrypt.compare(data.password, currentUser.password)) {
        throw new Error()
    }

    return currentUser.id
}
