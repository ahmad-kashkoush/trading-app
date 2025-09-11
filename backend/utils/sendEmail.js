const nodemailer = require("nodemailer");

const sendEmailCode = async (options) => {
  try {
    console.log("📧 Attempting to send email to:", options.email);
    
    // 1)  create the transport email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "roofplanting1@gmail.com",
        pass: "fihjujryabddazvg",
      },
    });
    
    console.log("📧 Transporter created, sending email...");
    
    // 2) define the email options like from, to, subject, email content
    const result = await transporter.sendMail({
      from: `Hello from Trading App <roofplanting1@gmail.com>`, // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: options.message, // plain text body
    });
    
    console.log("✅ Email sent successfully! Message ID:", result.messageId);
    return result;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    console.error("Error details:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  sendEmailCode,
};
