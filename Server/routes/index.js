const Router = require('express')
const router = new Router()
const cakeRouter = require('./cakeRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/cake', cakeRouter)

module.exports = router