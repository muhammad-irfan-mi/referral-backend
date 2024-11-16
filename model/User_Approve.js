const mongoose = require('mongoose');

const ApprovedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true, // Stores the file path
    },
    status: {
        type: String,
        default: 'pending', // Hardcoded default value
    }
});

// Export the model
const ApprovedModel = mongoose.model('ApprovedUser', ApprovedSchema);
module.exports = ApprovedModel;
