const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const offerModel = require('../model/offer')



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
}).single('image');

const handleOffer = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: 'Error uploading file: ' + err.message });
        }
        else{
            try {
                const newImage = new offerModel({
                    imageUrl: `/uploads/${req.file.filename}`,
                    status: 'pending'
                });
    
                await newImage.save(); 
                res.status(201).json({
                    msg: 'Image uploaded successfully!',
                    image: newImage
                });
            } catch (error) {
                res.status(500).json({ msg: error.message });
            }
        }
    })
}

// get offer
const handleGetOffer = async (req, res) => {
    try {
        const pending = await offerModel.find()
        res.status(200).json(pending)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "User Fetching Error" })
    }
}


module.exports = {
    handleOffer,
    handleGetOffer
}