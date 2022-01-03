const router = require('express').Router()
const { body } = require('express-validator')
const auth = require('../middlewares/auth')
const transfersController = require('../controllers/transfers-controller')

router.get('/', auth, transfersController.readAll)

router.get('/new', auth, (req, res) => {
    res.render('transferNew')
})

router.post('/new', auth,
    body('id').isUUID(),
    body('amount').isFloat({ gt: 0 }),
    body('amount').isDecimal({ decimal_digits: 2 }),
    body('amount').isLength({ max: 10 }),
    body('title').isLength({ max: 130 }),
    transfersController.create
)

router.get('/:id', auth, transfersController.read)
router.get('/:id/confirm', auth, transfersController.confirm)
router.get('/:id/cancel', auth, transfersController.cancel)

module.exports = router
