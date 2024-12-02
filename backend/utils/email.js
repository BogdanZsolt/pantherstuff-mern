import path from 'path';
import nodemailer from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

const __dirname = path.resolve();

class Email {
  constructor(user, language) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.from = `Csetneki Petra <${process.env.EMAIL_FROM}>`;
    this.language = language;
  }

  newTransport() {
    if (process.env.NODE_ENV !== 'development') {
      // Brevo
      return 1;
    }
    return nodemailer.createTransport({
      // host: process.env.EMAIL_TEST_HOST,
      // port: process.env.EMAIL_TEST_PORT,
      // auth: {
      //   user: process.env.EMAIL_TEST_USERNAME,
      //   pass: process.env.EMAIL_TEST_PASS,
      // },
      // host: 'smtp.gmail.com',
      // port: 587,
      // secure: false,
      // auth: {
      //   user: 'developer.teszt@gmail.com',
      //   pass: 'ylef ghmy ucmf rlze',
      // },
      host: process.env.BREVO_HOST,
      port: process.env.BREVO_PORT,
      secure: false,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });
  }

  async send(subject, html) {
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    // 3) Create a transport and send email
    return await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset(url) {
    // 1) Render HTML based on pug template
    const template =
      this.language === 'hu' ? 'passwordReset_hu' : 'passwordReset_en';
    const subject =
      this.language === 'hu' ? 'Elfelejtett jelszó' : 'Forgot password';
    const temp = `${__dirname}/backend/views/email/${template}.pug`;
    const html = pug.renderFile(temp, {
      firstName: this.firstName,
      url,
      subject,
    });
    // return await this.send('passwordReset', 'Forgotten password');
    return await this.send(subject, html);
  }

  async contactMessage(params) {
    // 1) Render HTML based on pug template
    const template =
      this.language === 'hu' ? 'contactMessage_hu' : 'contactMessage_en';
    const subject =
      this.language === 'hu'
        ? 'Kapcsolati üzenet értesítés'
        : 'Contact message notification';
    const temp = `${__dirname}/backend/views/email/${template}.pug`;
    const html = pug.renderFile(temp, {
      firstName: this.firstName,
      senderName: params.name,
      senderEmail: params.email,
      senderPhone: params.telephone,
      message: params.message,
      subject,
    });
    // return await this.send('passwordReset', 'Forgotten password');
    return await this.send(subject, html);
  }

  async accountVerify(url) {
    // 1) Render HTML based on pug template
    const template =
      this.language === 'hu' ? 'accountVerify_hu' : 'accountVerify_en';
    const subject =
      this.language === 'hu' ? 'Fiók ellenőrzése' : 'Account verify';
    const temp = `${__dirname}/backend/views/email/${template}.pug`;
    const html = pug.renderFile(temp, {
      firstName: this.firstName,
      url,
      subject,
    });
    // return await this.send('passwordReset', 'Forgotten password');
    return await this.send(subject, html);
  }
}

export default Email;
