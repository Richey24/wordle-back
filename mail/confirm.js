const theMailer = require("../utils/transporter")

const confirmMail = async (email, id, name) => {
    await theMailer.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "Confirm your account",
        html: `
            <p>Hello ${name},</p>
            <p>Thanks for registering your account click the link below to verify your account and login.</p>
            <a style="color: blue; text-decoration: none" href="https://www.israelbiblecamp.world/verify/${id}">Verify</a>
            <p>If you did not initiate this request, please ignore this email.</p>
            <p>Thank you!</p>
            <p>The Bible Camp team.</p>
        `
    })
}

module.exports = confirmMail
