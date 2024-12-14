const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");
require("dotenv").config();

let password = "rlfhfassyltkynjz";

let sentEmailUtility = async (emailTo, emailText, emailSub) => {
  let transporter = nodemailer.createTransport(
    smtpTransporter({
      service: "Gmail",
      auth: {
        user: "jahidhasanbabu7821@gmail.com",
        pass: password,
      },
    })
  );
  let mailOption = {
    from: "MERN Ecommerce Service <jahidhasanbabu657@gmail.com>",
    to: emailTo,
    subject: emailSub,
    text: emailText,
  };
  return await transporter.sendMail(mailOption);
};

module.exports = sentEmailUtility; 
