const theMailer = require("../utils/transporter")

const failedSubMail = async (email) => {
    await theMailer.sendMail({
        from: '"Israel Bible Camp" <info@israelbiblecamp.com>',
        to: `${email}, ${email}`,
        subject: "We can't process your payment.",
        html: `
            <p>Hello</p>
            <h3We can't process your payment.</h3>
            <p>We're having some trouble collecting your Premium payment. Please take a moment to review your payment details and double-check that there is money in your associated account.</p>
            <p>Thank you!</p>
            <p>The Bible Camp team.</p>
        `
    })
}

module.exports = failedSubMail