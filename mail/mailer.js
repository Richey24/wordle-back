const transporter = require("../utils/transporter")

const sendMail = async (email, id, name) => {
    await transporter.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "Reset Your Password",
        html: `
            <p>Hello ${name},</p>
            <p>A request has been received to change the password for your account.</p>
            <a style="color: blue; text-decoration: none" href="https://www.israelbiblecamp.world/reset/${id}">Reset</a>
            <p>If you did not initiate this request, please ignore this email.</p>
            <p>Thank you!</p>
            <p>The Bible Camp team.</p>
        `
    })
}

module.exports = sendMail
