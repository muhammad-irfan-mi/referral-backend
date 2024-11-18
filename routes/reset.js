const express = require('express');
const router = express.Router()
const {forgotPassword,resetPassword} = require('../Functions/ForgetEmail')

router.post('/',resetPassword)
router.get('/:id',forgotPassword)


module.exports = router