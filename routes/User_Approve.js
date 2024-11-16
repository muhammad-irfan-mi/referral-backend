const express = require('express');
const { handleApproved, handleAllPending, handleDeleteApproved, handleApproveUser } = require('../controller/User_Approve');
const router = express.Router()

router.post('/approve', handleApproved)
router.get('/approve', handleAllPending)
router.delete('/approve/:userId', handleDeleteApproved)
router.patch('/approve/:userId', handleApproveUser)


module.exports = router;