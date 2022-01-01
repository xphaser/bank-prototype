const express = require('express')
const router = express.Router()
const user_controller = require('../controllers/user')

router.get('/', (req, res) => {
    res.render('index', { title: 'Bank' })
})

router.post('/', user_controller.create)

module.exports = router
