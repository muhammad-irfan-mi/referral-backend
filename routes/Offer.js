const express = require('express')
const router = express.Router()

const { handleOffer, handleGetOffer } = require('../controller/Offer')

router.post('/offer', handleOffer)
router.get('/offer', handleGetOffer)

module.exports = router