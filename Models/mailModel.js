const dotenv = require("dotenv")

class Mail {
  constructor({ to, subject, text, html }) {
    this.from = process.env.USER_MAIL;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }
}

module.exports = Mail