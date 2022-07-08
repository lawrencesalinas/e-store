const express = require('express')
const router = express.Router()
const { getOrders, postOrder } = require('../controller/orderController')

const { protect } = require('../middleware/authMiddleWare')

router.route('/').get(protect, getOrders).post(protect, postOrder)

module.exports = router