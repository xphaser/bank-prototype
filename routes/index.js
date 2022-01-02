const router = require('express').Router()
const { body } = require('express-validator')
const auth = require('../middlewares/auth')
const authController = require('../controllers/auth-controller')

router.get('/', (req, res) => {
    if(!req.session.auth) {
        res.render('index', { title: 'Bank' })
    }
    else {
        res.render('dashboard', { title: 'Bank' })
    }
})

router.get('/dashboard', auth, (req, res) => {
    res.render('dashboard', { title: 'Bank' })
})

router.post(
    '/register', body('email').isEmail(),
    body('password').isLength({ min: 8, max: 32 }),
    authController.register
)

router.post(
    '/login', body('email').isEmail(),
    body('password').isLength({ max: 32 }),
    authController.login
)

router.get('/logout', authController.logout)

module.exports = router
