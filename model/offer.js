const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true, 
    },
    status: {
        type: String,
        default: 'pending', 
    }
});

const offerModel = mongoose.model('offerImage', offerSchema);
module.exports = offerModel;
