const auth = require('../services/auth-service')
const { validationResult } = require('express-validator')
const { Prisma } = require('@prisma/client')

exports.register = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        await auth.register(req.body)
    }
    catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            return res.status(400).send("E-mail already in use")
        }
        else {
            return res.status(500).send()
        }
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        req.session.user = await auth.login(req.body)
    }
    catch(e) {
        console.log(e)
        return res.status(400).send("Invalid e-mail or password")
    }
    req.session.auth = true
    console.log(req.session)
    return res.redirect('/dashboard')
}

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

exports.resetPasswordRequest = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        await auth.resetPasswordRequest(req.body)
    }
    catch(e) {
        console.log(e)
    }

    res.sendStatus(200)
}

exports.resetPassword = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        await auth.resetPassword(req.body)
        return res.redirect('/')
    }
    catch {
        return res.render('error', { message: "Invalid or expired token" })
    }
}
