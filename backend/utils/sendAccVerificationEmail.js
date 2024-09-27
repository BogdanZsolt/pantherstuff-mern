import nodemailer from 'nodemailer';

const sendAccVerificationEmail = async (to, token, url) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'developer.teszt@gmail.com',
        pass: 'ylef ghmy ucmf rlze',
        // pass: 'ylef ghmy ucmf rlzf',
      },
    });
    // Create the message
    const message = {
      to,
      subject: 'Account Verification',
      html: `<p>You are receiving this email because you (or someone else) have requested to verify your account.</p>
      <p>Please click on the folowing link, or paste this into your browser to complete the process:</p>
      <p>${url}/account-verification/${token}</p>
      <p>If you did not request this, please ignore this email.</p>
      `,
    };
    // send the email
    const info = await transporter.sendMail(message);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default sendAccVerificationEmail;
