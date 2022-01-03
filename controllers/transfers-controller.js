const transfer = require('../services/transfers-service')
const { validationResult } = require('express-validator')
const { Prisma } = require('.prisma/client')

exports.readAll = async (req, res) => {
    try {
        const items = await transfer.readAll(req.session.user)
        return res.status(200).json({ transfers: items })
    }
    catch(e) {
        return res.sendStatus(500)
    }
}

exports.read = async (req, res) => {
    try {
        const item = await transfer.read(req.params.id, req.session.user)

        if(item.receiverId == req.session.user || item.senderId == req.session.user)
        {
            return res.status(200).send(item)
        }
        else {
            return res.sendStatus(403)
        }
    }
    catch(e) {
        return res.sendStatus(500)
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const id = await transfer.create(req.session.user, req.body)
        return res.redirect('/transfers/' + id)
    }
    catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code=="P2003") {
            return res.status(400).send("Invalid account number")
        }
        else {
            return res.sendStatus(500)
        }
    }
}
