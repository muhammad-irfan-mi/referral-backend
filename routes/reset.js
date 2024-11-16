const express = require('express');
const router = express.Router()
const {forgotPassword,resetPassword} = require('../Functions/ForgetEmail')

router.get('/:id',forgotPassword)
router.post('/',resetPassword)


module.exports = router