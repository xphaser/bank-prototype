const express = require('express')
const logger = require('morgan')
const routes = require('./routes/index')

require('dotenv').config()
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', 'views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(logger('dev'))
app.use(express.static('public'))
app.use(express.json())

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    })
})

const server = app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + server.address().port)
})
