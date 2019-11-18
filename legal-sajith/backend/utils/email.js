const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class Email{
    constructor(user,url){
        this.to = user.to;
        this.username = user.username;
        this.url = user.url;
        this.form = 'Team Legal <legal@gmail.com>';
    }

    newTransport(){
        if(this.env.NODE_ENV === 'production'){
            // sendgrid
        }
        return nodemailer.createTransport({
            service:'SendGrid',
            auth: {
                user: 'legal',
                pass: '1qIGBJ61TASJDG9rZhXNFw'
            }
        });
    }
// Send the actual email
async send(template, subject) {
    // 1) Render HTML based on a pug template
    // const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
    //   firstName: this.firstName,
    //   url: this.url,
    //   subject
    // });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
    //   html,
    //   text: htmlToText.fromString(html)
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};