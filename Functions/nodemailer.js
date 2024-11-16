require('dotenv').config();
const nodemailer = require('nodemailer');

console.log("sending mail");


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Correct SMTP host for Outlook
//   host: 'smtp-mail.outlook.com',  // Correct SMTP host for Outlook
  port: 587,                      // Use port 587 for TLS
  secure: false,                  // Use false for TLS on port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
  tls: {
    rejectUnauthorized: false // Bypass SSL verification if necessary (for testing)
  },
//   connectionTimeout: 50000 // 20 seconds
});

console.log({
  email: process.env.EMAIL,
//   pass: process.env.PASS,
});

console.log("transport created");
const mailOptions = {
  from: process.env.EMAIL,
  to: 'muneeburrehmansial0321@gmail.com',
  subject: 'Test Email from Outlook using Nodemailer',
  text: 'Hello from Nodemailer and Outlook!'
};

console.log("sending now");
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info);
  }
});
