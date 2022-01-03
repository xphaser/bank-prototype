const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

exports.sendMail = (to, msg) => {
    message = {
        from: "no-reply@bank.pro",
        to: to,
        subject: "Password Reset",
        text: msg
    }

    transporter.sendMail(message, (err, info) => {
        if(err) {
          console.log(err)
        } else {
          console.log(info)
        }
    })
}
