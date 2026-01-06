// utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // ✅ allow self-signed certificates. Remove in production.
    },
  });

  const mailOptions = {
    from: `"Asthetic to space Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  console.log(`📧 Sending email to: ${to}`);

  await transporter.sendMail(mailOptions);
};
