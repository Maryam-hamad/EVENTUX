const mongoose = require("mongoose")
const Notification = require('../Models/notificationModel')
const dotenv = require('dotenv')
const { MailerSend, EmailParams, Sender, Recipient } = require ("mailersend");



 
const mailerSend = new MailerSend({
    apiKey: process.env.API_KEY,
});

const sentFrom = new Sender("maryamhskit@gmail.com", "Maryam Hamad");

const recipients = [
    new Recipient("recipient@email.com", "Your Client")
];

const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("This is a Subject")
    .setHtml("Greetings from the team, you got this message through MailerSend.")
    .setText("Greetings from the team, you got this message through MailerSend.");

await mailerSend.email.send(emailParams);