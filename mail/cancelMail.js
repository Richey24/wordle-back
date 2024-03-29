const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" })

const cancelMail = async (email, id, name) => {

    const theMailer = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    await theMailer.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "Cancel Your Subscription",
        html: `
            <p>Hello ${name},</p>
            <p>You requested to cancel your subscription, you will lose access to all our premium features once your current subscription expires.</p>
            <a style="color: blue; text-decoration: none" href="https://www.israelbiblecamp.world/cancel/sub/${id}">Cancel</a>
            <p>If you did not initiate this request, please ignore this email.</p>
            <p>Thank you!</p>
            <p>The Bible Camp team.</p>
        `
    })
}

module.exports = cancelMail
