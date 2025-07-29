const nodemailer = require("nodemailer");

const sendEmailCode = async (options) => {
  // 1)  create the transeport email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "roofplanting1@gmail.com",
      pass: "fihjujryabddazvg",
    },
  });
  // 2) define the email options likke from , to , subject , email content
  await transporter.sendMail({
    from: `Hellow ${options.email} From Trading app `, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });
};

module.exports = {
  sendEmailCode,
};
