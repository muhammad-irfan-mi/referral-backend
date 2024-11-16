require('dotenv').config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const User = require("../model/User"); 

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  
  port: 587,               
  secure: false,        
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false
  },
});
console.log({data:process.env.EMAIL})


const forgotPassword = async (req,res) => {
  console.log("fogetting password")
  const email  = req.params.id;
    
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    console.log({otp})
    
    // Hash the OTP and store it temporarily
    user.resetPasswordOTP = bcrypt.hashSync(otp, 10);
    user.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    await user.save();
    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      // to: 'muneeburrehmansial0321@gmail.com',
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    };
    
    // await transporter.sendMail(mailOptions);

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log("Error occurred:", error);
  }
  console.log("Email sent:", info.response);
  return res.json(info)
});
    // res.json({ message: "OTP sent to your email" });
  } catch (error) {
    console.log({error})
    // res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  console.log("reseting")
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log({user})
    if (!user) return res.status(404).json({ message: "User not found" });    
    if (!bcrypt.compareSync(otp, user.resetPasswordOTP) || Date.now() > user.resetPasswordExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    console.log(bcrypt.compareSync(otp, user.resetPasswordOTP) || Date.now() > user.resetPasswordExpiry)

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    
    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {forgotPassword,resetPassword}