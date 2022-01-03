const bcrypt = require('bcrypt')
const crypto = require('crypto')
const mail = require('../utils/email')
const { PrismaClient } = require('@prisma/client')
const { reset } = require('nodemon')
const { user, token } = new PrismaClient()

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

exports.resetPasswordRequest = async (data) => {
    const currentUser = await user.findUnique({
        where: {
            email: data.email
        }
    })

    if(!currentUser) {
        throw new Error()
    }

    await token.delete({
        where: {
            userId: currentUser.id
        }
    })

    const resetToken = crypto.randomBytes(32).toString('hex')
    const hash = await bcrypt.hash(resetToken, 10)

    const newToken = await token.create({
        data: {
            userId: currentUser.id,
            token: hash,
            expires: new Date(Date.now() + 1000*60*60)
        }
    })

    const link = `${process.env.APP_URL}resetPassword?userId=${currentUser.id}&token=${resetToken}`
    mail.sendMail(currentUser.email, link)
}

exports.resetPassword = async (data) => {
    const resetToken = await token.findUnique({
        where: {
            userId: data.userId
        }
    })

    if(!await bcrypt.compare(data.token, resetToken.token)) {
        throw new Error()
    }
    if(resetToken.expires < new Date(Date.now())) {
        throw new Error()
    }

    const hash = await bcrypt.hash(data.password, 10)

    await user.update({
        where: {
            id: data.userId
        },
        data: {
            password: hash
        }
    })

    await token.delete({
        where: {
            userId: data.userId
        }
    })
}
