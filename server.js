const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const { PrismaClient } = require('@prisma/client')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const routes = require('./routes/index')
const transfer = require('./routes/transfers')
const prisma = new PrismaClient()

require('dotenv').config()
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', 'views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000
    },
    store: new PrismaSessionStore(
        prisma,
        {
          checkPeriod: 2 * 60 * 1000,
          dbRecordIdIsSessionId: true,
          dbRecordIdFunction: undefined,
        }
    )
}))

app.use('/', routes)
app.use('/transfers', transfer)

app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

const server = app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + server.address().port)
})
