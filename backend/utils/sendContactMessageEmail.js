import nodemailer from 'nodemailer';

const sendContactMessageEmail = async (
  from,
  to,
  name,
  telephone = '',
  text
) => {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'developer.teszt@gmail.com',
        pass: 'ylef ghmy ucmf rlze',
      },
    });
    // Create the message
    const message = {
      to,
      subject: 'Message from PantherStuff contact form',
      text,
      html: `<p>This message was sent from the form on the PantherStuff contact page by <b>${name}</b> email: ${from} phone: <b>${telephone}</b></p>
      <p>Message:</p>
      </p><p>${text}</p>`,
    };
    // send the email
    const info = await transporter.sendMail(message);
    return info;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default sendContactMessageEmail;
