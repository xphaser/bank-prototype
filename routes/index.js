const router = require('express').Router()
const { body } = require('express-validator')
const auth = require('../middlewares/auth')
const authController = require('../controllers/auth-controller')

router.get('/', (req, res) => {
    if(!req.session.auth) {
        res.render('index', { title: 'Bank' })
    }
    else {
        res.redirect('/transfers')
    }
})

router.get('/login', (req, res) => {
    res.render('index', { title: 'Bank' })
})

router.get('/register', (req, res) => {
    res.render('register', { title: 'Bank' })
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

router.get('/resetPassword', (req, res) => {
    console.log(req.query.userId)
    console.log(req.query.token)
    if(req.query.userId && req.query.token) {
        console.log("ok")
        res.render('resetPassword', {
             title: 'Password Reset', 
             userId: req.query.userId,
             token: req.query.token
        })
    }
    else {
        res.render('resetRequest', { title: 'Password Reset' })
    }
})

router.post('/resetRequest', body('email').isEmail(),
    authController.resetPasswordRequest
)

router.post('/resetPassword', 
    body('password').isLength({ min: 8, max: 32 }),
    authController.resetPassword
)

router.get('/logout', authController.logout)

module.exports = router
