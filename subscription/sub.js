const stripe = require("stripe")("sk_test_b9ZI3TPxqAeVBN82D4RyBws4")

const subUser = async (req, res) => {
    const { email, paymentMethod, plan } = req.body
    const customer = await stripe.customers.create({
        payment_method: paymentMethod.id,
        email: email,
        invoice_settings: {
            default_payment_method: paymentMethod.id
        }
    })

    if (plan === "monthly") {
        const theSub = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: "price_1MOWZ4Bf3U2rieTNTdSbfnE1" }],
            expand: ["latest_invoice.payment_intent"]
        })
        const status = theSub.latest_invoice.payment_intent.status
        const clientSecret = theSub.latest_invoice.payment_intent.client_secret
        res.status(200).json({ status: status, clientSecret: clientSecret })
    } else if (plan === "yearly") {
        const theSub = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: "price_1MOWZ4Bf3U2rieTNpRX5UYTO" }],
            expand: ["latest_invoice_payment_intent"]
        })
        const status = theSub.latest_invoice.payment_intent.status
        const clientSecret = theSub.latest_invoice.payment_intent.client_secret
        res.status(200).json({ status: status, clientSecret: clientSecret })
    }
}

module.exports = subUser