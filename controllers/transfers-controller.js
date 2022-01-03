const transfer = require('../services/transfers-service')
const { validationResult } = require('express-validator')
const { Prisma } = require('.prisma/client')

exports.readAll = async (req, res) => {
    try {
        const items = await transfer.readAll(req.session.user)

        return res.render('transfers', { data: items, user: req.session.user })
    }
    catch {
        return res.sendStatus(500)
    }
}

exports.read = async (req, res) => {
    try {
        const item = await transfer.read(req.params.id)

        if(item.receiverId == req.session.user || item.senderId == req.session.user)
        {
            if(item.status == 'CONFIRMED') {
                return res.render('transferDetails', { transfer: item, user: req.session.user })
            }
            else {
                return res.render('transferConfirm', { transfer: item })
            }
        }
        else {
            return res.sendStatus(403)
        }
    }
    catch {
        return res.sendStatus(500)
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.render('transferNew', { error: "Invalid " + errors.array()[0].param })
    }

    try {
        const id = await transfer.create(req.session.user, req.body)
        return res.redirect('/transfers/' + id)
    }
    catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code=="P2003") {
            return res.render('transferNew', { error: "Invalid account number" })
        }
        else {
            return res.sendStatus(500)
        }
    }
}

exports.confirm = async (req, res) => {
    try {
        const item = await transfer.read(req.params.id)
        if(!item.senderId == req.session.user) {
            return res.SendStatus(403)
        }
        await transfer.confirm(req.params.id)
        return res.redirect('/transfers/' + req.params.id)
    }
    catch(e) {
        console.log(e)
        return res.sendStatus(403)
    }
}

exports.cancel = async (req, res) => {
    try {
        const item = await transfer.read(req.params.id)
        if(!item.senderId == req.session.user) {
            return res.sendStatus(403)
        }
        if(!item.status == 'PENDING') {
            return res.sendStatus(403)
        }
        await transfer.cancel(req.params.id)
        return res.redirect('/')
    }
    catch {
        return res.sendStatus(403)
    }
}
