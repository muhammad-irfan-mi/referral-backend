const express = require('express');
const router = express.Router();
const { createWithdrawReq, acceptWithdrawReq, getAllReqs,getMyReqs} = require('../controller/WithDraw'); 

router.post('/', createWithdrawReq);

router.put('/:id', acceptWithdrawReq);

router.get('/', getAllReqs);
router.get('/:id', getMyReqs);

module.exports = router;
