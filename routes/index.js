const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const user_controller = require('../controllers/user')

router.get('/', (req, res) => {
    res.render('index', { title: 'Bank' })
})

router.post(
    '/', body('email').isEmail(),
    body('password').isLength({ min: 8, max: 32 }),
    user_controller.create
)

router.post(
    '/login', body('email').isEmail(),
    body('password').isLength({ max: 32 }),
    user_controller.login
)

module.exports = router
