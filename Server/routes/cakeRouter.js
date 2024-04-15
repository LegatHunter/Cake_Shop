const Router = require('express')
const router = new Router()
const cakeController = require('../controllers/cakeController')

router.post('/', cakeController.create)
router.get('/', cakeController.getAll)
router.get('/:id', cakeController.getOne)

module.exports = router