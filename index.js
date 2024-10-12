const express = require('express');
const app = express();
const PORT = 3001;

const mongoose = require('mongoose')
const cors = require('cors')
const crypto = require('crypto')

app.use(express.json())
app.use(cors());

const UserModal = require('./model/User_Modal')


mongoose.connect('mongodb://localhost:27017/user-authentication-refrral-web')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))


// Create New User 
app.post('/signup', async (req, res) => {
    console.log(req.body)
    try {

        const referralId = crypto.randomBytes(4).toString('hex');

        const User = await UserModal.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            referral: req.body.referral,
            referral: referralId
        })
        res.status(201).json(User)
    }
    catch (error) {
        console.log(error)
        res.send({ status: "User Already Created" })
    }

})

// Update User By ID 
app.put('/updateUser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await UserModal.findByIdAndUpdate(
            userId,
            {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: req.body.password
                }
            },
            { new: true } // To return the updated document
        );

        if (updatedUser) {
            res.status(200).json({ updatedUser, message: "User updated successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error updating user" });
    }
});

// Login API 
app.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const User = await UserModal.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if (User) {
            res.status(200).json({ User, status: "Ok", "msg": "User Login Successfully" })
        }
        else {
            res.send({ status: 'error', "msg": "Invalid User" })
        }
    }
    catch (error) {
        console.log(error)
        res.send("User Does not Exist")
    }

})

app.get('/getAllUsers', async (req, res) => {
    try {
        const user = await UserModal.find()
        res.status(200).json(user)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "User Fetching Error" })
    }
})

app.get('/getUser/:id', async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id)
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" });
    }
})

app.listen(PORT, () => {
    console.log(`Server Started on PORT : ${PORT}`)
})