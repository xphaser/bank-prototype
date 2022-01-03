const { PrismaClient } = require('@prisma/client')
const { transfer } = new PrismaClient()

exports.readAll = async (user) => {
    const data = await transfer.findMany({
        where: {
            OR: [{
                senderId: user
            },
            {
                receiverId: user
            }]
        }
    })

    return data
}

exports.read = async (id) => {
    const data = await transfer.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    return data
}

exports.create = async (id, data) => {
    const newTransfer = await transfer.create({
        data: {
            senderId: id,
            receiverId: data.id,
            title: data.title,
            amount: data.amount,
            datetime: new Date(Date.now())
        }
    })

    return newTransfer.id
}
