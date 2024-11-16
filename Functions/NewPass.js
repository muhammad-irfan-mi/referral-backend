exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user and check OTP
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Check if OTP is valid and not expired
    if (!bcrypt.compareSync(otp, user.resetPasswordOTP) || Date.now() > user.resetPasswordExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update user's password
    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();
    
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
