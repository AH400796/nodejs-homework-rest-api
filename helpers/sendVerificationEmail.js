const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendVerificationEmail = async data => {
  const email = { ...data, from: EMAIL_ADDRESS };

  await transporter.sendMail(email);
  return true;
};

module.exports = sendVerificationEmail;
