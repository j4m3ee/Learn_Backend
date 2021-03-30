const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    auth: {
      user: process.env.EMAILUSER, // your email
      pass: process.env.EMAILPASSWORD // your email password
    }
  });

module.exports = transporter