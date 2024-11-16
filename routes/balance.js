const express = require('express')
const { handleWithDrawBalance, handleGetWithdraw, handleBalanceRequestApproved, handleMyWithDraw } = require('../controller/balance')

const router = express.Router()

router.post('/balance/:id', handleWithDrawBalance)
router.get('/balance', handleGetWithdraw)
router.patch('/balance/:id', handleBalanceRequestApproved)
router.get('/balance/:id', handleMyWithDraw)

module.exports = router