const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" })

const sendMail = async (email, id, username) => {
    let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });
    await transporter.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "Reset Your Password",
        html: `
            <h4>Hello ${username}</h4>
            <br>
            <p><b>A request has been received to change the password for your account</b></p>
            <br>
            <button style="border: none; outline: none; width: 100px; height: 50px; background-color: blue; color: white">
            <a style="color: white; text-decoration: none" href="http://localhost:3000/reset/${id}">Reset</a>
            </button>
            <br>
            <p>If you did not initiate this request, please ignore this email</p>
            <br>
            <p>Thank you</p>
            <p>The Bible Camp team</p>
        `
    })
}

module.exports = sendMail
