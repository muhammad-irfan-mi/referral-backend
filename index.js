require("dotenv").config()
const express = require('express');
const app = express();
const PORT = 3001;

const mongoose = require('mongoose')
const cors = require('cors')
const crypto = require('crypto')

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));


const UserModal = require('./model/User_Modal')
const Question = require('./model/question_Modal')
const Point = require('./model/Point')

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))


// ***************** USER ***************** //
app.use('/api', require('./routes/User'))

// Reset and Forget
app.use('/api/reset', require('./routes/reset'))


// Task
app.use('/api', require('./routes/Questions'));

// Point 
app.use('/api', require('./routes/Point'))

// Approve 
app.use('/uploads', express.static('uploads'));
app.use('/api', require('./routes/User_Approve'))

// offer
app.use('/api', require('./routes/Offer'))

// WIthDraw Balance
app.use('/api', require('./routes/balance'))
app.use('/api/widthdraw', require('./routes/Withdraw'))



app.listen(PORT, () => {
    console.log(`Server Started on PORT : ${PORT}`,"monodb = ",process.env.MONGO_URL)
})