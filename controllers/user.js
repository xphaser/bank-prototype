const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const { Prisma, PrismaClient } = require('@prisma/client')
const { user } = new PrismaClient()


exports.create = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const hash = await bcrypt.hash(req.body.password, 10)

        const newUser = await user.create({
            data: {
                email: req.body.email,
                password: hash
            }
        })
    }
    catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return res.status(400).send("E-mail already in use")
            }
        }
        return res.status(500).send()
    }
}

exports.login = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const currentUser = await user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if(currentUser && await bcrypt.compare(req.body.password, currentUser.password)) {
        res.status(200).send("Success")
    }
    else {
        res.status(400).send("Invalid e-mail or password")
    }
}
