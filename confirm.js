const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" })

const confirmMail = async (email, id, username) => {
    let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: "info@israelbiblecamp.com",
            pass: "Hab0gl0b0tribin$"
        },
    });
    await transporter.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "Confirm your account",
        html: `
            <h4>Hello ${username}</h4>
            <br>
            <p><b>Thanks for registering your account click the link below to verify your account</b></p>
            <br>
            <a style="color: blue; text-decoration: none" href="http://localhost:3000/verify/${id}">Verify</a>
            <br>
            <p>If you did not initiate this request, please ignore this email</p>
            <br>
            <p>Thank you</p>
            <p>The Bible Camp team</p>
        `
    })
}

module.exports = confirmMail
