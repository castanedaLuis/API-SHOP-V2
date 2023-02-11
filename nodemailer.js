"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true , // true 465 or false 587
    port: 465, 
    auth: {
        user: process.env.CORREO_RECOVERY_PASSWORD,
        pass: process.env.PASSWORD_RECOVERY_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'nodeapp2023.dev@gmail.com', // sender address
    to: 'nodeapp2023.dev@gmail.com', // list of receivers
    subject: "Hola, nuevo correo ✔", // Subject line
    text: "Hola Castañeda prueba desde Nodemailer ", // plain text body
    html: "<b>Hola Castañeda prueba desde Nodemailer</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch(console.error);