const express = require('express');
const router = express.Router()
const {addQuestion, getQuestion, getAllQuestion} = require('../controller/Questioning')

router.post('/addQuestion',addQuestion)
router.get('/getQuestion',getQuestion)
router.get('/getAllQuestion',getAllQuestion)

module.exports = router