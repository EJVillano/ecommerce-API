const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dacct1002@gmail.com',
    pass: 'xlgv uwqg tywx itwi'
  }
});

module.exports = transporter;