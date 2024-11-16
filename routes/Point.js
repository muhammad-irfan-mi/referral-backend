const express = require('express')
const router = express.Router()

const {handlePoint, handleGetPoint} = require('../controller/Point')
const { handleUpdatePoint} = require('../controller/User')
const { authenticateToken } = require('../jwtToken')

router.put('/point/:id', handleUpdatePoint)
router.get('/point',authenticateToken, handleGetPoint)



module.exports = router;