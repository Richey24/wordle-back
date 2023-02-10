const nodemailer = require("nodemailer");
require("dotenv").config({ path: "../.env" })

const transporter = nodemailer.createTransport({
    service: "Outlook365",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

module.exports = transporter