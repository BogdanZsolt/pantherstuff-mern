import nodemailer from 'nodemailer';

const sendPasswordResetEmail = async (to, token, url) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Create the message
    const message = {
      to,
      subject: 'Password',
      html: `<p>You are receiving this email because you (or someone else) have requested the reset password.</p>
      <p>Please click on the folowing link, or paste this into your browser to complete the process:</p>
      <p>${url}/reset-password/${token}</p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };
    // send the email
    const info = await transporter.sendMail(message);
    return info;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default sendPasswordResetEmail;
