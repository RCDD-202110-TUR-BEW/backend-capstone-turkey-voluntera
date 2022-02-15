const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_ACCOUNT,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

const sendMail = async (targetMail, subject, html) => {
  const info = await transporter.sendMail({
    from: `Voluntera Team <${process.env.GOOGLE_ACCOUNT}>`,
    to: targetMail,
    subject,
    html,
  });

  return info;
};

module.exports = sendMail;
