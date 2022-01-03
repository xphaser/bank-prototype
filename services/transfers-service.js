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
            }],
            status: 'CONFIRMED'
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

exports.confirm = async (id) => {
    await transfer.update({
        where: {
            id: parseInt(id)
        },
        data: {
            status: 'CONFIRMED'
        }
    })
}

exports.cancel = async (id) => {
    await transfer.delete({
        where: {
            id: parseInt(id)
        }
    })
}
