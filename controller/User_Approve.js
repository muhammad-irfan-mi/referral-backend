const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose'); // Make sure to import mongoose
const ApprovedModel = require('../model/User_Approve');
const UserModal = require('../model/User_Modal');

// Multer Configuration for File Upload
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
}).single('image'); // Accept a single file with the field name 'image'

// Controller for Handling Image Upload
const handleApproved = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: 'Error uploading file: ' + err.message });
        }

        const userId = req.body.userId; // Assuming the user ID is provided in the request body

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ msg: 'userId is required.' });
        }

        // Convert userId to ObjectId
        let objectId;
        try {
            objectId = new mongoose.Types.ObjectId(userId);
        } catch (error) {
            return res.status(400).json({ msg: 'Invalid userId format.' });
        }

        // Check if the user has already uploaded an image
        try {
            const existingImage = await ApprovedModel.findOne({ userId: objectId });
            if (existingImage) {
                return res.status(400).json({ msg: 'User has already uploaded an image.' });
            }
        } catch (error) {
            return res.status(500).json({ msg: 'Error checking user image status: ' + error.message });
        }

        if (!req.file) {
            return res.status(400).json({ msg: 'Please upload an image.' });
        }

        try {
            // Create a new image record
            const newImage = new ApprovedModel({
                userId: objectId, // Use the ObjectId
                imageUrl: `/uploads/${req.file.filename}`, // Save the file path
                status: 'pending' // Hardcoded status
            });

            await newImage.save(); // Save the record to the database
            res.status(201).json({
                msg: 'Image uploaded successfully!',
                image: newImage
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });
};

// Delete Image After Approved 
const handleDeleteApproved = async (req, res) => {
    const { userId } = req.params; // Get the userId from request parameters

    try {
        // Ensure userId is treated as a string
        const deletedImage = await ApprovedModel.findOneAndDelete({ userId: userId.toString() });

        if (!deletedImage) {
            return res.status(404).json({ msg: 'Object not found.' });
        }

        res.status(200).json({
            msg: 'Object deleted successfully!',
            deletedImage
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting object: ' + error.message });
    }
};


// ApprovedUser 
const handleApproveUser = async (req, res) => {
    const { userId } = req.params; // Assuming you're passing user ID in the route parameters
  
    try {
      // Update the isApproved field to true for the specified user
      const updatedUser = await UserModal.findByIdAndUpdate(
        userId,
        { isApproved: "true" },
        { new: true } 
      );
  
      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "User approved successfully", user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error approving user", error: error.message });
    }
  };




const handleAllPending = async (req, res) => {
    try {
        const pending = await ApprovedModel.find()
        res.status(200).json(pending)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "User Fetching Error" })
    }
}

module.exports = {
    handleApproved,
    handleAllPending,
    handleDeleteApproved,
    handleApproveUser
};
