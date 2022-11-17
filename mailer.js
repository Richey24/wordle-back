const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" })

const sendMail = async (email, id) => {
    let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: "info@israelbiblecamp.com",
            pass: "Hab0gl0b0tribin$",
        },
    });
    await transporter.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "Reset Your Password",
        html: `
            <p>Follow this link to reset your password</p>
            <a href="localhost:3000/reset/${id}">Reset</a>
        `
    })
}

module.exports = sendMail
