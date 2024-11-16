const express = require('express');
const router = express.Router()

const {handleNewUser, handleLogin, handleUpdateUser, handleAllUser, handleUserById, handleGetApprovedUsers, handleBlockUser, handleUnBlockUser, handleDefaultPointValue, handleUserByToken, handleMyReferals} = require('../controller/User')
const {authenticateToken} = require('../jwtToken')

router.post('/signup', handleNewUser)
router.post('/login', handleLogin)
router.put('/updateUser/:id', handleUpdateUser)
router.get('/getAllUser', handleAllUser)
router.get('/getUser/:id',authenticateToken, handleUserById)
router.get('/getAllUser/approved', handleGetApprovedUsers)
router.put('/block/:userId', handleBlockUser)
router.put('/unblock/:userId', handleUnBlockUser)
router.put('/defaultPoint', handleDefaultPointValue)
router.get('/check-user', authenticateToken, handleUserByToken)
router.get('/refs/:id', authenticateToken, handleMyReferals)


module.exports = router;