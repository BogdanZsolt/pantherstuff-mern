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
      host: sandbox.smtp.mailtrap.io,
      port: 25,
      auth: {
        user: 'f9e403c777a2f8',
        pass: 'a2870671117eff',
      },
    });
    // Create the message
    const message = {
      from,
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
