const nodemailer = require('nodemailer');

const sendMailNodemailer = (options) => {
  const email = process.env.NODEMAILER_EMAIL;
  const password = process.env.NODEMAILER_PASSWORD;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to: options.userEmail,
    subject: options.subject,
    text: options.text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendMailNodemailer