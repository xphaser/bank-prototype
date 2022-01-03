const auth = require('../services/auth-service')
const { validationResult } = require('express-validator')
const { Prisma } = require('@prisma/client')

exports.register = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('register', { error: "Invalid " + errors.array()[0].param })
    }

    try {
        await auth.register(req.body)
    }
    catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
            return res.render('index', { error: "E-mail already in use" } )
        }
        else {
            return res.sendStatus(500)
        }
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.render('index', { error: "Invalid e-mail or password" } )
    }

    try {
        req.session.user = await auth.login(req.body)
    }
    catch(e) {
        return res.render('index', { error: "Invalid e-mail or password" } )
    }
    req.session.auth = true
    return res.redirect('/transfers')
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

    return res.render('message', { title: "Bank", message: "E-mail has been sent (if account exists)" } )
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
        return res.render('message', { title: "Error", err: true, message: "Invalid or expired token" })
    }
}
