const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");
require("dotenv").config();

let password = "hhqqbuzrkljidbxl";

let sentEmailUtility = async (emailTo, emailText, emailSub) => {
  let transporter = nodemailer.createTransport(
    smtpTransporter({
      service: "Gmail",
      auth: {
        user: "jahidhasanbabu657@gmail.com", // your email address
        pass: password, // email password or app-specific password
      },
    })
  );

  // Mask the email in the "from" field by providing a name and the email address
  let mailOption = {
    from: '"MERN Ecommerce Service" <jahidhasanbabu657@gmail.com>', // Masked email
    to: emailTo,
    subject: emailSub,
    text: emailText,
  };

  return await transporter.sendMail(mailOption);
};

module.exports = sentEmailUtility;

