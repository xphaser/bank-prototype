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
    console.log("sending")
    message = {
        from: "no-reply@bank.com",
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
