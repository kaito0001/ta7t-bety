const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "plmqazpoiqweplmqaz@gmail.com",
      pass: "farqocbibgpcieyq",
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Karim Radwan <hello@hello.io",
    to: "kradwan135@gmail.com",
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
