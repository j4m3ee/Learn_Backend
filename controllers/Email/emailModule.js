tls: {
  rejectUnauthorized: false
}

const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.CLIENTID,
  process.env.CLIENTSECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESHTOKEN
});
const accessToken = oauth2Client.getAccessToken()

const transporter = nodemailer.createTransport({
  service: process.env.MAILSERVICE,
  auth: {
       type: "OAuth2",
       user: process.env.EMAILUSER, 
       clientId: process.env.CLIENTID,
       clientSecret: process.env.CLIENTSECRET,
       refreshToken: process.env.REFRESHTOKEN,
       accessToken: accessToken
  }
});

// const transporter = nodemailer.createTransport({
//   service: process.env.MAILSERVICE,
//   auth: {
//     user: process.env.EMAILUSER, // your email
//     pass: process.env.EMAILPASSWORD // your email password
//   }
// });

module.exports = transporter