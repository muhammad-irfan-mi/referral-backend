const mongoose = require('mongoose')

const RegisterUser = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        referral: {
            type: String,
        },
        isApproved: {
            type: String
        },
        isBlocked:{
            type: String
        } ,
        resetPasswordOTP:String,
        resetPasswordExpiry:String,
    },
    {
        timestamps: true,
    }
)

const UserModal = mongoose.model("ReferralUser", RegisterUser)

module.exports = UserModal;