const mongoose = require('mongoose')

const balnaceSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true
        },
        accountId: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        isApproved: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModal',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const balnaceModel = mongoose.model('UserBalance', balnaceSchema)

module.exports = balnaceModel;